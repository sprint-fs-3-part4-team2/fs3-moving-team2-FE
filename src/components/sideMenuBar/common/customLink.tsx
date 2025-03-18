import Link from 'next/link';

interface CustomLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function CustomLink({
  children,
  href,
}: CustomLinkProps): JSX.Element {
  return (
    <Link
      href={href}
      key={href}
    >
      {children}
    </Link>
  );
}
