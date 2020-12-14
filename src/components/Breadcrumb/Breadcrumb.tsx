import { Link, matchPath, useLocation } from 'react-router-dom';
import { useBreadcrumbs } from '../../contexts/Breadcrumbs';
import { capitalize } from '../../utils/generic';

type Props = {
  paths: string[];
};

type Part = {
  name: string;
  url: string;
};

// A generic Breadcrumb component
// Every time url changes, will look for a match
// within the passed `paths` props.
// If found, try to replace the parameters (e.g. `/users/:user`)
// with the one from the Breadcrumbs context.
// Otherwise keeps the parameter value (e.g. `/users/1`)
//
// Complexity is needed to avoid having to copy paste
// the component in every pages but instead have
// a single entity in the `App.tsx`
export const Breadcrumb = ({ paths }: Props) => {
  const location = useLocation();
  const [breadCrumbs] = useBreadcrumbs();

  const parts = paths.reduce<Part[]>((acc, path) => {
    const match = matchPath<any>(location.pathname, { path });
    if (match) {
      let name = path.split('/').pop() || 'users';
      if (name?.startsWith(':')) {
        const param = name.slice(1);
        const data = breadCrumbs[param];
        name =
          data?.id === +match.params[param] ? data.name : match.params[param];
      }
      acc.push({ name: capitalize(name), url: match.url });
    }
    return acc;
  }, []);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-light rounded border border-1 ps-4 py-2 mt-3 mt-md-5 mb-5">
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
