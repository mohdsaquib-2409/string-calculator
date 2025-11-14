import { describe, it, expect } from 'vitest'
import { add } from '../src/stringCalculator.js'

describe('String Calculator (JS)', () => {
  it('returns 0 for empty string', () => {
    expect(add('')).toBe(0)
  })

  it('returns the number for a single number', () => {
    expect(add('1')).toBe(1)
    expect(add('42')).toBe(42)
  })

  it('sums two comma-separated numbers', () => {
    expect(add('1,5')).toBe(6)
    expect(add('10,20')).toBe(30)
  })

  it('handles any amount of numbers', () => {
    expect(add('1,2,3,4,5')).toBe(15)
  })

  it('allows new lines between numbers', () => {
    expect(add('1\n2,3')).toBe(6)
    expect(add('4\n5\n6')).toBe(15)
  })

  it('supports custom delimiter using //;\\n', () => {
    expect(add('//;\n1;2')).toBe(3)
    expect(add('//*\n2*3*4')).toBe(9)
  })

  it('throws on a single negative with correct message', () => {
    expect(() => add('-1')).toThrowError('negative numbers not allowed -1')
    expect(() => add('2,-5,3')).toThrowError('negative numbers not allowed -5')
  })

  it('lists all negatives in the error', () => {
    expect(() => add('-1,2,-3')).toThrowError('negative numbers not allowed -1,-3')
  })

  // Extra credit per Kata 1: any-length delimiters in [brackets]
  it('supports any-length custom delimiter with //[***]\\n', () => {
    expect(add('//[***]\n1***2***3')).toBe(6)
    expect(add('//[abc]\n4abc5abc6')).toBe(15)
  })

  // Extra credit: multiple delimiters
  it('supports multiple custom delimiters with //[delim1][delim2]\\n', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6)
    expect(add('//[--][++]\n4--5++6')).toBe(15)
  })
})
