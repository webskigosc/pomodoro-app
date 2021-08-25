import { fizzBuzz, fib, reversText } from '../../lib/homework';

describe('homework functions', () => {
  describe('fizzBuzz modulo from', () => {
    it('3 get Fizz', () => {
      expect(fizzBuzz(3)).toBe('Fizz');
    });
    it('5 get Buzz', () => {
      expect(fizzBuzz(5)).toBe('Buzz');
    });
    it('15 get Fizz and Buzz', () => {
      expect(fizzBuzz(15)).toBe('FizzBuzz');
    });
  });

  describe('fib from', () => {
    it('1 get 1', () => {
      expect(fib(1)).toBe(1);
    });
    it('3 get 2', () => {
      expect(fib(3)).toBe(2);
    });
    it('8 get 21', () => {
      expect(fib(8)).toBe(21);
    });
  });

  describe('reversText from sting', () => {
    it('abc get cba', () => {
      expect(reversText('abc')).toBe('cba');
    });
    it('Learn React get tcaeR nraeL', () => {
      expect(reversText('Learn React')).toBe('tcaeR nraeL');
    });
  });
});
