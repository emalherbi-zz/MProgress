// A $( document ).ready() block.
$( document ).ready(function() {
  console.log( "ready!" );

  $('#example1').click(function(e) {
    MProgress.start();
    MProgress.configure({
      title: 'Basic Usage...'
    });

    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example2').click(function(e) {
    MProgress.start();
    MProgress.configure({
      title: 'Example 2...'
    });

    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });
});
