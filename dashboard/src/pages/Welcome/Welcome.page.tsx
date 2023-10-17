import { LinkButton } from '../../components/Button';

export function WelcomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 p-5">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl">Welcome back</h1>
        <h2 className="text-2xl">Log in using the ways below</h2>
      </div>
      <div>
        <LinkButton className="w-[200px]" label="Discord"></LinkButton>
      </div>
    </div>
  );
}
