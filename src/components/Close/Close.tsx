import classNames from 'classnames';

type OwnProps = {
  variant: string;
};

type Props = OwnProps & React.ComponentPropsWithoutRef<'button'>;

// A close button that handles variant (mostly light)
export const Close = ({ className, variant, ...rest }: Props) => (
  <button
    type="button"
    className={classNames(
      'btn btn-close',
      className,
      variant && variant.split(' ').map((v) => `btn-close--${v}`)
    )}
    aria-label="Close"
    {...rest}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>
);
