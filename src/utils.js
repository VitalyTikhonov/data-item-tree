export function getRandomNumber(min, max) {
  const randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randomNumber);
}
