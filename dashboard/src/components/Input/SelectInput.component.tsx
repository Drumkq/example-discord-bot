import { useState } from 'react';
import arrow from '../../assets/arrow.png';
import { Button } from '../Button';

interface ISelectInput {
  label: string;
  onValueChange: (option: string) => void;
  values: string[];
}

export function SelectInput({ label, values, onValueChange }: ISelectInput) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('');

  function onSelect(option: string) {
    setOption(option);
    onValueChange(option);
  }

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div
        id={label}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex flex-row justify-between items-center p-1 px-3 cursor-pointer rounded ${
          open ? 'bg-background-active rounded-b-none' : 'bg-border-active'
        } duration-200 hover:bg-background-active`}
      >
        <span>{option}</span>
        <img
          className={`${open ? 'rotate-90' : 'rotate-0'} duration-200`}
          src={arrow}
          width={32}
          height={32}
        />
      </div>
      {open ? (
        <div
          className={
            'relative rounded-t-none w-full bg-border-active duration-200 rounded'
          }
        >
          <li className="list-none">
            {values.map((v, i) => (
              <ul
                key={i}
                className={`${
                  i % 2 === 0 ? 'bg-border-active' : 'bg-background-active'
                } p-1 cursor-pointer`}
                onClick={() => onSelect(v)}
              >
                {v}
              </ul>
            ))}
          </li>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
