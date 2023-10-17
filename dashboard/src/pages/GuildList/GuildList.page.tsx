import { GuildCard } from '../../components/GuildCard/GuildCard.component';

export function GuildList() {
  return (
    <div className="h-screen bg-background flex items-center">
      <div className="flex flex-wrap w-2/3 m-auto justify-center">
        <GuildCard invited={false} />
        <GuildCard invited={false} />
        <GuildCard invited={false} />
        <GuildCard invited={false} />
        <GuildCard invited={false} />
        <GuildCard invited={false} />
        <GuildCard invited={false} />
      </div>
    </div>
  );
}
