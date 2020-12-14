import classNames from 'classnames';

type OwnProps = {
  active?: boolean;
};

type Props = OwnProps & React.ComponentPropsWithoutRef<'button'>;

// A star button that handles a toggle/active state
export const Star = ({ active, className, ...rest }: Props) => (
  <button
    type="button"
    className={classNames('btn btn-star', className, active && 'active')}
    aria-label="Favorite"
    aria-pressed={active}
    {...rest}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  </button>
);
