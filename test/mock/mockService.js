// @flow

import type {Dependency} from "../../src/types/Dependency";
import type {ServiceDefinition} from "../../src/types/ServiceDefinition";

export default function mockService (merge = {}, ...requires: Dependency[]): ServiceDefinition {
  return {
    ...merge,
    factory: () => 1,
    requires,
  }
}
