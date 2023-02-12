export const generateAccountNumber = () => Math.floor(Math.random() * 1000000000) + 1000000000;

export const generateRandNumber = (len: number = 3) => Math.floor(Math.random() * (10 ** len)) + (10 ** len)

export const generateDate = (len: number = 3) => {
  const today = new Date()
  return Date.parse(`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear() + len}`)
}


