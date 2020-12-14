import { useDelayedRender } from '../../utils/hooks';

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export const Delayed = ({ delay = 300, children }: Props) =>
  useDelayedRender(delay)(() => children);
