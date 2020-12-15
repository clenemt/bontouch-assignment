import { capitalize } from './generic';

describe('capitalize', () => {
  it('capitalize the string passed', () => {
    expect(capitalize('foobar baz')).toEqual('Foobar baz');
    expect(capitalize('FOobar')).toEqual('FOobar');
  });

  it('returns an empty string if invalid', () => {
    expect(capitalize(NaN)).toEqual('');
  });
});
