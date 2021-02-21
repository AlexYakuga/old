const video = document.querySelector("#player");
const durationControl = document.querySelector('#durationLevel');
const soundControl = document.querySelector('#micLevel');

const playButtonVideo = document.querySelector(".video__player-img");



let intervalId; // обновление интеравла
let soundLevel;
const MAX_SOUND_VALUE = 10;
const NORMAL_UPDATE_RANGE = 1000 / 66; //ЧАСТОТА обновления для полосы прокрутки для плавного продвежения(допустим) 


document.addEventListener('DOMContentLoaded', function () {
  //функция для запуска всего фукционала 

  video.addEventListener('canplaythrough', () => {
    durationControl.max = video.duration;
  })
  durationControl.min = 0; // синхронизируем шкалы видео в браузере и самого видео  //когда загрузится дом пропиши элементу ноль/0
  durationControl.value = 0; //инпут видео влево

  soundControl.min = 0; //
  soundControl.max = MAX_SOUND_VALUE; // инпут звука вправо

  initPlayButton(); //обязательно нужно вызвать функцию для ее работы в ДОМе
  addListener()
})

function initPlayButton() {
  const playButtons = document.querySelectorAll('.play'); //на кнопки play вешаем обработчик событий

  playButtons.forEach(button => {
    button.addEventListener('click', playStop) //запускает плэйстоп по клику
  })
  const micControl = document.querySelector('#mic');
  micControl.addEventListener('click', soundOf) // по клику вызов функции soundof
}

function addListener() {
  // console.log("3333")
  video.addEventListener('click', playStop) // для клика по всему видео
  durationControl.addEventListener('mouseup', setVideoDuration); //для установки ползунка на видео по проигрыванию
  durationControl.addEventListener('mousedown', stopInterval);

  soundControl.addEventListener('click', changeSoundVolume); // смещение ползунка со звуком
}

function playStop() {
  playButtonVideo.classList.toggle('video__player-img--hidden') // метод toggle передает КЛАСС, а не селектор

  // durationControl.max = video.duration; // укажем максимальную границу, длинну видео

  if (video.paused) {
    //если видео на паузе - включаем и наборот
    intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE) // (обновление интервала(ползунка)), через каждые 1000/60
    video.play();
  }

  else {
    stopInterval() // очищает интервал!!!
  }
}

function updateDuration() {
  durationControl.value = video.currentTime
  console.log('обновляем range ползунок')
}

function setVideoDuration() {
  // intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE)
  video.currentTime = durationControl.value; // сколько милесекунд прошло со старта

  if (video.paused) {
    video.play();
    playButtonVideo.classList.add('video__player-img--hidden') // для удаления кнопки паузы
  }
}

function stopInterval() {
  video.pause()
  clearInterval(intervalId) // очищает интервал!!!
}

function soundOf() {

  // надо учесть, что громкость от 0 до 1
  if (video.volume == 0) {
    console.log('video.volume');
    console.log('включаем звук');
    video.volume = soundLevel; //снова выключаем
    soundControl.value = soundLevel * MAX_SOUND_VALUE;
  }

  else {
    // console.log('video.volume');
    console.log('вЫключаем звук');
    soundLevel = video.volume; // сохраянет значение на момент нажатия кнопки
    video.volume = 0;
    soundControl.value = 0;
  }
}

function changeSoundVolume() {
  video.volume = soundControl.value / MAX_SOUND_VALUE;
  console.log('video.volume');
}