export const generateName = (carBrands) => {
  const length = carBrands.length;
  const randomBrand = Math.floor(Math.random() * length);
  const car = carBrands[randomBrand];
  return `${car.brand} ${car.models[Math.floor(Math.random() * car.models.length)]}`;
};


export const generateColor = () => {
  let color = '#';
  const hexSymbols = '0123456789ABCDEF';
  const startIndex = 0;
  const maxIndex = 6;
  const numHexSymbols = 16;

  for (let i = startIndex; i < maxIndex; i++) {
    color += hexSymbols[Math.floor(Math.random() * numHexSymbols)];
  }
  return color;
};
