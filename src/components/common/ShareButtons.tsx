'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useToaster } from '@/hooks/useToaster';

interface ShareButtonsProps {
  text: string;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

const ShareButtons = ({ text }: ShareButtonsProps) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const toast = useToaster();

  useEffect(() => {
    // 카카오 SDK 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 링크 공유
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast('info', '링크가 복사되었습니다!');
    } catch (error) {
      toast('warn', '링크 복사에 실패했습니다.');
    }
  };

  // 카카오 공유
  const shareOnKakao = () => {
    if (window.Kakao && window.Kakao.Share) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: document.title,
          description: '이사 견적을 확인해보세요',
          imageUrl: 'https://d3h2ixicz4w2p.cloudfront.net/logo-with-icon.jpg',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } else {
      toast('warn', '카카오톡 SDK가 로드되지 않았습니다.');
    }
  };

  // 페이스북 공유
  const shareOnFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(fbUrl, '_blank');
  };

  return (
    <div>
      <p className='text-md font-semibold mb-2 md:text-xl md:mb-5'>{text}</p>

      <div className='flex gap-4 items-center'>
        {/* 링크 복사 */}
        <button
          onClick={handleCopyLink}
          className='flex items-center justify-center w-10 h-10 rounded-lg border border-grayscale-200 bg-grayscale-50
          xl:w-16 xl:h-16 xl:rounded-2xl'
        >
          <Image
            src='/icons/share/clip.svg'
            alt='링크 공유'
            width={24}
            height={24}
            className='xl:w-9 xl:h-9'
          />
        </button>

        {/* 카카오 공유 */}
        <button
          onClick={shareOnKakao}
          className='flex items-center justify-center w-10 h-10 rounded-lg bg-[#FAE100]
          xl:w-16 xl:h-16 xl:rounded-2xl'
        >
          <Image
            src='/icons/share/kakao.svg'
            alt='카카오톡 공유'
            width={24}
            height={24}
            className='xl:w-7 xl:h-7'
          />
        </button>

        {/* 페이스북 공유 */}
        <button
          onClick={shareOnFacebook}
          className='flex items-center justify-center w-10 h-10 rounded-lg bg-[#4285F4]
          xl:w-16 xl:h-16 xl:rounded-2xl'
        >
          <Image
            src='/icons/share/facebook.svg'
            alt='페이스북 공유'
            width={12}
            height={23}
            className='xl:w-7 xl:h-7'
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
