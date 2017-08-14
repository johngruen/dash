$(() => {
  $('button').eq(0).focus();
  $('button').click(function () {
    window.location.href = $(this).attr('data-href');
  });
});
