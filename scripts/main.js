$(() => {
  $('button').eq(0).focus();
  $('button').click(function() {
    window.open($(this).attr('data-href'), '_newtab');
  });

  $('.pomodoro').click(function(){
    if( $(this).hasClass('active')) return;
    Notification.requestPermission().then(function(result) {
      $('.pomodoro').css('border-color', '#9d2cac')
                    .addClass('active').find('h2')
                    .text('WORK IT!');
      setTimeout(function() {
        const notification = new Notification("Take 5!");
        $('.pomodoro').find('h2').text('CHILLIN');
        setTimeout(function(){
          const notification = new Notification("Done!");
          $('.pomodoro').css('border-color', '#04c4c7')
              .removeClass('active').find('h2')
              .text('pomodoro');
        }, 1000 * 60 * 5);
      }, 1000 * 60 * 25);
    });
  });

  clock();
  setInterval(clock, 60 * 1000);
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
