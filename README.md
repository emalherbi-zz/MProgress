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

#### `title`
Changes the modal title.

~~~ js
MProgress.configure({ title: 'Modal Title !!!' });
~~~

Support
-------

__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/emalherbi/MProgress.svg)]( https://github.com/emalherbi/mprogress/issues)

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

Created and maintained by emalherbi.


License
-------

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
