'use client';
import Dropdown, { DropdownCta } from '@/components/dropdown/dropdown';
import { useEffect, useState } from 'react';

export default function Test() {
  const [value, setValue] = useState<any>();

  useEffect(() => {
    console.log('난 페이지 벨류 //// ', value);
  }, [value]);
  return (
    <div className='bg-black-200 gap-4'>
      <Dropdown.Service
        className='z-2'
        dispatch={setValue}
      />
      <br></br>
      <Dropdown.Area dispatch={setValue} />
      <br></br>
      <Dropdown.Alram className='z-10'>
        <h2>테스트</h2>
      </Dropdown.Alram>
      <br></br>
      <Dropdown.Profile>
        <h2>테스트</h2>
      </Dropdown.Profile>
      <DropdownCta
        data={[{ name: '확정된 견적서' }]}
        className='max-w-[250px]'
        dispatch={setValue}
      />
    </div>
  );
}
