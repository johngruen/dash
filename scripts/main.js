$(() => {
  $('button').eq(0).focus();
  $('button').click(function () {
    window.open($(this).attr('data-href'), '_newtab');
  });
});
