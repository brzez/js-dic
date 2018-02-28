// @flow

import type {Dependency} from "../../src/types/Dependency";
import type {ServiceDefinition} from "../../src/types/ServiceDefinition";

export default function mockService (merge: any = {}, ...dependencies: Dependency[]): ServiceDefinition {
  return {
    ...merge,
    factory: () => 1,
    dependencies,
  }
}
