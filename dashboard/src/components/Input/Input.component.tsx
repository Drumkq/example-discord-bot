interface IInput {
  label: string;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  inputType?: string;
}

export function Input({
  label,
  placeholder,
  onValueChange,
  value,
  inputType = 'text',
}: IInput) {
  return (
    <div className="flex flex-col gap-2">
      <p>
        <span>{label}</span>
      </p>
      <div>
        <input
          className="border-none outline-none bg-border-active p-2 rounded placeholder-zinc-600"
          type={inputType}
          placeholder={placeholder}
          onChange={onValueChange}
          value={value}
        />
      </div>
    </div>
  );
}
