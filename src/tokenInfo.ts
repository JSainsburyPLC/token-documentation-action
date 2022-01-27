import crypto from 'crypto';
import {getUser, isGhToken} from './utils';

type TokenInfo = {name: string; user: string; hash: string};

export const getTokenInfo = async (secrets: {[key: string]: string}): Promise<TokenInfo[]> => {
  const results: TokenInfo[] = [];
  for (const name of Object.keys(secrets).filter(n => n !== 'GITHUB_TOKEN')) {
    if (!isGhToken(secrets[name])) {
      console.log(`${name} is not a GH token`);
      continue;
    }
    const token = secrets[name];
    const user = await getUser(token);
    const hash = crypto.createHash('sha256').update(`${user}_${token}`).digest('base64');
    results.push({name, user, hash});
  }
  return results;
};
