A client-side implementation of a turn based learning game.


## chat-game-ui

Working with form elements in a Backbone view can become
very tedious very quickly. You will either end up writing
a lot of repetitive code to read values from the form,
or end up using a key-value-observer or data-binding
solution that automatically populates your model for you.
While these are valid options and I highly recommend
understanding how they work, there are times when these 
options are not the best choice for your application.

Backbone.Syphon aims to make it easy to serialize the
form inputs of a Backbone.View in to a simple JSON object
that contains all of the values from the form.

## Source Code And Downloads

You can download the raw source code from the "src" 
folder above, or grab one of the builds from the 
"lib" folder. 

To get the latest stable release, use these links 
which point to the 'master' branch's builds:

### Standard Builds

Development: [chat-game-ui.js](https://raw.github.com/englishtown/chat-game-ui/master/lib/chat-game-ui.js)

Production: [chat-game-ui.min.js](https://raw.github.com/englishtown/chat-game-ui/master/lib/chat-game-ui.min.js)

### AMD/RequireJS Builds

Development: [chat-game-ui.js](https://raw.github.com/englishtown/chat-game-ui/master/lib/amd/chat-game-ui.js)

Production: [chat-game-ui.min.js](https://raw.github.com/englishtown/chat-game-ui/master/lib/amd/chat-game-ui.min.js)

## Documentation

This readme file contains basic usage examples.

### Annotated Source Code

chat-game-ui has annotated source code using the Docco tool to turn
comments in to documentation. This provides an in-depth look
at what each section of is doing.

// TODO: Update
##### [View The Annotated Source Code](http://englishtown.github.com/chat-game-ui/docs/chat-game-ui.html)

## Basic Usage

## Building chat-game-ui

If you wish to build chat-game-ui on your system, you will
need Ruby to run the Jasmine specs, and NodeJS to run the
grunt build. 

### To Run The Jasmine Specs

1. Be sure you have Bundler installed in your Ruby Gems. Then
run `bundle install` from the project folder

2. Once this is done, you can run `rake jasmine` to run the 
Jasmine server

3. Point your browser at `http://localhost:8888` and you will
see all of the specs for chat-game-ui

### To Build The Packages

1. Be sure you have NodeJS and NPM installed on your system

2. Run `npm install -g grunt` to install the grunt build system

3. From the project folder, run `grunt` to produce a build

## Release Notes

### v0.3.0

* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
* tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,