MProgress
=========

Modal Progress Bar.


Installation
------------

Add [mprogress.css] and [mprogress.js] to your project.

```html
<link rel='stylesheet' href='mprogress.css' />
<script src='mprogress.js' ></script>
```

Basic usage
-----------

Simply call `start()` and `done()` to control the progress bar.

~~~ js
MProgress.start();
MProgress.done();
~~~

Ideas
-----

* Add progress to your Ajax calls! Bind it to the jQuery `ajaxStart` and
`ajaxStop` events.

Configuration
-------------

#### `minimum`
Changes the minimum percentage used upon starting. (default: `0.08`)

~~~ js
NProgress.configure({ minimum: 0.1 });
~~~

#### `template`
You can change the markup using `template`. To keep the progress
bar working, keep an element with `role='bar'` in there. See the [default template]
for reference.

~~~ js
NProgress.configure({
template: "<div class='....'>...</div>"
});
~~~

#### `ease` and `speed`
Adjust animation settings using *ease* (a CSS easing string)
and *speed* (in ms). (default: `ease` and `200`)

~~~ js
NProgress.configure({ ease: 'ease', speed: 500 });
~~~

#### `trickle`
Turn of the automatic incrementing behavior by setting this to `false`. (default: `true`)

~~~ js
NProgress.configure({ trickle: false });
~~~

#### `trickleRate` and `trickleSpeed`
You can adjust the *trickleRate* (how much to increase per trickle) and
*trickleSpeed* (how often to trickle, in ms).

~~~ js
NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
~~~

#### `showSpinner`
Turn off loading spinner by setting it to false. (default: `true`)

~~~ js
NProgress.configure({ showSpinner: false });
~~~

#### `parent`
specify this to change the parent container. (default: `body`)

~~~ js
NProgress.configure({ parent: '#container' });
~~~

Customization
-------------

Just edit `nprogress.css` to your liking. Tip: you probably only want to find
and replace occurances of `#29d`.

The included CSS file is pretty minimal... in fact, feel free to scrap it and
make your own!

Resources
---------

* [New UI Pattern: Website Loading Bars](http://www.usabilitypost.com/2013/08/19/new-ui-pattern-website-loading-bars/) (usabilitypost.com)

Support
-------

__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/emalherbi/MProgress.js.svg)]( https://github.com/emalherbi/mprogress.js/issues)

Contributing
-------

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Test your changes to the best of your ability.
4. Update the documentation to reflect your changes if they add or changes current functionality.
5. Commit your changes (`git commit -am 'Added some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create new Pull Request

Creator
-------

Created and maintained by Eduardo Malherbi.


License
-------

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
