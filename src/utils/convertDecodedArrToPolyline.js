export default function convertDecodedArrToPolyline(inputArray) {
  const outputArray = [];

  if (Array.isArray(inputArray) && inputArray.length > 0) {
    const coordinates = inputArray[0];

    for (const coordinate of coordinates) {
      if (coordinate.length === 2) {
        const [lat, lng] = coordinate;
        outputArray.push({ lat, lng });
      }
    }
  }

  return outputArray;
}
