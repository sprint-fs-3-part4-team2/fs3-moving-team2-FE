import cn from '@/utils/cn';
export const d2Class = cn(
  `flex flex-wrap bg-white  w-full  overflow-auto shadow-primary custom-scroll`,
  'rounded-md xl:rounded-2xl rounded-br-none xl:rounded-br-none',
);
export const ulClass = cn(
  d2Class,
  'absolute z-10 block overflow-hidden shadow-[4px_4px_10px_0px_#E0E0E040] top-[115%]',
);
