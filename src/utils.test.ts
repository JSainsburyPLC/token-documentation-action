import {isGhToken} from './utils';

describe('isGhToken', () => {
  it('Should not match invalid token', () => {
    expect(isGhToken('foo')).toBeFalsy();
    expect(isGhToken('ghp_foo')).toBeFalsy();
  });
  it('Should match old token', () => {
    expect(isGhToken('abcdefghij1234567890abcdefghij1234567890')).toBeTruthy();
  });
  it('Should match new token', () => {
    expect(isGhToken('ghp_efghij1234567890abcdefghij1234567890')).toBeTruthy();
  });
});
