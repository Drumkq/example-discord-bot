interface IGuildCard {
  invited: boolean;
}

export function GuildCard({ invited }: IGuildCard) {
  return (
    <div className="p-12">
      <div className="w-[300px] h-[225px] bg-border-active rounded-tr rounded-tl flex justify-center items-center">
        <div className="rounded-full w-[125px] h-[125px] bg-white" />
      </div>
      <div className="w-[300px] text-center p-5 text-xl outline-0 rounded-br rounded-bl bg-border duration-200 select-none hover:bg-background-active active:bg-border">
        <span>{invited ? 'Settings' : 'Invite'}</span>
      </div>
    </div>
  );
}
