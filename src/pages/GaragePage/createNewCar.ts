const createNewCar = async (carNameValue, carColorValue, setCars) => {
  if (!carColorValue.length) carColorValue = '#000';

  const res = await fetch('http://127.0.0.1:3000/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: carNameValue, color: carColorValue }),
  });

  const newCar = await res.json();
  setCars(prevCars => [...prevCars, newCar]);
};

export default createNewCar;