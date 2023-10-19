import { Button } from '../Buttons';
import { AButton } from '../Buttons/AButton';

export function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between mx-auto p-4">
      <div className='flex items-center gap-5'>
        <div className='rounded-full w-[50px] h-[50px] bg-gray-300'></div>
        <h1 id="NAMING" className="text-2xl">
            BRAND NAME
        </h1>
      </div>
      <div className="flex gap-10">
        <AButton label="DASHBOARD" />
        <AButton label="FEATURES" />
        <AButton label="ABOUT" />
        <AButton label="POLICY" />

        <Button label="LOG IN" />
      </div>
    </nav>
  );
}
