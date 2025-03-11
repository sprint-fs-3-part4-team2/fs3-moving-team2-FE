export default function Home() {
  return <div>main페이지 입니다</div>;
}

const landingPageCardsCommonStyles =
  'transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[4px_4px_8px_-1px_rgba(0,0,0,0.2)] rounded-[32px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.1)] overflow-hidden group';

const firstCardImageStyles =
  'w-[196px] h-[164px] bottom-[6px] right-[0px] xxl:w-[380px] xxl:h-[320px] xxl:bottom-[50px] xxl:left-[83px] animate-shakeVerticalWithAngle transition-transform duration-500 group-hover:-translate-y-2 transform transition-all duration-500 group-hover:-translate-y-5 animate-moveDown absolute';

const textBoxStyles =
  'flex flex-col justify-center mt-[20px] ml-[30px] xxl:mt-[45px] xxl:ml-[42px]';

const textBoxHeadTitleStyles = 'font-semibold text-[25px] xxl:text-[30px]';

const textBoxHeadSubTitleStyles =
  'text-[16px] xxl:text-[20px] text-[var(--grayscale-400)] mt-[5px] xxl:mt-[9px]';
