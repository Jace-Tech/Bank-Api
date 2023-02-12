export const generateAccountNumber = () => Math.floor(Math.random() * 1000000000) + 1000000000;

export const generateRandNumber = (len: number = 3) => Math.floor(Math.random() * (10 ** len)) + (10 ** len)

export const generateDate = (len: number = 3) => {
  const today = new Date()
  return Date.parse(`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear() + len}`)
}

const getPercentage = (amount: number, percent: number): number => (amount * percent) / 100


export const generateInterest = (amount: number, income: number): number => {
  let interest
  if(income >= 2000 && income <= 5000) {
    interest = getPercentage(amount, 0.5)
  }
  else if(income >= 6000 && income <= 10000) {
    interest = getPercentage(amount, 1)
  }
  else if(income >= 11000 && income <= 20000) {
    interest = getPercentage(amount, 1.5)
  }
  else if(income >= 21000 && income <= 50000){
    interest = getPercentage(amount, 2.5)
  }
  else {
    interest = getPercentage(amount, 4.5)
  }

  return interest + amount
}