function sieveOfEratosthenes(limit) {
  let primes = [];
  let isPrime = Array(limit + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= limit; i++) {
      if (isPrime[i]) {
          for (let j = i * i; j <= limit; j += i) {
              isPrime[j] = false;
          }
      }
  }

  for (let i = 2; i <= limit; i++) {
      if (isPrime[i]) {
          primes.push(i);
      }
  }
  return primes;
}

function segmentedSieve(limit, segmentSize = 1000000) {
  let primes = [];
  let low = 2;
  let high = Math.min(limit, segmentSize);

  let smallPrimes = sieveOfEratosthenes(Math.floor(Math.sqrt(limit))); // Primes for sieving segments

  while (low <= limit) {
      let isPrime = Array(high - low + 1).fill(true); // Segment's isPrime array
      
      for (let p of smallPrimes) {
          let start = Math.max(p * p, Math.ceil(low / p) * p); // Start marking from the first multiple of p in the segment
          for (let i = start; i <= high; i += p) {
              isPrime[i - low] = false;
          }
      }

      for (let i = low; i <= high; i++) {
          if (isPrime[i - low]) {
              primes.push(i);
          }
      }

      low = high + 1;
      high = Math.min(limit, high + segmentSize);
  }
  return primes;
}


function findNthPrime(n) {
  if (n < 0) {
      return "Invalid input: n must be non-negative.";
  }

  let upperLimit = n * Math.log(n) + n * (Math.log(Math.log(n)));
  if (n < 6) upperLimit = 20;

  let primes = segmentedSieve(Math.ceil(upperLimit * 1.2)); // Overestimate

  return primes[n];
}

class Sieve {
  NthPrime(n) {
    return findNthPrime(n)
  }
}

module.exports = Sieve;
