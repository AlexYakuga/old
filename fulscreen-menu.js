// команда

const openItem = item => {                                      // функция для открытия
  const container = item.closest('.team__item');                // для поиска внутри этого блока обёртки найти team-content
  const contentBlock = container.find('.team__content');        // от team-item контейнера найдем блок потомом team content
  const textBlock = contentBlock.find('.team__content-block');  // в contentBlock мы найдем team__contant-block
  const reqHeight = textBlock.height();                         // берем высоту textBlock и применяем на contentBlock


  container.addClass('active');                                // навешиваем класс на team__item и проверяем на обрботчике (if)
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
  const elemContainer = $this.closest('team__item');


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
