// @flow
import type {Injectable} from './Injectable'

export type ServiceDefinition = Injectable & {
  name?: string,
  tags?: string|string[],
};
