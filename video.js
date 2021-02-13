const video = document.querySelector("#player");
const durationControl = document.querySelector('#durationLevel');
const soundControl = document.querySelector('#micLevel');

const playButtonVideo = document.querySelector(".video__player-img");

durationControl.addEventListener('input', (e) => {
  console.log(e.target.value);
})

let intervalId;
let soundLevel;
const MAX_SOUND_VALUE = 10;
const NORMAL_UPDATE_RANGE = 1000 / 66; //ЧАСТОТА обновления для полосы прокрутки для плавного продвежения(допустим) 

document.addEventListener('DomContentLoaded', function () { //функция для запуска всего фукционала 

  durationControl.min = 0; // синхронизируем шкалы видео в браузере и самого видео  //когда загрузится дом пропиши элементу ноль/0
  durationControl.value = 0; //инпут видео влево
  soundControl.min = 0; //
  soundControl.max = MAX_SOUND_VALUE; // инпут звука вправо

  initPlayButton(); //обязательно нужно вызвать функцию для ее работы в ДОМе
})

function initPlayButton() {
  const playButtons = document.querySelectorAll('.play'); //на кнопки play вешаем обработчик событий
  playButtons.forEach(button => {
    button.addEventListener('click', playstop) //запускает плэйстоп по клику
  })
}

function playStop() {
  console.log(12321321)
}