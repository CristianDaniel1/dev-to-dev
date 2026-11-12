import { listIndexableRoutes } from './postbuild/prerendered-pages';
import {
  exposeNotFoundPage,
  removeCsrFallback,
  writeRobots,
  writeSitemap,
} from './postbuild/static-files';

const main = async (): Promise<void> => {
  await exposeNotFoundPage();
  await removeCsrFallback();
  const routes = await listIndexableRoutes();
  await writeSitemap(routes);
  await writeRobots();
  console.log(`postbuild: 404.html, robots.txt and sitemap.xml (${routes.length} routes) written.`);
};

main().catch((error: unknown) => {
  console.error('postbuild failed:', error);
  process.exit(1);
});
