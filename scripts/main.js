$(() => {
  $('button').eq(0).focus();
  $('button').click(function() {
    window.open($(this).attr('data-href'), '_newtab');
  });

  clock();
  setTimeout(clock, 60 * 1000);
});

const clock = () => {
  $('.clock').each(function() {
    const locale = $(this).attr('data-tz');
    const time = moment.tz(locale);
    const m = time.format('mm');
    const h = time.format('hh');
    const a = time.format('a');

    if((a === 'am' && h >= 9) || (a === 'pm' && h <= 6)) {
      $(this).addClass('working');
    } else if ($(this).hasClass('working')) {
      $(this).removeClass('working');
    }

    $(this).find('.minute').css('transform',
      `rotate(${(m/60) * 360}deg)`);
    $(this).find('.hour').css('transform', 
      `rotate(${(h/12 + m/(60 * 12)) * 360}deg)`);
  });
}
