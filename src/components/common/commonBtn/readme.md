import CommonButton from '@/components/common/commonBtn/commonBtn';

export default function Home() {
  return (
    <div>
      <CommonButton
        widthType='full'
        heightType='secondary'
        backgroundColorType='gray'
        borderColorsType='blue'
        
      >
        시작하기 // text입력 해주세요
      </CommonButton>
    </div>
  );
}


//widthType과 heightType 은 필수값으로 입력해주세요
// 기본으로 적용되어 있는 스타일은 background : blue | text: white | border: none 입니다.
