let myMap;

const init = () => {
  myMap = new ymaps.Map('section-map', {
    center: [59.935075, 30.302589],
    zoom: 11,
    controls: []
  });

  const coords = [
    [59.94554327989287, 30.38935262114668],
    [59.91142323563909, 30.50024587065841],
    [59.88693161784606, 30.319658102103713],
    [59.97033574821672, 30.315194906302924]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,                // запрет на перетаскивание
    iconLayout: 'default#image',
    iconImageHref: './img/map/mapstick.png',
    iconImageSize: [30, 42],
    iconImageOffset: [-3, -42]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord)); ///циклом по координатам и в коллек добавим новую точку
  })

  myMap.geoObjects.add(myCollection);
  // через behaivor на якдексе регулируем поведение (зум,скрол и тд)
}

ymaps.ready(init);
