import { Button } from '.';
import link from '../../assets/link.png';

export interface ILinkButton {
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function LinkButton({ onClick, className, label }: ILinkButton) {
  return (
    <Button className={`${className}`} onClick={onClick}>
      <div className="flex items-center justify-between ml-2 mr-2">
        {label}
        <img src={link} width={30} height={30} />
      </div>
    </Button>
  );
}
