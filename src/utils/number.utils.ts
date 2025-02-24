
export default function getRandomNumbers(amountOfNumbers = 6, limit = 800) {
  const nums:number[] = []
  for (let i = 0; i < amountOfNumbers; i++) {
    const num = Math.floor(Math.random() * limit) + 1
    if(nums.includes(num)) {
      i--
      continue
    }
    nums.push(num)
  }
  return nums
}

export function getAroundNumbers(num?: number, limit?: number, maxNumber?: number) {
  maxNumber = maxNumber ?? 1
  limit = limit ?? 2
  if(!num) return []
  
  const numbers = []
  for (let i = Math.max(num - limit, 1); i <= Math.min(num + limit, maxNumber); i++) {
    numbers.push(i)
  }
  return numbers
}