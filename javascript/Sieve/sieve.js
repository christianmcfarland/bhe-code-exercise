function sieveOfEratosthenes(n) {
  let primes = Array(n + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
      if (primes[i]) {
          for (let j = i * i; j <= n; j += i) {
              primes[j] = false;
          }
      }
  }

  return primes.reduce((acc, isPrime, index) => {
      if (isPrime) acc.push(index);
      return acc;
  }, []);
}

function findNthPrime(n) {
  if (n < 0) {
    return "Invalid input: n must be non-negative.";
  }

  let upperLimit = n * Math.log(n) + n * (Math.log(Math.log(n))); //An approximation of the nth prime.  Will need to generate primes past this limit.
  if (n < 6) upperLimit = 20; // Special case for small n values where the approximation is bad.  Could be improved.
  
  let primes = sieveOfEratosthenes(Math.ceil(upperLimit)); // Generate primes up to the estimated limit

  if (n >= primes.length) { //If the estimate was too low, generate more primes.
    let i = primes[primes.length-1] + 1;
    while (primes.length <= n) {
      if (isPrime(i)){
          primes.push(i);
      }
      i++;
    }
  }

  return primes[n];
}

function isPrime(num){ //Helper function to check primality.  Slightly more efficient than sieve for larger numbers.
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i = i + 6)
      if (num % i === 0 || num % (i + 2) === 0)
          return false;
  return true;
}

class Sieve {
  NthPrime(n) {
    return findNthPrime(n)
  }
}

module.exports = Sieve;
