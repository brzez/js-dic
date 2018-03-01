// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import Kernel from "../src/Kernel";
import mockServiceDefinition from "./mock/mockServiceDefinition";
import Container from "../src/Container";
import {service} from "../src/helpers";
import type {ReadyCallback} from "../src/types/ReadyCallback";

describe('Kernel', () => {
  it('boots all services', async () => {
    const k = new Kernel([
      mockServiceDefinition({name: 'a'}),
      mockServiceDefinition({name: 'b'}),
      mockServiceDefinition({name: 'c'}),
    ]);

    const container = await k.boot();
    expect(container).to.be.instanceOf(Container);
  });

  it('adds $ready callback', async () => {
    let readyFired = false;
    const k = new Kernel([
      mockServiceDefinition({
        factory ($ready) {
          $ready((container) => {
            readyFired = true;
            expect(container).to.be.instanceOf(Container);
          })
        }
      }, service('$ready')),
    ]);

    await k.boot();
    expect(readyFired).to.be.true;
  });
});
