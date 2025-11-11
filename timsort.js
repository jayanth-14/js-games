const toBeSorted = [1, 2, 3, 0, 9, 8, 11, 5, 1, 1,];

const isLower = (x, y) => x < y;
const isGreater = (x, y) => x > y;
let numberOfOperators = 0;
const getComparator = (previous, last) => {
  if (previous === undefined) {
    return () => true;
  }
  if (previous < last) {
    return isGreater;
  }
  return isLower;
};

const elementFromLast = (array, indexFromLast) =>
  array[array.length - indexFromLast];

const findRuns = (runs, element) => {
  numberOfOperators++;
  const lastRun = runs[runs.length - 1];
  if (lastRun === undefined) {
    runs.push([element]);
    return runs;
  }
  const lastElement = elementFromLast(lastRun, 1);
  const lastPrevious = elementFromLast(lastRun, 2);
  const comparator = getComparator(lastPrevious, lastElement);
  if (comparator(element, lastElement)) {
    lastRun.push(element);
    return runs;
  }
  runs.push([element]);
  return runs;
};

function bubbleSort(data) {
  const dataToSort = data.slice();

  for (let outerIndex = 0; outerIndex < dataToSort.length; outerIndex++) {
    for (
      let innerIndex = outerIndex + 1;
      innerIndex < dataToSort.length;
      innerIndex++
    ) {
      numberOfOperators++;
      if (dataToSort[outerIndex] > dataToSort[innerIndex]) {
        const temp = dataToSort[outerIndex];
        dataToSort[outerIndex] = dataToSort[innerIndex];
        dataToSort[innerIndex] = temp;
      }
    }
  }

  return dataToSort;
}

const sortToAsc = (array) => {
  const difference = array[0] - array[1];
  if (difference < 0) {
    return array;
  }
  return bubbleSort(array);
};

// merge sort
const isUndefined = (value) => value === undefined;

const isLesser = (value1, value2) => value1 < value2;

const isFirstSmaller = (value1, value2) =>
  isLesser(value1, value2) || isUndefined(value2);

const shiftSmaller = (array1, array2) =>
  isFirstSmaller(array1[0], array2[0]) ? array1.shift() : array2.shift();

const mergeSorted = (array1, array2) => {
  const merged = [];
  const totalLength = array1.length + array2.length;
  while (merged.length !== totalLength) {
    numberOfOperators++;
    merged.push(shiftSmaller(array1, array2));
  }

  return merged;
};

const getRuns = (array) => array.reduce(findRuns, []);

console.clear();
console.log("all elements : ", toBeSorted);
prompt("");
const runs = getRuns(toBeSorted);
console.log("all runs : ", runs);
prompt("");
const ascendRuns = runs.map(sortToAsc);
console.log("sorted runs: ", ascendRuns);
prompt("");
const sorted = ascendRuns.reduce(mergeSorted, []);
console.log("sorted : ", sorted);
console.log("number : ", numberOfOperators);
