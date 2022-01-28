import {error, warning} from '@actions/core';
import crypto from 'crypto';
import {getUser, isGhToken} from './utils';

type TokenInfo = {name: string; user: string; hash: string};

export const getTokenInfo = async (secrets: {[key: string]: string}): Promise<TokenInfo[]> => {
  const results: TokenInfo[] = [];
  for (const name of Object.keys(secrets).filter(n => n !== 'GITHUB_TOKEN')) {
    if (!isGhToken(secrets[name])) {
      warning(`${name} is not a GH token`);
      continue;
    }
    const token = secrets[name];
    let user, hash;
    try {
      user = await getUser(token);
      hash = crypto.createHash('sha256').update(`${user}_${token}`).digest('hex');
    } catch (err: Error | unknown) {
      error(err as Error);
      user = 'Invalid token';
      hash = '';
    }

    results.push({name, user, hash});
  }
  results.sort((x, y) => (x.name < y.name ? -1 : 1));
  return results;
};
