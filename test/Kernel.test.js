// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import Kernel from "../src/Kernel";
import mockService from "./mock/mockService";
import Container from "../src/Container";

describe('Kernel', () => {
  it('boots all services', async () => {
    const k = new Kernel([
      mockService({name: 'a'}),
      mockService({name: 'b'}),
      mockService({name: 'c'}),
    ]);

    const container = await k.boot();
    expect(container).to.be.instanceOf(Container);
  })
});
