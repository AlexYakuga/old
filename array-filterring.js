
const mixedArray = [3, 13, 74, 14, 66, 15, 22, 4];

const isEven = num => {
  return num % 2 === 0; //целочисленный остаток от деления
}

const filterArray = (arrayToFilter, filterFn) => {
  const filteredArray = []; // храним фильтрованные значения

  arrayToFilter.forEach(num => {
    if (filterFn(num)) {
      filteredArray.push(num);
    }
  })

  return filteredArray;
}

console.log(filterArray(mixedArray, isEven));