import Tab from '../../atoms/tab';
import { TabNavProps } from './tabNav.types';

export default function TabNav({ tab }: TabNavProps) {
  return (
    <div className='w-full border-b border-b-gray-200'>
      <div className='flex mx-auto gap-[24px] h-[54px] md:h-[54px] xl:h-[84px] items-end max-w-[1400px] px-6 md:px-[72px] xl:px-0'>
        <div className='flex items-center gap-6 md:gap-6 xl:gap-8'>
          {Object.entries(tab).map(([url, content]) => (
            <Tab
              key={content}
              url={url}
              tabContent={content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
