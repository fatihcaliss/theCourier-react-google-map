export default function convertArrayToPolygon(inputArray) {
  const outputArray = [];

  if (Array.isArray(inputArray) && inputArray.length > 0) {
    const coordinates = inputArray[0];

    for (const coordinate of coordinates) {
      if (coordinate.length === 2) {
        const [lng, lat] = coordinate;
        outputArray.push({ lat, lng });
      }
    }
  }

  return outputArray;
}
