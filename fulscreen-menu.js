const menu = document.querySelector('#menu')
const button = document.querySelector('#open')

const close = document.querySelector('#close')

const clickFn = (e) => {
  e.preventDefault()
  menu.classList.toggle('fulscreen-menu--active')
}

button.addEventListener('click', clickFn)
close.addEventListener('click', clickFn)
