const string = 'Привет! Как дела?';

const vowels = ['у', 'е', 'ы', 'а', 'о', 'э', 'ё', 'я', 'и']

const getVowels = stringToFilter => {
  let extractedVowels = '';

  for (let i = 0; i < stringToFilter.length; i++) {
    const currentLetter = stringToFilter[i].toLowerCase(); // для перевода в нижниий регистр

    //проевряет наличие элемента в массиве и возвращает true или false):
    if (vowels.includes(currentLetter)) {
      extractedVowels += currentLetter; //extractedVowels + currentLetter - аналогично
    }
  }

  return extractedVowels;
}

console.log(getVowels(string));


