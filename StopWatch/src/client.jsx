// client.jsx
import React from "react";
import ReactDOM from "react-dom";
// import children
import StopWatch from './StopWatch.jsx'

class App extends React.Component {

  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <main className="mdl-layout__content mld-item--centered">
          <div className="mdl-grid">
            <StopWatch/>
          </div>
        </main>
      </div>
    )
  }
}

const appDom = document.getElementById('app')

ReactDOM.render(
  <App/>, appDom);
