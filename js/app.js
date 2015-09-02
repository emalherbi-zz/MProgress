$( document ).ready(function() {
  console.log( "ready!" );

  $('#example1').click(function(e) {
    MProgress.start();

    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example2').click(function(e) {
    MProgress.configure({
      title: 'Hello World!',
      progressInc : 1,
      progressUpdate : 0.1,
      progressStriped : true,
      progressClass : 'danger'
    }).start();

    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });
});
