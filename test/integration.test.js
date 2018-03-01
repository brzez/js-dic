// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import boot from "../src/index";
import mockServiceDefinition from "./mock/mockServiceDefinition";
import {service, tag} from "../src/helpers";

describe('boot', () => {
  it('boots via kernel', async () => {
    const container = await boot([
      mockServiceDefinition({
        name: 'test',
        dependencies: [service('foo'), tag('bar'), tag('baz'), service('foobar')],
        factory (...args: any) {
          return args;
        }
      }),
      mockServiceDefinition({name: 'foo'}),
      mockServiceDefinition({tags: 'bar'}),
      mockServiceDefinition({tags: 'bar'}),
      mockServiceDefinition({tags: 'baz'}),
      mockServiceDefinition({name: 'foobar'})
    ]);

    const result = container.get(service('test'))

    expect(result).to.be.deep.equal([1, [1, 1], [1], 1])
  })
});
