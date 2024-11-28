import { describe, test, expect} from '@jest/globals'
import {  isValidPass, isMobile } from './util'

describe('isValidPass', () => {
  test('case 1', () => {
    expect(isValidPass('XXxxxxxxx123')).toBe(true)
  })
})
