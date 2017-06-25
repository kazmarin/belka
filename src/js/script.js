// $(document).ready(function(){
//   // весь ваш код
// });

$(document).ready(function() {
  function accordion() {

    function openItem() {
      if ($(this).hasClass('accordion__item-active')) {
          $(this).removeClass('accordion__item-active');
      } else {
        $('.accordion__item').removeClass('accordion__item-active');
        $(this).addClass('accordion__item-active');
      }
    }
    $('.accordion__item').on('click', openItem);

  }
  accordion();
});


$(document).ready(function() {
  function nav_toggle() {

    function openToggle() {
      $('.page-header__navbar-wrap').toggleClass('page-header__navbar-active');
      //  $('.page-header__navbar-wrap').animate({
      //   top: "30"
      // }, 5000, "easeOutBounce");
    }
    $('.toggle-btn').on('click', openToggle);

  }
  nav_toggle();
});





// Карта

  // Определение точных координат: http://www.mapcoordinates.net/ru
// Примеры кода: https://developers.google.com/maps/documentation/javascript/examples/?hl=ru

// Одна или несколько точек на карте
var mapPoints = [
  [
    'Новая точка на карте',
    59.91016094,
    30.30612718,
    '<div class="some-class"><h2>Заголовок</h2><p>Лорем ипсум долор хрень какая-то, но видно, что это самая обычная разметка</p></div>'
  ]
];

// Стилизация карты
// Подробнее о стилях: https://developers.google.com/maps/documentation/javascript/styling?hl=ru
var mapStyle = [{
  featureType: 'all',
  // stylers: [{ saturation: -100 }]
}];

// Будущее инфоокно, возникающее по клику на маркере карты
var mapInfoWindow = null;

// Инициализация карты (вызывается после загрузки скрипта)
function initMap() {
  // Найдем тег карты по id
  var mapDiv = document.getElementById('map');
  // Определим центр карты
  var center = {lat: 59.91016094, lng: 30.30612718};
  // Создадим объект карты
  var map = new google.maps.Map(mapDiv, {
    zoom: 13,
    center: center,
    disableDefaultUI: true,
    styles: mapStyle
  });
  //  Вызовем функцию, которая расставит маркеры
  setMapMarkers(map);
  // Создадим объект инфоокна
  mapInfoWindow = new google.maps.InfoWindow({
    content: "loading...",
    maxWidth: 200
  });
  // Начнем следить за ресайзом карты
  map.addListener('resize', function() {
    map.panTo(center); // Отцентруем
  });
  // Начнем следить за ресайзом окна (важно, если ресайз окна влияет на размер блока карты)
  google.maps.event.addDomListener(window, 'resize', function(){
    google.maps.event.trigger(map, 'resize'); // Вызовем событие ресайза карты
  });
  // Начнем следить за изменением центра, через 3 с. вернем центр по умолчанию
  // map.addListener('center_changed', function() {
  //   window.setTimeout(function() {
  //     map.panTo(center);
  //   }, 3000);
  // });
}

// Функция проставляет маркеры карты
function setMapMarkers(map) {
  // Данные о картинке-маркере (в этом примере для всех маркеров одна картинка)
  var image = {
    url: 'img/placeholder.png',
    // Эта картинка 128×128 пикселей.
    // Точка «упора» нарисованного маркера по горизонтали — середина
    // Точка «упора» нарисованного маркера по вертикали в 11 пикселях от нижнего края картинки
    size: new google.maps.Size(16, 16),
    anchor: new google.maps.Point(8, 16) // 128 / 2 (горизонталь) и 128 - 11 (вертикаль)
  };
  // Обходим массив маркеров и проставляем каждый
  for (var i = 0; i < mapPoints.length; i++) {
    // Переменная с данными этой точки
    var point = mapPoints[i];
    // Создаем маркер карты
    var marker = new google.maps.Marker({
      position: {lat: point[1], lng: point[2]},
      map: map,
      icon: image,
      title: point[0],
      html: point[3],
    });
    // Начинаем следить за кликом на маркере
    google.maps.event.addListener(marker, 'click', function () {
      mapInfoWindow.setContent(this.html);
      mapInfoWindow.open(map, this);
    });
  }
}
