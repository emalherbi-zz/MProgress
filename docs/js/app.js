$( document ).ready(function() {
  console.log( "ready!" );

  $('#btnStart').click(function(e) {
    MProgress.configure({
      title: 'Basic usage... <a class="btn btn-default" href="javascript:void(0)" onclick="MProgress.done()" ><i class="fa fa-play fa-lg"></i></a> MProgress.done() ',
    }).start();
  });

  $('#example2').click(function(e) {
    MProgress.configure({
      title: 'Hello World! <a class="btn btn-default" href="javascript:void(0)" onclick="MProgress.done()" ><i class="fa fa-play fa-lg"></i></a> MProgress.done()',
      progressInc : 1,
      progressUpdate : 0.1,
      progressStriped : true,
      progressClass : 'danger'
    }).start();

    window.setTimeout(function() {
      MProgress.done();
    }, 60000);
  });
});
