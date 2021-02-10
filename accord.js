
document.querySelector('.slider__list').addEventListener('click', (event) => {    ///выбираем наш список, вешаем обработчик, передаем функция и принимаем в нее объект события
  const trigger = event.target.closest('[data-trigger]');                 //событие у евента (нужно отловить клик только по ссылке, в ближайшем элементе по иерархии вверх).   

  if (!trigger) return                //если тригера нет, то функцию завершаем

  const item = trigger.parentNode    //на родителя тригера (li, item), нужно повесить активный класс
  if (item.classList.contains("active")) {  //проверяем содержит ли item, класс active
    closeItem(item)
  } else {
    openItem(item)
  }
})


function openItem(item) {
  const contentWrap = item.querySelector('[data-open]')  //ищем через query сам врапер
  const openWidth = calcWidth(item)   // на какую ширину нужно открывать окно

  contentWrap.style.width = '${openWidth}px'           //  задаем ширину этому окну
  item.closest.add('active')

}

function calcWidth(item) {
  return 524
}