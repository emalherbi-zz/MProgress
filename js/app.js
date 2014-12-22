// A $( document ).ready() block.
$( document ).ready(function() {
  console.log( "ready!" );

  $('#example1').click(function(e) {
    MProgress.configure({
      title: 'Basic Usage...'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example2').click(function(e) {
    MProgress.configure({
      title: 'Example Title...'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example3').click(function(e) {
    MProgress.configure({
      progressInc : 2,
      title: 'Example Inc...'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });
});
