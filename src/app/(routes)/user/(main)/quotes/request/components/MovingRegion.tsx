import useQuoteRequestStore from '@/store/quoteRequestStore';
import { useEffect, useState } from 'react';
import RequestMessage from './RequestMessage';
import CommonButton from '@/components/common/commonBtn/commonBtn';
import cn from '@/utils/cn';

export function MovingRegion({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [daumLoaded, setDaumLoaded] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false); // 모달 열린 상태 관리
  const { setRegisterData } = useQuoteRequestStore();

  // 스크립트를 한 번만 로드합니다.
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => {
      setDaumLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 사용자가 버튼을 클릭하면 호출되는 함수입니다.
  const openAddressModal = (type: 'from' | 'to') => {
    if (!daumLoaded || addressModalOpen) {
      console.log('Daum script not loaded yet or Address modal already open');
      return;
    }
    setAddressModalOpen(true);
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        console.log(data);
        if (type === 'from') {
          setFrom(data.address);
          setRegisterData({ moveFrom: data.address });
        } else {
          setTo(data.address);
          setRegisterData({ moveTo: data.address });
        }
        setAddressModalOpen(false);
      },
      onclose: function () {
        // 모달 닫힐 때 상태 초기화
        setAddressModalOpen(false);
      },
    }).open();
  };

  return (
    <div>
      <RequestMessage align='left'>이사 지역을 선택해주세요.</RequestMessage>
      <RequestMessage
        align='right'
        className='p-6 xl:p-8 max-w-[327px] xl:max-w-[624px]'
      >
        <div className='w-[279px] xl:w-[560px]'>
          <h5 className='mb-4'>출발지</h5>
          <CommonButton
            widthType='full'
            heightType='primary'
            backgroundColorType='dynamic'
            textColorType='blue'
            borderColorsType='blue'
            onClick={() => openAddressModal('from')}
          >
            {!from && `출발지 선택하기`}
            {from && (
              <span className='underline underline-offset-4'> {from}</span>
            )}
          </CommonButton>

          <h5 className='mt-5 mb-4'>도착지</h5>
          <CommonButton
            widthType='full'
            heightType='primary'
            backgroundColorType='dynamic'
            textColorType='blue'
            borderColorsType='blue'
            onClick={() => openAddressModal('to')}
          >
            {!to && `도착지 선택하기`}
            {to && <span className='underline underline-offset-4'> {to}</span>}
          </CommonButton>

          <br />
          <CommonButton
            widthType='full'
            heightType='primary'
            backgroundColorType={from && to ? 'blue' : 'gray'}
            textColorType='white'
            className={cn(
              'mt-8',
              from && to ? 'cursor-pointer' : 'cursor-not-allowed',
            )}
            disabled={from && to ? false : true}
            onClick={() => {
              setRegisterData({
                moveFrom: from || '',
                moveTo: to || '',
              });
              setShowModal(true);
            }}
          >
            견적 확정하기
          </CommonButton>
        </div>
      </RequestMessage>
    </div>
  );
}
