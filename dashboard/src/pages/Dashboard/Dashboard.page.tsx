import { RefButton } from '../../components/Button/RefButton.component';
import { Frame } from '../../components/ContentFrame/Frame.component';
import generalIcon from '../../assets/generals.png';
import eventsIcon from '../../assets/events.png';
import botIcon from '../../assets/bot.png';
import testIcon from '../../assets/test.jpg';
import { WelcomeEditor } from '../../components/Features/Messaging/WelcomeMessage/WelcomeEditor.component';

export function DashboardPage() {
  return (
    <>
      <div className="flex flex-col items-center p-10 gap-4">
        <Frame>
          <img
            className="rounded-full w-[100px] h-[100px] select-none"
            src={testIcon}
          />
          <div className="w-full flex mr-[100px] justify-center items-center">
            <span className="text-2xl">Guild name</span>
          </div>
        </Frame>
        <Frame selectable={false} className="flex justify-center gap-14">
          <RefButton label="Generals" img={generalIcon} />
          <RefButton label="Messaging" img={botIcon} />
          <RefButton label="Events" img={eventsIcon} />
        </Frame>
        <Frame className="flex-col">
          {/*
            <PrefixEditor />
            <Button className="mt-10 border-none outline-0 bg-red-900 hover:bg-red-800 active:bg-red-950">
              Remove from the server
            </Button>
            */}
          <WelcomeEditor></WelcomeEditor>
        </Frame>
      </div>
    </>
  );
}
