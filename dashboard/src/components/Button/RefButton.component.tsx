interface IRefButton {
  label?: string;
  img?: string;
}

export function RefButton({ label, img }: IRefButton) {
  return (
    <div>
      <button
        className={
          'duration-200 text-xl hover:text-gray-300 active:text-text flex flex-col items-center'
        }
      >
        {label}
        {img ? <img src={img} height={24} width={24} /> : <></>}
      </button>
    </div>
  );
}
