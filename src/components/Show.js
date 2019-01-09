import React, { Component } from 'react';
import differenceInDays from 'date-fns/difference_in_days';
import Stat from './Stat';


class Show extends Component {


  //componentWillReceiveProps runs every time our component gets
  //some new props, rather than just once like componentDidMount 
  //meaning we can get and update the props every time some new 
  //ones come in 


  render() {
    const { match, mixes } = this.props;

    //here we grab the mix that has a slug that matches 
    // our params from the url 
    const [mix = {}] = mixes.filter(mix => mix.slug === match.params.slug);

    return (
      <div className="ph3 ph4-l pad-bottom">
        <div className="measure center lh-copy">
          <p>{mix.description}</p>

          <Stat statName="Plays" statNumber={mix.play_count || 0} statWord="times" />

          {/* new Date() creates a date/time stamp from the current time */}
          {/* differenceInDays(new Date(), mix.created_time) */}

          <Stat statName="Uploaded" statNumber={differenceInDays(new Date(), mix.created_time)} statWord="days ago" />

          <Stat statName="Lasting for" statNumber={mix.audio_length / 60} statWord="minutes" />

        </div>
      </div >
    );
  }
}


export default Show; 
