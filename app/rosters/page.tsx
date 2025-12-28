import InformationCircleIcon from '@/public/icons/information-circle.svg';
import Navbar from '@/src/components/Navbar';

export default function RosterPage() {
  return (
    <>
      <Navbar title="Rosters" hideBackButton />
      <main className="p-2 pb-16">
        <div role="alert" className="alert alert-vertical sm:alert-horizontal">
          <InformationCircleIcon className="size-6 shrink-0 stroke-info" />
          <div>
            <h3 className="font-bold">This feature is coming soon!</h3>
            <div className="text-xs">Rosters are not yet available</div>
          </div>
        </div>
      </main>
    </>
  );
}
