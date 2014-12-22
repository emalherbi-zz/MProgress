// A $( document ).ready() block.
$( document ).ready(function() {
  console.log( "ready!" );

  $('#example1').click(function(e) {
    MProgress.configure({
      title: 'Basic Usage...',
      progressInc : 5,
      progressUpdate : 1,
      progressTimeout : 30
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example2').click(function(e) {
    MProgress.configure({
      title: 'Example Title...',
      progressInc : 5,
      progressUpdate : 1,
      progressTimeout : 30
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example3').click(function(e) {
    MProgress.configure({
      title: 'Example Inc...',
      progressInc : 2,
      progressUpdate : 1,
      progressTimeout : 30,
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example4').click(function(e) {
    MProgress.configure({
      title: 'Example Progress Update...',
      progressInc : 5,
      progressUpdate : 3,
      progressTimeout : 30,
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });
});
