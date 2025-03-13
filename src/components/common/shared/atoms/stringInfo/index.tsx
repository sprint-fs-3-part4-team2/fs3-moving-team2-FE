export default function StringInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex items-center text-black-300 text-[13px] md:text-[13px] xl:text-[18px]'>
      {children}
    </div>
  );
}
