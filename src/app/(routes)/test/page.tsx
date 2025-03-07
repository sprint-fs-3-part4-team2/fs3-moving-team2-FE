'use client';
import Dropdown from '@/components/dropdown/dropdown';

export default function Test() {
  return (
    <div className='bg-black-200  gap-4'>
      <Dropdown.Service></Dropdown.Service>
      <br></br>
      <Dropdown.Area></Dropdown.Area>
      <br></br>
      <Dropdown.Alram isOpen={true} />
      <br></br>
      <Dropdown.Profile isOpen={true} />
    </div>
  );
}
