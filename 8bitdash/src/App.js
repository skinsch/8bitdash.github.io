import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var ReactGA = require('react-ga');

// Google Analytics React
ReactGA.initialize('UA-102501725-3');
ReactGA.set({ page: window.location.pathname + window.location.search });
ReactGA.pageview(window.location.pathname + window.location.search);

// Static 
const credits = {
    'kirokaze':'Kirokaze',
    'valenberg':'Valenberg',
    'landscapes':'Mark Ferrari'
}

const backdrops = {
    'landscapes':
        ['bridge.gif',
        'bridge_raining.gif',
        'coast.gif',
        'falls.gif',
        'forrest.gif',
        'lake.gif',
        'nature.gif',
        'northlights.gif',
        'sea.gif'],
    'valenberg':
        [
        'streets.gif',
        'shop.gif',
        'highlands.gif',
        'virtuaverse.gif',
        'sushi.gif',
        'girlinrain.gif',
        'exodus.gif',
        'drift.gif',
        'daftpunk.gif',
        'blade.gif',
        'highfloor.gif',
        'lowlands.gif',
        'moon.png'],
    'kirokaze': 
        ['spaceport.gif', 
        'bad_landing.gif',
        'bluebalcony.gif',
        'coffeeinrain.gif',
        'dark_pillar.gif',
        'familydinner.gif',
        'cemetry.gif',
        'sandcastle.gif',
        'horse.gif',
        'nightlytraining.gif',
        'attack.gif',
        'zombies.gif',
        'citymirror.gif',
        'droidcrime.gif',
        'elderorc.gif',
        'factory5.gif',
        'iplayoldgames.gif',
        'metro_final.gif',
        'pilot.gif',
        'player2.gif',
        'robot_alley.gif',
        'shootingstars.gif',
        'thieves.gif',
        'train_city.gif',
        'troll_cave.gif',
        'youngatnight.gif']
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

class App extends Component {
    constructor(props) {
        super(props)
        this.update()
    }

    update() { 
        const selected = this.random()
        this.state = { 
            backdrop: selected.artist + "/" + selected.filename,
            artist: credits[selected.artist],
            time: this.time()
        }
    }

    imagePath(bd) {
        return(bd.artist + "/" + bd.filename)
    }

    time() {
        const currentTime = new Date();
        var currentHours = currentTime.getHours();
        var currentMinutes = currentTime.getMinutes ( );
        var currentSeconds = currentTime.getSeconds ( );
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
const timeOfDay = ( currentHours < 12 ) ? "am" : "pm";

        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
        currentHours = ( currentHours == 0 ) ? 12 : currentHours; 

                const currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

        return(currentTimeString)
    }

    random() {
        const artists = Object.keys(backdrops)
        const amount = artists.length
        const artistIndex = getRandomIntInclusive(0, amount - 1)
        const artistName = artists[artistIndex]

        const amountBd = backdrops[artistName].length
        const bdIdex = getRandomIntInclusive(0, amountBd - 1)

       const filename = backdrops[artistName][bdIdex]
        return(
            { artist: artistName, filename: filename }
        )
    }
    
    shop() {
    return(<ReactGA.OutboundLink
        eventLabel="shop"
        to="https://8bitdash.threadless.com/">
        Buy Offical Prints          
    </ReactGA.OutboundLink>)
    }

    render() {
        const style = {
            background: "url('" + this.state.backdrop + "') no-repeat center center fixed",
            backgroundSize: "cover"
        }
    return (<div>
      <div style={style} className="App">
        <div id="center">{this.state.time}</div> 
      </div>
        <div className="Bottom">
        {this.state.artist} - {this.shop()} 
        </div>
        </div>
    );
  }
}

export default App;
