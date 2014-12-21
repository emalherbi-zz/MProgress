/*!
 * MProgress.js v1.0.0 (http://emalherbi.github.io/mprogress/)
 * Copyright 2010-2014 emalherbi
 * Licensed under MIT (http://en.wikipedia.org/wiki/MIT_License)
 */
/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=657a1eb43d8a4bd3038c)
 * Config saved to config.json and https://gist.github.com/657a1eb43d8a4bd3038c
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.1'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (that.options.backdrop) that.adjustBackdrop()
      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .prependTo(this.$element)
        .on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) return
          this.options.backdrop == 'static'
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this)
        }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    if (this.options.backdrop) this.adjustBackdrop()
    this.adjustDialog()
  }

  Modal.prototype.adjustBackdrop = function () {
    this.$backdrop
      .css('height', 0)
      .css('height', this.$element[0].scrollHeight)
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

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

  var Settings = MProgress.settings = {
    title : 'Progress ...',

    handle : null,
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
      $('#' + MProgress.name + ' .progress-bar').html(1 + '%');
      $('#' + MProgress.name + ' .progress-bar').attr('aria-valuenow', 1);
      $('#' + MProgress.name + ' .progress-bar').css('width', 1 + '%');

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
    MProgress.settings.handle = window.setInterval(function() {
      MProgress.settings.progress += Number( 5 );

      if ( MProgress.settings.progress < MProgress.settings.ariavaluemax ) {
        $('#' + MProgress.name + ' .progress-bar').html(MProgress.settings.progress + '%');
        $('#' + MProgress.name + ' .progress-bar').attr('aria-valuenow', MProgress.settings.progresss);
        $('#' + MProgress.name + ' .progress-bar').css('width', MProgress.settings.progress + '%');
      }

      if ( i > MProgress.settings.secondstimeout ) {
        MProgress.done();
      }

      i++; console.log( i );
    }, MProgress.settings.milliseconds);
  };

  /**
   * Done the progress bar.
   *
   *   MProgress.done();
   *
   */
  MProgress.done = function() {
    clearInterval( MProgress.settings.handle );

    MProgress.dispatchEventDone();
    MProgress.hide();
  };

  return MProgress;
});