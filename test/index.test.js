// @flow

import {describe, it} from 'mocha'
import {expect} from 'chai'
import assertRejected from './assertRejected'

import boot from '../src/index'

/*
  usage:

  boot({
    // will be normalized to Bootable
    service_1: (Bootable.factory) () => 123, 
    service_2: (Bootable) {
      factory,
      dependencies
    },
  })
  
  validating service registration:
    typeof s === function -> is a factory
    typeof s === object && s.factory === func -> Bootable
      s.dependencies - optional; set to []

 */

describe('index', () => {
  describe('boot', async () => {
  })
})
