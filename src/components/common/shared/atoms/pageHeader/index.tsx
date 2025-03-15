import { PageHeaderProps } from './pageHeader.types';

export default function PageHeader({ children }: PageHeaderProps) {
  return (
    <h1 className='text-[18px] md:text-[18px] xl:text-2xl font-semibold text-black-400 py-[14px] md:py-[14px] xl:py-8'>
      {children}
    </h1>
  );
}
