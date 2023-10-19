export interface IAButton {
  label: string;
}

export function AButton({ label }: IAButton) {
  return <button className="hover:text-active duration-200">{label}</button>;
}
