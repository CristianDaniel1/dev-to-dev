/** A page that lists resources, as described in its structured data. */
export interface ListingPage {
  name: string;
  description: string;
  /** Router path of the page, e.g. '/recursos/ferramentas'. */
  path: string;
}
