import { act, render } from '@testing-library/react';
import { useDelayedRender, useLocalStorage } from './hooks';

const testHook = (callback) => {
  const TestHook = ({ callback }) => {
    callback();
    return null;
  };
  render(<TestHook callback={callback} />);
};

describe('useDelayedRender', () => {
  it('does nothing if < threshold', () => {
    jest.useFakeTimers();

    let delayed;
    const spy = jest.fn();
    testHook(() => {
      delayed = useDelayedRender(1000);
    });

    delayed(spy);
    expect(spy).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(999));
    delayed(spy);
    expect(spy).not.toHaveBeenCalled();
  });

  it('call the fn if > threshold', () => {
    jest.useFakeTimers();

    let delayed;
    const spy = jest.fn();
    testHook(() => {
      delayed = useDelayedRender(1000);
    });

    act(() => jest.advanceTimersByTime(1000));
    delayed(spy);
    expect(spy).toHaveBeenCalled();
  });
});

describe('useLocalStorage', () => {
  it('returns a value and a setter function', () => {
    let values;
    testHook(() => {
      values = useLocalStorage('foo');
    });
    expect(values).toHaveLength(2);
    expect(values[1]).toBeInstanceOf(Function);
  });

  it('returns the initial value', () => {
    let value;
    testHook(() => {
      [value] = useLocalStorage('foo', 'bar');
    });
    expect(value).toEqual('bar');
  });

  it('allows setting the value', () => {
    let value, setValue;
    testHook(() => {
      [value, setValue] = useLocalStorage('foo', 'bar');
    });

    act(() => setValue('baz'));
    expect(value).toEqual('baz');

    act(() => setValue(null));
    expect(value).toEqual(null);
  });

  it('grabs the previous value available in local storage', () => {
    let value, setValue;
    testHook(() => {
      [value, setValue] = useLocalStorage('previous');
    });
    act(() => setValue('value'));
    testHook(() => {
      [value] = useLocalStorage('previous');
    });
    expect(value).toEqual('value');
  });
});
