const button = document.querySelector('#open')
const menu = document.querySelector('#menu')

button.addEventListener('click', () => {
  menu.classList.toggle('menu--active')
})