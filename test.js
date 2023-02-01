const generateRandNumber = (len = 3) => Math.floor(Math.random() * (10 ** len))

console.log(
  generateRandNumber(7)
)