// A $( document ).ready() block.
$( document ).ready(function() {
  console.log( "ready!" );

  $('#example1').click(function(e) {
    MProgress.configure({
      title: 'Basic usage...',
      progressInc : 1,
      progressUpdate : 0.1,
      progressTimeout : 30,
      progressStriped : false,
      progressClass : 'info'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 8000);
  });

  $('#example2').click(function(e) {
    MProgress.configure({
      title: 'Title 12345...',
      progressInc : 1,
      progressUpdate : 0.1,
      progressTimeout : 30,
      progressStriped : false,
      progressClass : 'info'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example3').click(function(e) {
    MProgress.configure({
      title: 'Inc 5 in progress...',
      progressInc : 5,
      progressUpdate : 0.1,
      progressTimeout : 30,
      progressStriped : false,
      progressClass : 'info'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example4').click(function(e) {
    MProgress.configure({
      title: 'Update progress in 3 seconds...',
      progressInc : 5,
      progressUpdate : 3,
      progressTimeout : 30,
      progressStriped : false,
      progressClass : 'info'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 10000);
  });

  $('#example5').click(function(e) {
    MProgress.configure({
      title: 'Timeout in 30 seconds...',
      progressInc : 1,
      progressUpdate : 0.1,
      progressTimeout : 30,
      progressStriped : false,
      progressClass : 'info'
    });

    MProgress.start();
  });

  $('#example6').click(function(e) {
    MProgress.configure({
      title: 'Event done...',
      progressInc : 1,
      progressUpdate : 0.1,
      progressTimeout : 30,
      progressStriped : false,
      progressClass : 'info'
    });

    MProgress.start();
    MProgress.eventDone(function() {
      alert( 'Event Done !!!' );
    });
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example7').click(function(e) {
    MProgress.configure({
      title: 'Using striped...',
      progressInc : 1,
      progressUpdate : 0.1,
      progressTimeout : 30,
      progressStriped : true,
      progressClass : 'info'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });

  $('#example8').click(function(e) {
    MProgress.configure({
      title: 'Using class danger...',
      progressInc : 1,
      progressUpdate : 0.1,
      progressTimeout : 30,
      progressStriped : false,
      progressClass : 'danger'
    });

    MProgress.start();
    window.setTimeout(function() {
      MProgress.done();
    }, 5000);
  });
});
