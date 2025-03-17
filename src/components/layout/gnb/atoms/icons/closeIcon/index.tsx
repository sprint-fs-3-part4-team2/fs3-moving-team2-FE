import Image from "next/image";

export default function CloseIcon(): JSX.Element {
  return (
    <div className='relative w-[10px] h-[10px]'>
      <Image
        src={'/icons/visbility/close.svg'}
        alt='close icon'
        fill
        className='object-contain'
      />
    </div>
  );
}