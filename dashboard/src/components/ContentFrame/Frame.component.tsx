interface IFrame {
  children?: React.ReactNode;
  className?: string;
  selectable?: boolean;
}

export function Frame({ children, className, selectable = true }: IFrame) {
  return (
    <div
      className={`${className} ${
        selectable ? '' : 'select-none'
      } w-1/3 p-5 rounded bg-border flex flex-row`}
    >
      {children}
    </div>
  );
}
