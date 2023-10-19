export interface IButton {
  label: string;
  active?: boolean;
}

export function Button({ label, active = true }: IButton) {
  const colorStyle = active ? 'border-active border-2 hover:bg-active hover:text-white cursor-pointer' : 'bg-inactive-prim text-inactive-sec cursor-default';

  return (
    <div className={`${colorStyle} duration-200 p-2 px-6 rounded-full`}>
      <span>{label}</span>
    </div>
  );
}
