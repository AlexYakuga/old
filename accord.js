


document.querySelector('.slider__list').addEventListener('click', (event) => {    ///выбираем наш список, вешаем обработчик, передаем функция и принимаем в нее объект события
  const trigger = event.target.closest('[data-trigger]');                 //событие у евента (нужно отловить клик только по ссылке, в ближайшем элементе по иерархии вверх).   

  if (!trigger) return                //если тригера нет, то функцию завершаем

  const item = trigger.parentNode    //на родителя тригера (li, item), нужно повесить активный класс
  if (item.classList.contains("active")) {  //проверяем содержит ли item, класс active
    closeItem(item)
  } else {
    closeActiveItem(item)            //закрытие открытх секций, при отрытии другой
    openItem(item)
  }
})

function closeActiveItem(item) {     //закрытие открытх секций, при отрытии другой
  const list = item.parentNode
  const active = list.querySelector('.active')

  if (active) {
    closeItem(active)  //если он существует, то закрываем
  }
}


function openItem(item) {
  const contentWrap = item.querySelector('[data-open]')  //ищем через query сам врапер
  const content = contentWrap.firstElementChild //относительно контентвр берем 1 реб(он один)
  const openWidth = calcWidth(item)   // на какую ширину нужно открывать окно


  content.style.minWidth = '${openWidth}px'
  contentWrap.style.width = '${openWidth}px'           //  задаем ширину этому окну
  item.classList.add('active')

}

function closeItem(item) {
  const contentWrap = item.querySelector('[data-open]')

  contentWrap.style.width = 0           //  задаем ширину этому окну
  item.closest.remove('active')

}

function calcWidth(item) {
  const list = item.parentNode      // взяли весь список (для верстки на tablet)
  const windowWidth = window.innerWidth    //window для всей ширины
  const triggers = list.querySelectorAll('[data-trigger]') // забрать все заголовки
  const triggersWidth = triggers[0].clientWidth * triggers.length             // client это ширина тригера(100) * длину колеекции(3)
  const isMobile = window.matchMedia(('max-width: 768px')).matches        // проверка на каком девайсе сейчас

  if (isMobile) {
    return windowWidth - triggersWidth
  } // если не сработает, то вернет 524

  return 524
}