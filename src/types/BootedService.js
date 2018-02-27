// @flow

import type {ServiceMetadata} from "./ServiceMetadata";

export type BootedService = ServiceMetadata & {
  value: any,
};
