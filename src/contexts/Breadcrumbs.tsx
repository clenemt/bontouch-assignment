import { createContext, useContext, useMemo, useState } from 'react';

export type BreadcrumbsContext = {
  [key: string]: {
    id: number | string;
    name: string;
  };
};

const BreadcrumbsCtx = createContext<
  | [
      BreadcrumbsContext,
      React.Dispatch<React.SetStateAction<BreadcrumbsContext>>
    ]
  | null
>(null);

// The context provider
export const BreadcrumbsProvider = (props: any) => {
  const [breadcrumbs, setBreadcrumbs] = useState({});
  const value = useMemo(() => [breadcrumbs, setBreadcrumbs], [breadcrumbs]);
  return <BreadcrumbsCtx.Provider value={value} {...props} />;
};

// The exposed hook
export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsCtx);
  if (!context) throw new Error('Must be used within a BreadcrumbsProvider');
  return context;
};
