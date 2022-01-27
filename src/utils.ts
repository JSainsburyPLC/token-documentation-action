import {Octokit} from 'octokit';

export const isGhToken = (secret: string): boolean =>
  /^(ghp_|[a-zA-Z0-9]{4})[a-zA-Z0-9]{36}$/.test(secret);

export const getUser = async (token: string): Promise<string> => {
  const octokit = new Octokit({auth: token});
  const user = await octokit.rest.users.getAuthenticated();
  return user.data.login;
};
