// // API, подключение видео
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     height: "405",
//     width: "660",
//     videoId: "LXb3EKWsInQ",
//     events: {
//       // onReady: onPlayerReady,
//       // onStateChange: onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 1,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0
//     }
//   });
// }













const validateFields = (form, fieldsArray) => {  // создадим функцию, в которую передадим форму  список полей для валдиации

  fieldsArray.forEach((field) => {         //если значение инпута будет пусты
    field.removeClass('input-error');      //перед тем как проверить, удалим класс, чтобы не было бордера после отправки
    if (field.val().trim() == "") {        //trim обрезает пробелы
      field.addClass('input-error');       //то добавим класс, который будет выдавать ошибку
    }
  });

  const errorFields = form.find('.input-error');          //проверим, что в форме ошибок при отправке нет

  return errorFields.length == 0;
}

$('.form').submit((e) => {                      //на форму навесим событие submit
  e.preventDefault();

  const form = $(e.currentTarget);           //сохраним форму 
  const name = form.find("[name='name']");   //ищем нужные поля внутри формы по атрибуту нэйм
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");     // куда уйдет сообщение (делаем скрытый инпут в html)

  const modal = $('#modal');
  const content = modal.find('.modal__content');

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {                   //если кол-во таких запросов = 0, то производим от-ку зап-са
    const request = $.ajax({
      url: 'https://webdev-api.loftschool.com/sendmail', //куда отправляем запрос
      method: 'post',
      data: {
        name: name.val(),               //метод val возьмет значение инпута, а инпут пишем сами
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },                               //данные которые передаем с запросом
    });

    request.done(data => {
      content.text(data.message);                   // от JSON ответ
      name.val('');
      phone.val('');
      comment.val('');
      to.val('');
      // form.reset();
    });

    request.fail(data => {
      const message = data.responseJSON.message;   // от JSON ответ
      content.text(message);                       // методомо текст вставляем ответ от json
      modal.addClass('error-modal');
    })

    request.always(() => {
      $.fancybox.open({                            //обращаемся в фэнсибокс
        src: '#modal',                             //куда передаем
        type: 'inline',                            //передаем настройки,тип
      });
    })
  }
});

$('.app-submit-btn').click((e) => {              //закрываем после отправки формы
  e.preventDefault();

  $.fancybox.close();
});



//слайдер
const slider = $('.products').bxSlider({     // для использования как объекта сохраним в переменную (используем methods)
  pager: false,                              //кастомизируем (options)
  controls: false
});

$('.product-slider__arrow--direction--prev').click((e) => {
  e.preventDefault();
  slider.goToPrevSlide();                  // from bxslider
});

$('.product-slider__arrow--direction--next').click((e) => {
  e.preventDefault();
  slider.goToNextSlide();                  // from bxslider
});

// команда

function openItem(item) {
  const container = item.closest('.team__item'); // для поиска внутри этого блока обёртки найти team-content
  const contentBlock = container.find('.team__content'); // от team-item контейнера найдем блок потомом team content
  const textBlock = contentBlock.find('.team__content-block'); // в contentBlock мы найдем team__contant-block
  const reqHeight = textBlock.height(); // берем высоту textBlock и применяем на contentBlock


  container.addClass('active'); // навешиваем класс на team__item и проверяем на обрботчике (if)
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {                           // закроем все, а откроем нужныею.В функцию передаем контейнер
  const items = container.find('.team__content');               // найдем все блоки team__content
  const itemContainer = container.find('.team__item');

  itemContainer.removeClass('active');                          //удлим все активные классы
  items.height(0);                                              // закроем их
}

$('.team__title').click(e => {
  const $this = $(e.currentTarget);                              // current target ссылается на тот эелемент на который было навешено
  const container = $this.closest('.team');                      // от текущей кнопки, где нажали 
  const elemContainer = $this.closest('.team__item');


  if (elemContainer.hasClass('active')) {                        //если элемеент имеет класс acative, значит он открыт. 
    closeEveryItem(container);                                   //тогда закрываем его
  } else {
    closeEveryItem(container);
    openItem($this);
  }
  // closeEveryItem(container);               // передаем внутрь контейнер, где искать
  // openItem($this);                         // вызываем функция открытия и передаем текущий элемент при нажатии
});


















//отзывы
const findBlocksByAlias = alias => {
  return $('.reviews__item').filter((ndx, item) => {
    return $(item).attr('data-linked-with') == alias;
  });
};
//функция для поиска нужного блока для смены(через обработчик filter, 
//в котором содержится индекс и сам элемент item блок reviews-item ) 
//возвращаем true or false, возьмем атрибут data-linked-with и если он равен переданному alias
// то такой элемент возвращаем 


$('.interactive-avatar__link').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);                                //сохраним текущий элемент
  const target = $this.attr('data-open');                          //при нажатии будем брать значение data open
  const itemToShow = findBlocksByAlias(target);                    //возьмем значение из той ссылки на которую нажали
  const curItem = $this.closest('.reviews__switcher-item');        // не совсем понял зачем

  itemToShow.addClass('active').siblings().removeClass('active');
  curItem.addClass('active').siblings().removeClass('active');     //текущему элементу добавим актив, у соседей удалим

});


//фулскрин меню
const menu = document.querySelector('#menu')
const button = document.querySelector('#open')

const close = document.querySelector('#close')

const clickFn = (e) => {
  e.preventDefault()
  menu.classList.toggle('fulscreen-menu--active')
}

button.addEventListener('click', clickFn)
close.addEventListener('click', clickFn)
