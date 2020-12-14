import { createContext, useContext, useMemo, useState } from 'react';

export type BreadcrumbsContext = {
  [key: string]: string;
  userId: string;
  albumId: string;
};

const BreadcrumbsCtx = createContext<
  | [
      BreadcrumbsContext,
      React.Dispatch<React.SetStateAction<BreadcrumbsContext>>
    ]
  | null
>(null);

export const BreadcrumbsProvider = (props: any) => {
  const [breadcrumbs, setBreadcrumbs] = useState({});
  const value = useMemo(() => [breadcrumbs, setBreadcrumbs], [breadcrumbs]);
  return <BreadcrumbsCtx.Provider value={value} {...props} />;
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsCtx);
  if (!context)
    throw new Error(`useBreadcrumbs must be used within a BreadcrumbsProvider`);
  return context;
};
