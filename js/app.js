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
      progressInc : 10,
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
    }, 10000);
  });

  $('#example5').click(function(e) {
    MProgress.configure({
      title: 'Example Timeout...',
      progressInc : 5,
      progressUpdate : 1,
      progressTimeout : 30,
    });

    MProgress.start();
  });

  $('#example6').click(function(e) {
    MProgress.configure({
      title: 'Example Add Event Done...',
      progressInc : 5,
      progressUpdate : 1,
      progressTimeout : 30,
    });

    MProgress.start();
    MProgress.eventDone(function() {
      alert( 'Event Done !!!' );
    });
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });
});
