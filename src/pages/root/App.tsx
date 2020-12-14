import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryCacheProvider } from 'react-query';
import { Album } from '../album/Album';
import { User } from '../user/User';
import { Users } from '../users/Users';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { queryCache } from '../../services/queries';
import { BreadcrumbsProvider } from '../../contexts/Breadcrumbs';

const routes = [
  { path: '/', component: Users, exact: true },
  { path: '/users/:user/:album', component: Album },
  { path: '/users/:user', component: User }
];

const paths = routes.map((route) => route.path).sort();

export const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <div className="container">
          <BreadcrumbsProvider>
            <Breadcrumb paths={paths} />
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={!!route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </BreadcrumbsProvider>
        </div>
      </Router>
    </ReactQueryCacheProvider>
  );
};
