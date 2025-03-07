'use client';
import Dropdown from '@/app/dropdown/dropdown';

export default function Test() {
  return (
    <div className='bg-black-200 h-screen gap-4'>
      <Dropdown.Service isOpen={true}></Dropdown.Service>
      <br></br>
      <Dropdown.Area isOpen={true}></Dropdown.Area>
      <br></br>
      <Dropdown.Alram isOpen={true} />
      <br></br>
      <Dropdown.Profile isOpen={true} />
    </div>
  );
}
