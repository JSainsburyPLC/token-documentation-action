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
        hash: '767db676c8a9c71dbc09c1e812856e6b9e0d2238b0dd2b2f1e0b8b764d07ab09' //'bob_' + token
      }
    ]);
  });
});
