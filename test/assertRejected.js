// @flow
import {expect} from 'chai'

export default async function assertRejected (promisefn: () => Promise<any>) {
  let error;
  try {
    await promisefn();
  } catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }

  expect.fail('promise did not reject');
}
