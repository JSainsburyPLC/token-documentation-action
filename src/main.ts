import {getInput} from '@actions/core';
import {parse} from '@ctrl/golang-template';
import {writeFileSync} from 'fs';
import {getTokenInfo} from './tokenInfo';

const main = async (): Promise<void> => {
  const secrets = JSON.parse(getInput('secrets', {required: true}));
  const fileName = getInput('file-name', {required: true});
  const template = getInput('template', {required: true});
  const tokenInfo = await getTokenInfo(secrets);
  const md = parse(template, {tokenInfo, json: JSON.stringify(tokenInfo)});
  writeFileSync(fileName, md);
};

main();
