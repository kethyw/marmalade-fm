import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';

import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import Archive from './Archive';
import About from './About';
import Show from './Show';
import Player from './Player';

// we import our mix data 
import mixesData from '../data/mixes';
import actions from '../store/actions';

// data fetching is always on the top component 
class App extends Component {
  fetchMixes = async () => {
    const { addMix } = this.props;

    //here we loop over our mix ids and fetch each other
    mixesData.map(async id => {
      try {
        // always remember await when using fetch in an async function 
        const response = await fetch(
          //we add the id onto the end of our url as a dynamic segment
          `https://api.mixcloud.com${id}`
        );
        const data = await response.json();

        addMix(data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  componentDidMount() {
    this.fetchMixes();
  };

  render() {
    //this makes a variable from our first mix in the array
    // if the array is empty, we assign it a default value of an
    // empty {} object 
    // const [firstMix = {}] = this.props.mixes;
    return (
      < Router >
        {/* router wraps our whole page and lets us use react-router */}
        <div>
          {/* this div contains our page (excluding audio player) */}
          <div className="flex-l justify-end">
            {/* FeaturedMix (Needs styling and updating) */}
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              {/* Header (Needs styling and updating) */}
              <Header />
              {/* Routed page */}

              <Route exact path="/" component={Home} />
              <Route path="/archive" component={Archive} />
              <Route path="/about" component={About} />
              <Route
                path="/show/:slug"
                //here we pass in the route params so that we can access the
                //url of the current show page 
                component={Show}
              />
            </div>
          </div>
          {/* Audio player */}
          <Player />
        </div>
      </Router >
    );
  }
}

export default connect(state => state, actions)(App);
