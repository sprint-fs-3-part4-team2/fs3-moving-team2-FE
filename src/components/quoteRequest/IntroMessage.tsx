import RequestMessage from './RequestMessage';

export default function IntroMessage() {
  return (
    <section className='quote-intro'>
      <RequestMessage align='left'>
        몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)
      </RequestMessage>
    </section>
  );
}
