// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import assertRejected from './assertRejected'
import Kernel from '../src/Kernel'


describe('Kernel', () => {
  it('calls the provider functions', async () => {
    let numBooted = 0;

    const kernel = new Kernel({
      a: () => {
        numBooted++;
        return new Promise(resolve => resolve())
      },
      b: () => {
        numBooted++;
      },
    });

    await kernel.boot();
    expect(numBooted).to.be.equal(2)
  })

  it('can be only booted once', async () => {
    const kernel = new Kernel({});

    await kernel.boot();
    
    await assertRejected(() => kernel.boot());
  })
})
