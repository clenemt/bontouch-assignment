import { Link, matchPath, useLocation } from 'react-router-dom';
import { useBreadcrumbs } from '../../pages/contexts/breadcrumbs';
import { capitalize } from '../../utils/generic';

type Props = {
  paths: string[];
};

type Part = {
  name: string;
  url: string;
};

export const Breadcrumb = ({ paths }: Props) => {
  const location = useLocation();
  const [breadCrumbs] = useBreadcrumbs();

  const parts = paths.reduce<Part[]>((acc, path) => {
    const match = matchPath(location.pathname, { path });
    if (match) {
      let name = path.split('/').pop() || 'users';
      if (name?.startsWith(':')) name = breadCrumbs[name.slice(1)];
      acc.push({ name: capitalize(name), url: match.url });
    }
    return acc;
  }, []);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {parts.map((part, i) => (
          <li
            key={part.url}
            className="breadcrumb-item"
            aria-current={i === parts.length - 1 && 'page'}
          >
            {i === parts.length - 1 ? (
              part.name
            ) : (
              <Link to={part.url}>{part.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
