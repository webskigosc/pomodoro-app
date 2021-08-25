function fizzBuzz(i) {
  let result = '';

  if (i % 3 === 0) {
    result += 'Fizz';
  }
  if (i % 5 === 0) {
    result += 'Buzz';
  }

  return result || i;
}

function fib(x) {
  return x <= 1 ? x : fib(x - 2) + fib(x - 1);
}

function reversText(str) {
  return str.split('').reduce((xyz, abc) => abc + xyz, '');
}

export { fizzBuzz, fib, reversText };
