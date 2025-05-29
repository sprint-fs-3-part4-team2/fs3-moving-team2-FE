interface QuoteRequestErrorProps {
  onRetry: () => void;
  error: { message: string };
}

export function QuoteRequestError({ onRetry, error }: QuoteRequestErrorProps) {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
      <p className='text-red-500 mb-4'>오류: {error.message}</p>
      <button
        onClick={onRetry}
        className='btn'
      >
        다시 시도
      </button>
    </div>
  );
}
