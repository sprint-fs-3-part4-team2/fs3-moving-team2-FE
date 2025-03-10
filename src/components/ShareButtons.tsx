'use client';

import Image from 'next/image';

interface ShareButtonsProps {
  text: string;
}

const ShareButtons = ({ text }: ShareButtonsProps) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // 링크 공유
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('링크가 복사되었습니다!');
    } catch (error) {
      console.error('링크 복사 실패', error);
    }
  };

  // 카카오 공유
  const shareOnKakao = () => {
    const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=e37ad5eb9d777fdc772bfec0c290ddcd&target_id_type=URL&target_id=${encodeURIComponent(currentUrl)}`;
    window.open(kakaoUrl, '_blank', 'width=600,height=600');
  };

  // 페이스북 공유
  const shareOnFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(fbUrl, '_blank');
  };

  return (
    <div>
      <p className='text-xl font-semibold mb-5'>{text}</p>

      <div className='flex gap-4 items-center'>
        {/* 링크 복사 */}
        <button
          onClick={handleCopyLink}
          className='flex items-center justify-center rounded-2xl border-[1px] border-grayscale-200 bg-grayscale-50 w-16 h-16'
        >
          <Image
            src='/icons/share/clip.svg'
            alt='링크 공유'
            width={36}
            height={36}
          />
        </button>

        {/* 카카오 공유 */}
        <button
          onClick={shareOnKakao}
          className='flex items-center justify-center rounded-2xl bg-[#FAE100] w-16 h-16'
        >
          <Image
            src='/icons/share/kakao.svg'
            alt='카카오톡 공유'
            width={28}
            height={28}
          />
        </button>

        {/* 페이스북 공유 */}
        <button
          onClick={shareOnFacebook}
          className='flex items-center justify-center rounded-2xl bg-[#4285F4] w-16 h-16'
        >
          <Image
            src='/icons/share/facebook.svg'
            alt='페이스북 공유'
            width={14}
            height={27}
          />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;

/* 
예시
<ShareButtons text="나만 알기엔 아쉬운 기사님인가요?"/>
*/
