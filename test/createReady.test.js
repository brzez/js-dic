// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'

import createReady from '../src/createReady'

describe('createReady', () => {
  it('adds callback to Kernel readyListeners', () => {
    const readyListeners = [];
    let i = 0;
    const $ready = createReady(({readyListeners}: any))();

    $ready(container => {
      i = 1;
      expect(container).to.be.equal('container');
    });

    readyListeners.forEach(cb => cb('container'));

    expect(i).to.be.equal(1);
  })
});
