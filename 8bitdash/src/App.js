import React, { Component, Button} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

var ReactGA = require("react-ga");

const credits = {
  kirokaze: "Kirokaze",
  valenberg: "Valenberg",
  landscapes: "Mark Ferrari"
};

const backdrops = {
  landscapes: [
    "bridge.gif",
    "bridge_raining.gif",
    "coast.gif",
    "falls.gif",
    "forrest.gif",
    "lake.gif",
    "nature.gif",
    "northlights.gif",
    "sea.gif"
  ],
  valenberg: [
    "streets.gif",
    "shop.gif",
    "highlands.gif",
    "virtuaverse.gif",
    "sushi.gif",
    "girlinrain.gif",
    "exodus.gif",
    "drift.gif",
    "daftpunk.gif",
    "blade.gif",
    "highfloor.gif",
    "lowlands.gif",
    "moon.png"
  ],
  kirokaze: [
    "spaceport.gif",
    "bad_landing.gif",
    "bluebalcony.gif",
    "coffeeinrain.gif",
    "dark_pillar.gif",
    "familydinner.gif",
    "cemetry.gif",
    "sandcastle.gif",
    "horse.gif",
    "nightlytraining.gif",
    "attack.gif",
    "zombies.gif",
    "citymirror.gif",
    "droidcrime.gif",
    "elderorc.gif",
    "factory5.gif",
    "iplayoldgames.gif",
    "metro_final.gif",
    "pilot.gif",
    "player2.gif",
    "robot_alley.gif",
    "shootingstars.gif",
    "thieves.gif",
    "train_city.gif",
    "troll_cave.gif",
    "youngatnight.gif"
  ]
};

// Google Analytics React
ReactGA.initialize("UA-102501725-3");
ReactGA.set({ page: window.location.pathname + window.location.search });
ReactGA.pageview(window.location.pathname + window.location.search);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.storage = window.localStorage;
    this.update();
  }

  update() {
    const selected = this.random();

    var clockActivated = this.storage.getItem('clockActivated')
    var greetingActivated = this.storage.getItem('greetingActivated')

    console.log(clockActivated)
    console.log(greetingActivated)

    if(clockActivated === undefined) {
      this.storage.setItem("clockActivated", 1)
      clockActivated = true
    }
    if(greetingActivated === undefined) {
      this.storage.setItem("greetingActivated", 1)
      greetingActivated = true
    }

    this.state = {
      backdrop: selected.artist + "/" + selected.filename,
      artist: credits[selected.artist],
      time: this.time(),
      settingsActivated: false,
      clockActivated: clockActivated,
      greetingActivated: greetingActivated
    };
  }

  imagePath(bd) {
    return bd.artist + "/" + bd.filename;
  }

  greeting(hours, timeOfDay) {
    const rnd = a => a[getRandomIntInclusive(0, a.length - 1)]
    const lunch = ["Enjoy your break", "Lunch time!", "Enjoy your lunch"]
    const morning = ["Good Morning", "Have a wonderful day", "Enjoy your day", "Thanks for watching"]
    const night = ["Sleep well", "Good Night", "Night night", "Time for bed"]
    const afternoon = ["Call it a day", "Pack up work", "Finish Move", "Game Over"]

    var res = ""
    if(timeOfDay == "am") {
      if(hours > 5) {
        res = rnd(morning)
      } if(hours > 11) {
        res = rnd(lunch)
      } else {
        res = rnd(night)
      }
    } else { // "pm"
      if(hours > 5) {
        res = "Good Evening"
      }
      if(hours > 9) {
        res = "Good Night"
      }
      else {
        res = rnd(afternoon)
      }
    }
    return res;
  }

  time() {
    const currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
    const timeOfDay = currentHours < 12 ? "am" : "pm";

    currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
    currentHours = currentHours == 0 ? 12 : currentHours;

    const currentTimeString =
      currentHours + ":" + currentMinutes + " " + timeOfDay;

    return {
      greeting: this.greeting(currentHours, timeOfDay),
      clock: currentTimeString
    }
  }

  random() {
    const artists = Object.keys(backdrops);
    const amount = artists.length;
    const artistIndex = getRandomIntInclusive(0, amount - 1);
    const artistName = artists[artistIndex];

    const amountBd = backdrops[artistName].length;
    const bdIdex = getRandomIntInclusive(0, amountBd - 1);

    const filename = backdrops[artistName][bdIdex];
    return { artist: artistName, filename: filename };
  }

  shop() {
    return (
      <ReactGA.OutboundLink
        eventLabel="shop"
        to="https://8bitdash.threadless.com/"
      >
        Shop
      </ReactGA.OutboundLink>
    );
  }

  toggleSettings() {
    this.state.settingsActivated = true

  }
  untoggleSettings() {
    this.state.settingsActivated = false
  }

  render() {
    const style = {
      background:
        "url('" + this.state.backdrop + "') no-repeat center center fixed",
      backgroundSize: "cover"
    };
    const {clock, greeting} = this.state.time

    if(this.state.settingsActivated) {
      return(this.renderSettings(style))
    } else {
      return (this.renderDashboard(style, clock, greeting));
  }
  }
  renderDashboard(style, clock, greeting) {
    return(
      <div id="dashboard">
        <div style={style} id="clock">
          <div id="center">
            {this.state.clockActivated == 1 ? (<div id="time" className="textshadow">{clock}</div>) : <div/>}
            {this.state.greetingActivated == 1 ? (<div id="greeting" className="textshadow">{greeting}</div>) : <div/>}
          </div>
        </div>
        <div id="bottom" className="textshadow">{this.shop()}
        <a href="#" onClick={this.toggleSettings()}> - Settings</a></div>
        <div id="middle-bottom" className="textshadow">&#x0011; {this.state.artist}</div>
      </div>
    )
  }

  toggleClock() {
    this.state.clockActivated = !this.state.clockActivated
    this.storage.setItem("clockActivated", this.state.clockActivated ? 1 : 0)
  }

  toggleGreetings() {
    this.state.greetingActivated = this.state.greetingActivated
    this.storage.setItem("greetingActivated", this.state.greetingActivated ? 1 : 0)
  }

  renderSettings(style) {
    return(
    <div id="dashboard">
      <div style={style} id="clock" className="bw">
        <div id="center" className="color">
          <div  className="textshadow">8bitdash since 2015</div>
          <div  className="textshadow">--------------</div>
          <div><a href="#" onClick={() => this.toggleClock()} className={this.state.clockActivated ? "active" : "inactive"}>Show clock</a></div>
          <div><a href="#" onClick={() => this.toggleGreetings()} className={this.state.greetingActivated ? "active" : "inactive"}>Show greetings</a></div>
          <div  className="textshadow">--------------</div>
          <div  className="textshadow">Amazing art pieces by: </div>
          <div  className="textshadow">kirokaze</div>
          <div  className="textshadow">valenberg</div>
          <div  className="textshadow">mark ferrari</div>
          <div  className="textshadow">--------------</div>
    <div  className="textshadow"><a href="https://www.madewithtea.com">madewithtea.com</a></div>
        <div  className="textshadow"><a href="https://www.madewithtea.com">since 2015</a></div>
        </div>
      </div>
      <div id="bottom" className="textshadow"><a href="#" onClick={this.untoggleSettings()}>back</a></div>
      <div id="middle-bottom" className="textshadow"><a href="#" onClick={this.untoggleSettings()}>back</a></div>
    </div>)
  }
}


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact={true} path="/" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
