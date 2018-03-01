// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import Kernel from "../src/Kernel";
import mockServiceDefinition from "./mock/mockServiceDefinition";
import Container from "../src/Container";

describe('Kernel', () => {
  it('boots all services', async () => {
    const k = new Kernel([
      mockServiceDefinition({name: 'a'}),
      mockServiceDefinition({name: 'b'}),
      mockServiceDefinition({name: 'c'}),
    ]);

    const container = await k.boot();
    expect(container).to.be.instanceOf(Container);
  })
});
