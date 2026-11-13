import { type ContentLink, collectLinks } from './links/collect-links';
import {
  BLOCKED_STATUSES,
  LINK_CHECK_CONCURRENCY,
  LINK_CHECK_TIMEOUT_MS,
  LINK_CHECK_USER_AGENT,
} from './links/links.constants';

type LinkStatus = 'ok' | 'blocked' | 'broken';

interface LinkResult extends ContentLink {
  status: LinkStatus;
  detail: string;
}

const checkLink = async (link: ContentLink): Promise<LinkResult> => {
  try {
    const response = await fetch(link.url, {
      headers: { 'user-agent': LINK_CHECK_USER_AGENT },
      redirect: 'follow',
      signal: AbortSignal.timeout(LINK_CHECK_TIMEOUT_MS),
    });
    await response.body?.cancel();
    if (response.ok) return { ...link, status: 'ok', detail: String(response.status) };
    const status = BLOCKED_STATUSES.includes(response.status) ? 'blocked' : 'broken';
    return { ...link, status, detail: `HTTP ${response.status}` };
  } catch (error) {
    return {
      ...link,
      status: 'broken',
      detail: error instanceof Error ? error.message : String(error),
    };
  }
};

const checkAll = async (links: readonly ContentLink[]): Promise<LinkResult[]> => {
  const queue = [...links];
  const results: LinkResult[] = [];
  const worker = async (): Promise<void> => {
    for (let link = queue.shift(); link; link = queue.shift()) {
      results.push(await checkLink(link));
    }
  };
  await Promise.all(Array.from({ length: LINK_CHECK_CONCURRENCY }, worker));
  return results;
};

const main = async (): Promise<void> => {
  const links = await collectLinks();
  console.log(`links: checking ${links.length} URLs`);
  const results = await checkAll(links);
  const report = (status: LinkStatus, title: string): void => {
    const matches = results.filter((result) => result.status === status);
    if (!matches.length) return;
    console.log(`\n${title} (${matches.length}):`);
    for (const result of matches)
      console.log(`  ${result.detail}  ${result.url}  (${result.source})`);
  };
  report('blocked', 'refused automated requests; open these by hand');
  report('broken', 'broken');
  const ok = results.filter((result) => result.status === 'ok').length;
  console.log(`\n${ok} of ${results.length} links answered OK`);
  if (results.some((result) => result.status === 'broken')) process.exit(1);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
