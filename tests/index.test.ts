import { greet } from '../src/example';

test('greet function', () => {
  expect(greet('World')).toBe(
    'Hello, World! Welcome to fedwire-iso-20022 library.',
  );
});
