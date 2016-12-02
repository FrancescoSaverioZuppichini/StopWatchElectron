#Create a basic Stop Watch with Electron And React
##Electron is an amazing way to quickly go from and idea to an app.

Today we are going to see how to combine our knowledge in web develping and the "new" tool made from Github, [Electron](http://electron.atom.io/). in order to build a stand-alone cross platform Stop Watch App. But first, you may ask

###What is Electron? 

Electron is an open-source framework. It allows for the development of desktop GUI applications using the Node.js runtime and the Chromium web browser. So, quoting from Electron's website, *If you can build a website, you can build a desktop app* very easily by using your favorite front end framework. 
In this tutorial we are going to use [Material Design Lite](https://getmdl.io/index.html) from Google and [React](https://facebook.github.io/react/) from Facebook. 

###What we are going to do?
We are going to build a fully responsive Stop Watch that will look like this:

<!--add images/StopWatchMainPreview.png-->

Let's get started!

###Setting up Electron
Before starting this tutorial you need to download my template from Github. It is based on the [*quick-start*](http://electron.atom.io/docs/tutorial/quick-start/) from *Electron*'s doc.

```bash
# Clone my template
$ git clone https://github.com/FrancescoSaverioZuppichini/Stop-Watch-Electron.git
# Go into the folder
$ cd Stop-Watch-Electron/Template
# Install the dependecies
$ npm install
```

Before running the application let's take a look at our *package.json*

```json
//package.json
{
  ...
  "scripts": {
    "watch": "webpack --watch --progress --debug",
    "build": "webpack --progress",
    "app": "electron ."
  },
  ...
  "devDependencies": {
    "babel-core": "^6.4.5",
    "babel-loader": "^6.2.1",
    "babel-preset-es2015": "^6.3.13",
    "babel-preset-react": "^6.3.13",
    "babel-preset-stage-0": "^6.16.0",
    "electron": "^1.4.1"
  },
  "dependencies": {
    "babel": "^6.5.2",
    "moment": "^2.16.0",
    "react": "^15.4.0",
    "react-dom": "^15.4.0",
    "webpack": "^1.13.3"
  }
}

```

As you can see we are importing Electron, React and Webpack. If the last name is new to you I suggest to read [this](https://scotch.io/tutorials/getting-started-with-webpack-module-bundling-magic) wonderful article about it. Now, take allok on the script part, the first one, *watch* will run Webpack in, obviously, *watch* mode to re-compile on change our boundle.  The second one will just build the application one time. The final one is where the magic is, it starts Electron and displays the application. 

###First run
Now it's time to run Electron for the fist time, type:

```bash
# build the application with webpack for the first time
$ npm run build
# display the applicaiton with Electron
$ npm run app
```
And you should see something like this:
<!--add images/1-->

Quite exciting uh? But how it actually works? It is time to investigate on Electron's magic, open *main.js* and imports the following packages.

```javascript
// main.js
const electron = require('electron')
  // Module to control application life.
const app = electron.app
  // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
```
Basically we need three components, *electron*, *electron.app* and *electron.BrowserWindow*. Electron will use the last one to emulate a single page browser in order to display our website. If you scroll a little bit you will find the *loadUrl* function:

```javascript
//main.js
// and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
```

*mainWindow.loadUrl* load a given page to the window, we are using the *url* libray from *node.js* to properly parse the url and the files in order to serve them. If you go down again you can find all the binding methods on *mainWindow*, the most important one is

```javascript
//main.js
app.on('ready', createWindow)
```

That create the actual window.

###Link React to the Application

For know just forget that we are building a desktop application, think, instead, that we are doing a website using React. Take a look at *index.html*

```html
//index.html
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template for Electron and React</title>
</head>

<body>
  <div id="app"></div>
  <script src="app.min.js"></script>
</body>

</html>
```

React will render its component inside the *div* with id *app*. Open */src/client.jsx*

```javascript
// client.jsx
...
class App extends React.Component {

  render() {
    return (
      <div>Hello world!</div>
    )
  }
}

const appDom = document.getElementById('app')

ReactDOM.render(
  <App/>, appDom);


```

Build again the app and you should see:

<!--IMAGE 1-->

Tge *Application* component renders a *"Hello world!"* message inside the *app* div that we have seen before. 

###Add Material Design Lite

[Material Design Lite](https://getmdl.io/) is a Google fron end framework, very similar to Boostrap, that implements Material Design's concept. In order to add it to our webpage we just need a couple of link attribute in *index.html*

```html
//index.html
...
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
  <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.blue-indigo.min.css" />
  <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
  <title>Stop Watch</title>
</head>
...
```
That's it, now start again the application and you should notice that the font has changed.

###Layout
Before start to change the components run WebPack in watch mode:

```bash
npm run watch
```
Add a *style.css* file and import it into the html page. Write into the following css class

```css
//style.css
.mld-item--centered{
  display: flex;
  align-items: center;
  justify-content: center;
}

```
Now it's time to structure our application, thanks to MDL, Material Design Lite, we can easily make it done by using their css classes. Open *client.jsx* and override the render method.

```javascript
//client.jsx
  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <main className="mdl-layout__content mld-item--centered"">
          <div className="mdl-grid">
            <div> Hello world!</div>
            </div>
        </main>
      </div>
    )
  }
```

Run the app again, or just reflesh the window if you have it already running.

```bash
$ npm run app
``` 
You should see *"Hello world!"* in the center.
The class *mdl-layout* in the root component defined a container accordingly to MDL [documentation](https://getmdl.io/components/index.html#layout-section). Inside that we have another div that holds all the contents and it is centered by our custom css. The class *mdl-grid* is more or less the same of the class *row* in bootstrap, it defines a grid with a maximum of twelve columns.

###Stop Watch Component

Up to here we have a basic electron application with a root component, *App*. We can now start to a new component: *StopWatch*.

```bash
# Create a new component in /src
$ touch src/StopWatch.jsx
```

Write into *StopWatch.jsx* the following code that create an simple React component that only render it's name

```javascript
//StopWatch.jsx
import React from 'react'

class StopWatch extends React.Component {
  
  render(){
    return(
      <div> I'm StopWatch</div>
    )
  }
}

export default StopWatch

```
As in every React aplpication, we need to import one componenet in the other.

```javascript
// client.jsx
...
// import children
import StopWatch from './StopWatch.jsx'

class App extends React.Component {

  render() {
    return (
    		...
          <div className="mdl-grid">
            <div>
              Hello world!</div>
            <StopWatch/>
        ...
      </div>
    )
  }
}
...

```

Run the application and you should see the new message from the new component.

###Stop Watch
Now we have to actually *think* and *code* our Stop Watch. Update the *cunstructor* of *StopWatch* with some new fields and remove the *Hello world* in the root componenet.

```javascript
// StopWatch.jsx
  constructor() {
    super()
    this.state = {}
    // holds the actuall time
    this.time = null;
    // will be used to clear the interval
    this.intervalId = null;
    // used to switch from play to pause and viceversa
    this.state.toggle = false;
    // holds the formatted current time in HH:mm:ss
    this.state.currentTime = "00:00:00"
  }
```
The *toggle* field will switch the behavior of the *play/pause* buttom and trigger new a render when it is changed. We need to add a time function to actually create a Watch, let's do it.
Javascript provides a convenient way to create invervals,  the *setInterval*  function. For keeping track of the time we increase the *time* field by 100 every 100ms, than means, one second every one second (of course). Also import [moment.js]((http://momentjs.com/)), a library to parse the time.

```javascript
//StopWatch.jsx
  ... 
  import moment from ('moment')
  ...
  componentDidMount() {
    this.initializeTime()
    this.createInterval()
  }

  initializeTime = () => {
    this.time = 0;
    this.setState({
      currentTime: this.formatTime(this.getTime())
    })
  }

  createInterval() {
    this.intervalId = setInterval(this.updateTime, 100);
  }
  
  clearInterval() {
    clearInterval(this.intervalId)
  }

  updateTime = () => {
    this.time += 100
    const newTime = this.getTime();
    const formattedTime = this.formatTime(newTime);

    this.setState({currentTime: formattedTime})
  }
  
  formatTime = (momentJsObject) => {
    return momentJsObject.format("HH:mm:ss")
  }

  getTime = () => {
    return moment.utc(this.time)
  }

```

After the component is mounted the fields are initialized and the interval is created by calling * clearInterval*. Every 100ms *updateTime* updates and parse the time by using moment.js. We can now visualize our watch by adding some html to the render function.

```javascript
\\StopWatch.jsx
  render(){
    return(
      <div className="mdl-cell mdl-cell--12-col">
        <div>
          <div className="mdl-card__title--expand">
            <h1 className='p-5 m-0' id='time'>{this.state.currentTime}</h1>
          </div>

        </div>

      </div>
    )
  }
```
Add also the *time* id selector into the css file.

```css
#time{
  /* the font will be resized based on the with of the window */
  font-size: 20vw;
}
```
Run the app and you should see

<!--add image 3-->

Almost done! We just need the two control buttons, *play* and *reset*. The first one changes behavior accordingly to the current *state* and the second one will re-initialiaze the watch. 

```javascript
\\StopWatch.jsx
...
  playTime = () => {
    if (!this.state.toggle) {
      this.startTime()
    } else {
      this.pauseTime()
    }
  }

  startTime() {
    this.createInterval()
    this.toggle()
  }

  pauseTime = () => {
    this.clearInterval()
    this.toggle()
  }

  resetTime = () => {
    this.initializeTime()
    this.clearInterval()
    this.setState({toggle: false})
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }
...
```
*PlayTime* checks if we are in *play* or *pause* state and acts accordingly. *StartTime* creates an interval and *PauseTime* remove it. They booth toggle the state. *ResetTime* restores the component initial state. Remember to remove the call to *createInterval* in the *componentDidMount* method otherwise the watch will start automatically. Add them to the render function.

```javascript
\\StopWatch.jsx
...
render() {

    var toggleText = !this.state.toggle
      ? "Play"
      : "Stop";

    return (
      <div className="mdl-cell mdl-cell--12-col">
        <div>
          <div className="mdl-card__title--expand">
            <h1 ref="time" className='p-5 m-0' id='time'>{this.state.currentTime}</h1>
          </div>

          <div className="mdl-card__actions">
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary" onClick={this.playTime}>
              {toggleText}
            </button>

            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--primary float--right" onClick={this.resetTime}>
              Reset
            </button>
          </div>
        </div>

      </div>
    )
  }
...
```
I've also created some others *css* classed that you can see in the laster *style.css* files. For the last time open you terminal and run, or reflesh the window.

```bash
$ npm run app
```
And you should see our basic 'wonderful' Stop Watch.

###Conclusion
The applications of *Electron* are endless, if you are able to cleare a website you can make everything. This was just a easy example but i have to say that i enjoyed and i hope that you also like it. Never then less *Electron* is used by big companies, you can check them in its app [section](http://electron.atom.io/apps/).

