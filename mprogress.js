;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.MProgress = factory();
  }

})(this, function() {
  var MProgress = {};

  MProgress.name     = 'modal-mprogress';
  MProgress.version  = '0.1.0';

  MProgress.handle   = null;

  var Settings = MProgress.settings = {
    title : 'MProgress ...',

    progress : 0,

    ariavaluemin : 0,
    ariavaluemax : 100,

    milliseconds : 1000,
    secondstimeout : 30,
  };
  MProgress.template = '<div id="' + MProgress.name + '" class="modal fade" ><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + MProgress.settings.title + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="5" aria-valuemin="' + MProgress.settings.ariavaluemin + '" aria-valuemax="' + MProgress.settings.ariavaluemax + '" style="width: 5%"> 5%</div></div></div></div></div></div>';

  /**
   * Updates configuration.
   *
   *  MProgress.configure({
   *    title: 'Progress 2 ...'
   *  });
   */
  MProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[ key ];

      if ( value !== undefined && options.hasOwnProperty(key) ) {
        Settings[key] = value;
      }
      if ( key === 'title' ) {
        $('#' + MProgress.name + ' .modal-title').html( MProgress.settings.title );
      }
    }

    return this;
  };

  /**
   * Add Event Done the progress bar.
   *
   *   MProgress.addEventDone();
   *
   */
  MProgress.eventDone = function( callback ) {
    // get Event when done the process
    $('#' + MProgress.name).off('EVENT_MPROGRESS_DONE').on('EVENT_MPROGRESS_DONE', function( event ) {
      console.log( 'EVENT_MPROGRESS_DONE' );
      return callback();
    });
  };

  /**
   * Dispatch Event Done the progress bar.
   *
   *   MProgress.dispatchEventDone();
   *
   */
  MProgress.dispatchEventDone = function() {
    // dispatch Event when done the process
    $('#' + MProgress.name).trigger( "EVENT_MPROGRESS_DONE" );
  };

  /**
   * Shows the progress bar.
   *
   *  MProgress.show();
   *
   */
  MProgress.show = function() {
    // show a modal, STATIC
    $('#' + MProgress.name ).modal({ "backdrop" : "static", "keyboard" : false, "show" : true });
  };

  /**
   * Hide the progress bar.
   *
   *   MProgress.hide();
   *
   */
  MProgress.hide = function() {
    // update the MProgress process
    var i, len;
    for (i=MProgress.settings.progress, len=MProgress.settings.ariavaluemax; i<=len; i++) {
      $('#' + MProgress.name + ' .progress-bar').html(i + '%');
      $('#' + MProgress.name + ' .progress-bar').attr('aria-valuenow', i);
      $('#' + MProgress.name + ' .progress-bar').css('width', i + '%');
    }
    MProgress.settings.progress = i;

    window.setTimeout(function() {
      // reset the MProgress
      $('#' + MProgress.name + ' .progress-bar').html(5 + '%');
      $('#' + MProgress.name + ' .progress-bar').attr('aria-valuenow', 5);
      $('#' + MProgress.name + ' .progress-bar').css('width', 5 + '%');

      // hide the MProgress
      $('#' + MProgress.name ).modal('hide');
    }, 1000);
  };

  /**
   * Create the progress bar.
   *
   *  MProgress.create();
   *
   */
  MProgress.create = function() {
    if ( $('#' + MProgress.name ).length == 0 ) {
      $('html body').append( MProgress.template );
    }

    MProgress.show();
  };


  /**
   * Start the progress bar.
   *
   *   MProgress.start();
   *
   */
  MProgress.start = function() {
    var i = 0;

    // clear event DONE if in memory
    $('#' + MProgress.name).off('EVENT_MPROGRESS_DONE');

    MProgress.create();
    MProgress.settings.progress = Number( 0 );
    MProgress.handle = window.setInterval(function() {
      MProgress.settings.progress += Number( 5 );

      if ( MProgress.settings.progress < MProgress.settings.ariavaluemax ) {
        $('#' + MProgress.name + ' .progress-bar').html(MProgress.settings.progress + '%');
        $('#' + MProgress.name + ' .progress-bar').attr('aria-valuenow', MProgress.settings.progresss);
        $('#' + MProgress.name + ' .progress-bar').css('width', MProgress.settings.progress + '%');
      }

      if ( i > MProgress.settings.secondstimeout ) {
        MProgress.done();
      }

      i++; // console.log( i );
    }, MProgress.settings.milliseconds);
  };

  /**
   * Done the progress bar.
   *
   *   MProgress.done();
   *
   */
  MProgress.done = function() {
    clearInterval( MProgress.handle );

    MProgress.dispatchEventDone();
    MProgress.hide();
  };

  return MProgress;
});
