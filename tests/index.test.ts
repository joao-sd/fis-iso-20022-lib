import { greet } from '../src/index';

test('greet function', () => {
  expect(greet('World')).toBe('Hello, World! Welcome to fedwire-iso-20022 library.');
});
