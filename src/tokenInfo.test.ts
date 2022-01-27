import {getTokenInfo} from './tokenInfo';

const token = '1234567890123456789012345678901234567890';
jest.mock('./utils.ts', () => ({
  isGhToken: (input: string) => input === token,
  getUser: () => 'bob'
}));

describe('getTokenInfo', () => {
  it('Should parse secrets and return token info', async () => {
    const result = await getTokenInfo({
      foo: 'foo',
      token
    });
    expect(result).toEqual([
      {
        name: 'token',
        user: 'bob',
        hash: 'dn22dsipxx28CcHoEoVua54NIjiw3SsvHguLdk0Hqwk=' //'bob_' + token
      }
    ]);
  });
});
