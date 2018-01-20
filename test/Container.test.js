// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import assertRejected from './assertRejected'
import Container from '../src/Container'


describe('Container', () => {
  it('calls the provider functions', async () => {
    let numBooted = 0;

    const container = new Container({
      a: () => {
        numBooted++;
        return new Promise(resolve => resolve())
      },
      b: () => {
        numBooted++;
      },
    });

    await container.boot();
    expect(numBooted).to.be.equal(2)
  })

  it('can be only booted once', async () => {
    const container = new Container({});

    await container.boot();
    
    await assertRejected(() => container.boot());
  })
})
