interface QuoteRequestHeaderProps {
  progress: number;
  title: string;
}

export default function QuoteRequestHeader({
  progress,
  title,
}: QuoteRequestHeaderProps) {
  return (
    <header className='sticky bg-white px-6 flex items-center h-[96px] xl:h-32 top-[54px] xl:top-[89px] left-0 right-0 z-10'>
      {/* 견적 요청 div */}
      <div className='flex flex-col justify-between flex-1 max-w-[327px] xl:max-w-[1400px] mx-auto h-12 xl:h-16 bg-grayscale-50'>
        <h1 className='font-semibold text-2lg xl:text-2xl'>{title}</h1>
        <div className='w-full bg-line-200 rounded-full h-1.5 xl:h-2 mb-2'>
          <div
            className={
              'bg-blue-500 h-1.5 xl:h-2 rounded-full transition-all duration-500 ease-in-out'
            }
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </header>
  );
}
