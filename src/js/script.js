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
