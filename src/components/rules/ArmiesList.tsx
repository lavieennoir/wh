'use client';
import { useMount } from '@/src/hooks/useMount';
import { Army } from '@/src/lib/army';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import ListItemLink from '../common/ListItemLink';

export default function ArmiesList() {
  const armies = Object.values(Army);
  const isMounted = useMount();

  // prevent flickering on initial load
  if (!isMounted) return null;

  return (
    <ul className="list gap-2">
      {armies.map((army) => (
        <li key={army}>
          <ListItemLink href={`/${army}`}>{capitalize(kebabCaseToTitleCase(army))}</ListItemLink>
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
          Space Marines<span className="badge badge-soft badge-info ml-2">Coming Soon</span>
        </ListItemLink>
      </li>
      <li>
        <ListItemLink href="#">
          Tyranids<span className="badge badge-soft badge-info ml-2">Coming Soon</span>
        </ListItemLink>
      </li>
    </ul>
  );
}
