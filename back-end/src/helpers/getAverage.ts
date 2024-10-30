const getAverage = (array: number[]) => {
  if (array.length == 0) return 0;
  return Math.round(array.reduce((acc, value) => acc + value) / array.length);
};

export default getAverage;
