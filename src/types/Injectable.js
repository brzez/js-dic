// @flow

import type {Dependency} from "./Dependency";
import type {ServiceFactory} from "./ServiceFactory";

export type Injectable = {
  factory: ServiceFactory,
  requires?: Dependency[],
};
