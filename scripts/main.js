$(document).ready(function() {

  Notification.requestPermission();

  $('.pom--form').submit(function(e) {
    e.preventDefault();
    if(Pomodoro.isValid()) {
      Pomodoro.setTimings();
      Pomodoro.flipState(Pomodoro.activeClass, '.pom--work');
      Pomodoro.run();
      const notification = new Notification('Pomodoro started');
    }
  });

  $('.pom--work').click(function(){
    Pomodoro.flipState(Pomodoro.activeClass, '.pom--set');
    Pomodoro.state = 2;
  });

  $('button').click(function() {
    window.open($(this).attr('data-href'), '_blank');
  });

  Pomodoro.init();
  $('button:eq(0)').focus();
  clock();
  setInterval(clock, 60 * 1000);
});

const Pomodoro = {
  activeClass: '.pom--set',
  state: 0,
  timings: [],
  timer: [],
  init() {
    const self = this;
    $('.pom--set input[type=number]').each(function(i) {
      const multiplier = (i === 2) ? 1 : 60;
      self.timings.push($(this).val() * multiplier);
      self.timer.push($(this).val() * multiplier);
    });
  },

  isValid() {
    let isTrue = true;
    $('.pom--set input[type=number]').each(function() {
      const value = $(this).val();
      if( value <= 0 || value >= 999 ) isTrue = false;
    });
    return isTrue;
  }, 

  setTimings() {
    const self = this;
    $('.pom--set input[type=number]').each(function(i) {
      const multiplier = (i === 2)?  1 : 60;
      self.timings[i] = $(this).val() * multiplier;
      self.timer[i] = $(this).val() * multiplier;
    });
  },

  flipState(start, end) {
    $(start).hide();
    $(end).css('display','flex');
    this.activeClass = end;
  },

  draw() {
    const width = 100 * (this.timer[this.state]/this.timings[this.state]) + '%';
    const label = (this.state) ? 'Chill' : 'Work';
    $('.remaining').css('width', width);
    $('.pom--work h2').text(label);
  },

  run() {
    this.draw();
    setTimeout(() => {
      this.timer[this.state]--;
      if (this.state <= 1) {
        if(this.timer[this.state] >= 0) {
          if (this.timer[this.state] === 0) {
            this.state++;
            if (this.state === 1) {
              const notification = new Notification('Chill Out');
            }
          }
        }
        this.run();
      } else {
        if(this.timer[2] > 0) {
          this.state = 0;
          this.timer[0] = this.timings[0];
          this.timer[1] = this.timings[1];
          const notification = new Notification('Back to work');
          this.run();
        } else {
          this.state = 0;
          this.flipState(this.activeClass, '.pom--set');
          const notification = new Notification('Done');
        }
      }
    }, 1000);
  }
};

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
