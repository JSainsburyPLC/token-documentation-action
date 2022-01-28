import {getInput, info} from '@actions/core';
import {writeFileSync} from 'fs';
import Mustache from 'mustache';
import {getTokenInfo} from './tokenInfo';

const main = async (): Promise<void> => {
  const secrets = JSON.parse(getInput('secrets', {required: true}));
  const fileName = getInput('file-name', {required: true});
  const template = getInput('template', {required: true});
  const tokenInfo = await getTokenInfo(secrets);
  const md = Mustache.render(template, {tokenInfo, json: JSON.stringify(tokenInfo)});
  info(JSON.stringify(tokenInfo, null, 2));
  writeFileSync(fileName, md);
};

main();
