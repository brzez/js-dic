// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import assertRejected from './assertRejected'

import Kernel from '../src/Kernel'
import Container from '../src/Container'


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


  it('should return Container instance', async () => {
    const kernel = new Kernel({});

    const container = await kernel.boot();

    expect(container).to.be.instanceof(Container);
  })

  describe('register', () => {
    it('should resolve dependencies', async () => {
      const kernel = new Kernel({
        foo: ({register}) => register({
          factory: () => 'bar',
          dependencies: ['baz'],
        }),
        baz: ({register}) => register({
          factory: () => 1337,
        }),
      });
      
      const container = await kernel.boot();

      expect(container.get('foo')).to.be.equal('bar');
      expect(container.get('baz')).to.be.equal(1337);
    })
  })

  describe('ready', () => {
    it('is called after service boot', async () => {
      let readyCalls = 0;

      const kernel = new Kernel({
        a: ({register, ready}) => ready(() => ++readyCalls),
        b: ({register, ready}) => ready(() => ++readyCalls),
        c: ({register, ready}) => ready(() => ++readyCalls),
      });

      expect(readyCalls).to.be.equal(0);
      await kernel.boot();
      expect(readyCalls).to.be.equal(3);
    })
  })
})
