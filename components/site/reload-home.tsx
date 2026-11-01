/**
 * Runs before any content paints: a reload (not a direct visit or shared link) always lands on the home page, at the
 * top. Off the home page it swaps the URL for `/` (`location.replace`, so no extra history entry; that load counts
 * as a normal navigation, so it never loops). On the home page it skips the browser's scroll restoration.
 */
const SCRIPT = `try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){if(location.pathname!=="/")location.replace("/");else{history.scrollRestoration="manual";scrollTo(0,0)}}}catch(e){}`;

export function ReloadHomeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
