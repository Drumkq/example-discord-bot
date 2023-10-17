import { HTMLAttributes } from 'react';

export function Button({
  children,
  onClick,
  className,
}: HTMLAttributes<HTMLElement>) {
  return (
    <div>
      <button
        className={` 
          ${className} 
          p-3 
          outline-3 
          outline-border 
          hover:bg-border active:bg-border-active active:outline-border-active 
          duration-200
          outline 
          rounded 
        `}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
