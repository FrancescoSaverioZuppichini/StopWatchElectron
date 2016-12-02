import React from 'react'

import moment from 'moment'

class StopWatch extends React.Component {
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
    this.state.currentTime = null

  }

  componentDidMount() {
    this.initializeTime()
  }

  initializeTime = () => {
    this.time = 0;
    this.setState({
      currentTime: this.formatTime(this.getTime())
    })
  }

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
}

export default StopWatch
