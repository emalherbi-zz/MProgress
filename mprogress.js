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
  MProgress.progress = 0;
  MProgress.valuemin = 0;
  MProgress.valuemax = 100;

  var Settings = MProgress.settings = {
    title : 'MProgress ...',
    progressInc : 5,
    progressUpdate : 1,
    progressTimeout : 30,
  };
  MProgress.template = '<div id="' + MProgress.name + '" class="modal fade" ><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + MProgress.settings.title + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="' + MProgress.settings.progressInc + '" aria-valuemin="' + MProgress.valuemin + '" aria-valuemax="' + MProgress.valuemax + '" style="width: ' + MProgress.settings.progressInc + '%"> ' + MProgress.settings.progressInc + '%</div></div></div></div></div></div>';

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
    }

    // update template
    MProgress.template = '<div id="' + MProgress.name + '" class="modal fade" ><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">' + MProgress.settings.title + '</h4></div><div class="modal-body"><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="' + MProgress.settings.progressInc + '" aria-valuemin="' + MProgress.valuemin + '" aria-valuemax="' + MProgress.valuemax + '" style="width: ' + MProgress.settings.progressInc + '%"> ' + MProgress.settings.progressInc + '%</div></div></div></div></div></div>';

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
    for (i=MProgress.progress, len=MProgress.valuemax; i<=len; i++) {
      $('#' + MProgress.name + ' .progress-bar').html(i + '%');
      $('#' + MProgress.name + ' .progress-bar').attr('aria-valuenow', i);
      $('#' + MProgress.name + ' .progress-bar').css('width', i + '%');
    }
    MProgress.progress = i;

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

    // destroy the MProgress
    MProgress.destroy();

    // show the MProgress
    MProgress.show();
  };

  /**
  * Destroy the progress bar.
  *
  *  MProgress.destroy();
  *
  */
  MProgress.destroy = function() {
    $('#' + MProgress.name).on('hidden.bs.modal', function () {
      // dispatch event done
      MProgress.dispatchEventDone();

      $(this).remove();
    });
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
    MProgress.progress = Number( MProgress.settings.progressInc );
    MProgress.handle = window.setInterval(function() {
      MProgress.progress += Number( MProgress.settings.progressInc );

      if ( MProgress.progress < MProgress.valuemax ) {
        $('#' + MProgress.name + ' .progress-bar').html(MProgress.progress + '%');
        $('#' + MProgress.name + ' .progress-bar').attr('aria-valuenow', MProgress.progresss);
        $('#' + MProgress.name + ' .progress-bar').css('width', MProgress.progress + '%');
      }

      if ( i > (MProgress.settings.progressTimeout / MProgress.settings.progressUpdate) ) {
        MProgress.done();
      }

      i++; 
    }, (MProgress.settings.progressUpdate * 1000) );
  };

  /**
   * Done the progress bar.
   *
   *   MProgress.done();
   *
   */
  MProgress.done = function() {
    clearInterval( MProgress.handle );
    MProgress.hide();
  };

  return MProgress;
});
