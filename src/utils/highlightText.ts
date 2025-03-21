export function highlightText(linkHref: string[], pathname: string) {

  const highlight = Array.isArray(linkHref)
    ? linkHref.includes(pathname)
    : pathname === linkHref;

  return highlight;
}
