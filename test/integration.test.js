// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import boot from "../src/index";
import mockService from "./mock/mockService";
import {service, tag} from "../src/helpers";

describe('boot', () => {
  it('boots via kernel', async () => {
    const container = await boot([
      mockService({
        name: 'test',
        dependencies: [service('foo'), tag('bar'), tag('baz'), service('foobar')],
        factory (...args: any) {
          return args;
        }
      }),
      mockService({name: 'foo'}),
      mockService({tags: 'bar'}),
      mockService({tags: 'bar'}),
      mockService({tags: 'baz'}),
      mockService({name: 'foobar'})
    ]);

    const result = container.get(service('test'))

    expect(result).to.be.deep.equal([1, [1, 1], [1], 1])
  })
});
