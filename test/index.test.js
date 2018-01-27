// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import boot from '../src/index'
import ServiceContainer from '../src/di/ServiceContainer'
import Service from '../src/di/Service'
import assertRejected from './assertRejected'

describe('boot', () => {
  it('boots a service container', async () => {
    const sc = await boot({});
    expect(sc).to.be.instanceof(ServiceContainer);
  })
});
