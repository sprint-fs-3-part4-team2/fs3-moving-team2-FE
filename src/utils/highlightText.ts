import { usePathname } from 'next/navigation';

export function highlightText(linkHref: string[]) {
  const pathname = usePathname();

  const highlight = Array.isArray(linkHref)
    ? linkHref.includes(pathname)
    : pathname === linkHref;

  return highlight;
}
