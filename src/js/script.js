$(document).ready(function() {

  // Функция вызова Toggle
  function openToggle() {
    $(".page-header__navbar").slideToggle("slow");
  }
  $('.toggle-btn').on('click', openToggle);

  // При нажатии на элемент в списке меню блока header и footer, осуществляется переход
  // к выбранному месту страницы. Элемент в header снизу подчеркивается.
  function activeItem_link() {
    if ($(this).hasClass('main-nav__link')) {
      $('.main-nav__link').removeClass('main-nav__link--active');
      $(this).addClass('main-nav__link--active');
    }
    var elementClick = $(this).attr("href");                     // берется значение из атрибута
    var destination = $(elementClick).offset().top;              // получаем координаты того элемента, на который ссылыемся в "href"
    $('html, body').animate({ scrollTop: destination }, 5000, 'easeInOutCirc');    //переходим к элементу по координатам, которые получили
  }
  $('.main-nav__link, .nav-footer__link').on('click', activeItem_link);

  // Карусель в блоке "trace"
  $('.slick-trace').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1000
        }
      }
    ]
  });

  // Карусель в блоке "have"
  $('.slick-foto').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });

  // Увеличение фотографии в модальном окне в блоке "have"
  $('.mfp-foto').magnificPopup({
    type: 'image',
    closeOnContentClick: true,     // закрыть всплывающее окно, когда пользователь нажимает на его содержимое
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,    // по умолчанию не включено,поэтому нужно включить
      duration: 300     // продолжительность анимации
    }
   });

  // Начинает подсвечивать ячейку c ценой в блоке "price"
  $(".service-table__col2").click(function () {
    $(this).toggleClass("service-table__col2--active");
  });

  $(".service-table__col3").click(function () {
    $(this).toggleClass("service-table__col3--active");
  });

  // Карусель в блоке "reviews"
  $('.slick-reviews').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      }
    ]
  });

  // Раскрывает и закрывает аккордион
  function accordion() {

    function openItem() {
      if ($(this).hasClass('accordion__item-active')) {
        $(this).removeClass('accordion__item-active');
        $(this).children('.accordion__inner').slideUp("slow");
      } else {
        $('.accordion__item').removeClass('accordion__item-active');
        $(this).addClass('accordion__item-active');
        $(this).children('.accordion__inner').slideDown("slow");
      }
    }
    $('.accordion__item').on('click', openItem);

  }
  accordion();

  // Прокрутка до шапки сайта
  function jumpHeader() {
    $('html, body').animate({ scrollTop: 0 }, 5000, 'easeOutQuad');    //переходим к элементу по координатам, которые получили
  }
  $('.btn-up').on('click', jumpHeader);

// // Вычисление общей суммы в аккордионе
// var sum = $('.sum');
// var items = $('.accordion__sub-item');
// var total = 0;

// items.on('click', function(event) {
//   if($(this).data('added') == 'true') {

//   var price = $(this).data('price');
//   if($(this).data('added') == 'true') {
//     $(this).removeData('added');
//     total -= price;
//   } else {
//     $(this).data('added', 'true');
//     total += price;
//   }
//   sum.html(total);
// });


});

// Карта

// Определение точных координат: http://www.mapcoordinates.net/ru
// Примеры кода: https://developers.google.com/maps/documentation/javascript/examples/?hl=ru

// Одна или несколько точек на карте
var mapPoints = [
[
'Новая точка на карте',
60.07686157,
30.27096066,
'<div class="some-class"><h2>Скалодром "BELKA"</h2><p><b>Ближайшая станция:</b> м. Проспект Просвещения</p></br><p><b>Адрес:</b> Санкт-Петербург, Выборгское ш., 220</p></br><p><b>Режим работы:</b> с 10.00 до 22.00</p></div>'
]
];

  // Стилизация карты
  // Подробнее о стилях: https://developers.google.com/maps/documentation/javascript/styling?hl=ru
  var mapStyle = [{
    featureType: 'all',
    stylers: [{ saturation: -100 }],
  }];

  // Будущее инфоокно, возникающее по клику на маркере карты
  var mapInfoWindow = null;

  // Инициализация карты (вызывается после загрузки скрипта)
  function initMap() {
  // Найдем тег карты по id
  var mapDiv = document.getElementById('map');
  // Определим центр карты
  var center = {lat: 60.07752704, lng: 30.30889916};
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
    url: 'img/placeholder-map.png',
  // Эта картинка 128×128 пикселей.
  // Точка «упора» нарисованного маркера по горизонтали — середина
  // Точка «упора» нарисованного маркера по вертикали в 11 пикселях от нижнего края картинки
  size: new google.maps.Size(22, 30),
  anchor: new google.maps.Point(11, 30) // 128 / 2 (горизонталь) и 128 - 11 (вертикаль)
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
