
const workers = [
  { name: "John", salary: 500 },
  { name: "Mike", salary: 1300 },
  { name: "Linda", salary: 1500 },
];

const getWorthyWorkers = (workersArr) => {
  const worthyWorkers = [];//заводим массив под выборку

  // for (let i = 0; i < workersArr.length; i++) {
  //   const currentWorkers = workersArr[i];// для обрщения к элементу

  //   if (currentWorkers.salary > 1000) {  // если зп >1000, то добавим в массив worthytworkers
  //     worthyWorkers.push(currentWorkers.name); // по именам
  //   }
  // }

  workersArr.forEach(currentWorker => {
    if (currentWorker.salary > 1000) {
      worthyWorkers.push(currentWorker.name)
    }
  })

  return worthyWorkers;
};

console.log(getWorthyWorkers(workers));

