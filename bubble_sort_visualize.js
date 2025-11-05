const FAST_DELAY = 1000000 * 100;
const MEDIUM_DELAY = 1000000 * 10;
const SLOW_DELAY = 1000000 * 1000;

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function generateRandomArray(numberOfElements, min, max) {
  const randomData = [];
  for (let index = 0; index < numberOfElements; index++) {
    randomData.push(random(min, max));
  }
  return randomData;
}

function getBlock(index, mainIndex, secondaryIndex) {
  if (index === mainIndex) {
    return "🔴";
  }

  if (index === secondaryIndex) {
    return "🟢";
  }
  return index < mainIndex ? "🔵" : "⚪️";
}

function generate(data, mainIndex = -1, secondaryIndex = -1) {
  const rows = [];
  for (let index = 0; index < data.length; index++) {
    const value = data[index];
    const barLength = (value / 10) + 1;
    const element = getBlock(index, mainIndex, secondaryIndex);
    const bar = (value + " ").padStart(5) + element.repeat(barLength);
    rows.push(bar);
  }
  return rows.join("\n");
}

function displayData(data, mainIndex, secondaryIndex) {
  const stringRepresentation = generate(data, mainIndex, secondaryIndex);
  console.clear();
  console.log(stringRepresentation);
}

function delay(delayValue = 10000) {
  for (let index = 0; index < delayValue; index++) {}
}

function bubbleSort(data, delayValue) {
  const dataToSort = data.slice();
  const endCount = dataToSort.length;
  displayData(dataToSort);
  for (let outerIndex = 0; outerIndex < endCount; outerIndex++) {
    for (
      let innerIndex = outerIndex + 1;
      innerIndex < endCount;
      innerIndex++
    ) {
      if (dataToSort[outerIndex] < dataToSort[innerIndex]) {
        const temp = dataToSort[outerIndex];
        dataToSort[outerIndex] = dataToSort[innerIndex];
        dataToSort[innerIndex] = temp;
      }
      displayData(dataToSort, outerIndex, innerIndex);
      delay(delayValue);
    }
  displayData(dataToSort, dataToSort.length);

  }

  return dataToSort;
}

function getDelayValue(delaySelection) {
  switch (delaySelection) {
    case "fast":
      return FAST_DELAY;
    case "slow":
      return SLOW_DELAY;
    default:
      return MEDIUM_DELAY;
  }
}

function startSorting() {
  const numberOfElements = +Deno.args[0] || 10;
  const min = +Deno.args[1] || 1;
  const max = +Deno.args[2] || 100;
  const delayValue = getDelayValue(Deno.args[3]);
  const randomData = generateRandomArray(numberOfElements, min, max);
  bubbleSort(randomData, delayValue);
}

startSorting();
