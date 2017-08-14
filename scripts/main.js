$(() => {
  $('button').click(function () {
    window.location.href = $(this).attr('data-href');
  });
});
