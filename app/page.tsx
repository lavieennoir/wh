import ListItemLink from '@/src/components/ListItemLink';
import Navbar from '@/src/components/Navbar';
import { Army } from '@/src/lib/army';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WH',
};

export default function Home() {
  const armies = Object.values(Army);

  return (
    <>
      <Navbar title="Armies" hideBackButton />
      <main className="p-2 pb-16">
        <ul className="list gap-2">
          {armies.map((army) => (
            <li key={army}>
              <ListItemLink href={`/${army}`}>
                {capitalize(kebabCaseToTitleCase(army))}
              </ListItemLink>
            </li>
          ))}
          <li>
            <ListItemLink href="#">
              Adeptus Custodes
              <span className="badge badge-soft badge-info ml-2">Coming Soon</span>
            </ListItemLink>
          </li>
          <li>
            <ListItemLink href="#">
              Adeptus Mechanicus
              <span className="badge badge-soft badge-info ml-2">Coming Soon</span>
            </ListItemLink>
          </li>
          <li>
            <ListItemLink href="#">
              Chaos Daemons<span className="badge badge-soft badge-info ml-2">Coming Soon</span>
            </ListItemLink>
          </li>
          <li>
            <ListItemLink href="#">
              Space Marines<span className="badge badge-soft badge-info ml-2">Coming Soon</span>
            </ListItemLink>
          </li>
          <li>
            <ListItemLink href="#">
              Tyranids<span className="badge badge-soft badge-info ml-2">Coming Soon</span>
            </ListItemLink>
          </li>
        </ul>
      </main>
    </>
  );
}
