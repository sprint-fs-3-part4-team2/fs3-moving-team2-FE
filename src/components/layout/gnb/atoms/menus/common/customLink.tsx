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
      className='transition-transform duration-300 transform hover:scale-[1.1]'
    >
      {children}
    </Link>
  );
}
