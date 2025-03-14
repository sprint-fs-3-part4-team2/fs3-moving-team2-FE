import Link from 'next/link';

export default function Page() {
  return (
    <div className='px-[24px] md:px-[72px] xl:px-[0px] xl:max-w-[1200px] xl:mx-auto h-[54px] xl:h-[96px] flex gap-[24px] xl:gap-[40px] font-[700] text-[14px]/[54px] xl:text-[24px]/[96px]'>
      <Link href='/user/reviews/pending'></Link>
    </div>
  );
}
