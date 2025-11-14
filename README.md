# String Calculator TDD Kata (JavaScript + Vitest)

This repo implements the classic **String Calculator** using **Test-Driven Development** in plain JavaScript (ES modules).

## Requirements covered

- Empty string → `0`
- One number → that number
- Two or more numbers separated by comma or newline → sum
- Custom delimiter via header `//[delimiter]\n` (any length). Examples:
  - `//;\n1;2 → 3`
  - `//[***]\n1***2***3 → 6`
  - `//[*][%]\n1*2%3 → 6` (multiple delimiters; extra credit)
- Negative numbers throw: `negative numbers not allowed <list>`

## Getting started

```bash
npm i    # or: npm i / yarn
npm test # or: npm test / yarn test
npm test:watch
```
