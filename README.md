## Basics

Welcome to your Moovweb project! Moovweb is a great way to build a compelling front-end for a website. The files in this project describe the changes we want to make to the front end of a site. There's places in this project to add new images (assets/images/), styles (assets/stylesheets/) and even manipulate HTML (scripts/).

## Before Running This

To run this project, you must have the Moovweb SDK installed on your system. Installation is easy - just go to [the download page on the Moovweb site](http://console.moovweb.com/download) to download and install.

We have lots of informative guides, videos, live help, documentation, and even a book on how to use Moovweb. You should be able to get up and running in 30 minutes if you visit [console.moovweb.com](http://console.moovweb.com).

You might find [the page about the scripts folder](http://console.moovweb.com/learn/reference/configuration/pages) useful for starting to write Tritium, and our [documents on the stylesheets folder](http://console.moovweb.com/learn/reference/configuration/stylesheet) for information on how we structure our stylesheets.

## Launching

Typically, on Mac or Linux, just browse to this project folder in a terminal and then run the following command:

    sudo moov server --auto-hosts

Then, just browse to [mlocal.truereligionbrandjeans.com](http://mlocal.truereligionbrandjeans.com) and you are ready to start developing!

## Deployment

Moovweb uses a git-based deployment system. To deploy, just type

    git commit -a -m 'New code'
    git push origin master

## More Info

See detailed documentation for Moovweb at [console.moovweb.com](http://console.moovweb.com).

## Domains
Remember to put all domains you're going to hit in your etc/hosts or to run your server with the `-auto-hosts=true` option.


    127.0.0.1   mlocal.truereligionbrandjeans.com

## Components

A plethora of front-end components are included with this build. Comment out that which you do not need to cut down file size.

### JS

* Uranium
* jQuery
  * [panels](http://jquerymobile.com/demos/1.3.0-beta.1/docs/panels/#)
* [iScroll 4](http://cubiq.org/iscroll-4)
* [Modernizr](http://modernizr.com/)
* [BAC DOMNodeInserted code](http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/)
* Bootstrap
  * [Tabs](http://twitter.github.io/bootstrap/javascript.html#tabs)
  * [Collapsible Sets](http://twitter.github.io/bootstrap/javascript.html#collapse)
  * [Affix](http://twitter.github.io/bootstrap/javascript.html#affix)

### CSS

* Moov Library
  * Bars
  * Buttons
  * Forms
  * Gradients
  * Shadows
* Bootstrap
  * Collapsible Sets
  * Tabs
  * Affix
* [Groundwork](http://groundwork.sidereel.com/)
  * [Grid](http://groundwork.sidereel.com/?url=grid)
  * [Media Queries](http://groundwork.sidereel.com/?url=media-queries)
  * [Layout Helpers](http://groundwork.sidereel.com/?url=helpers)
* jQmobile
  * Panels
