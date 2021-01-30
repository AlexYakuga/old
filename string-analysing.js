const path = "/users/download/index.html"

const isHtml = path => {
  const required = '.html'; // c этой строкой сравнение
  const pathExt = path.slice(-5);  //вырезать последние 5 символов

  //return pathExt = path.slice(-5) или так
  if (pathExt === required) {
    return true
  } else {
    return false
  }
}

console.log(isHtml(path))