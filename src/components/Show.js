import React, { Component } from 'react';
import { connect } from 'react-redux';
import differenceInDays from 'date-fns/difference_in_days';
import Stat from './Stat';

import actions from '../store/actions';


const Tag = ({ name, url }) => (
  <div className="mr2 mb2 o-70">
    <a
      className="block f6 link orange b ba bw1 b--orange br2 pv1 ph2 lh-title" href={url}
      target="_blank"
    >
      {name}
    </a>
  </div>
);

//takes in a tags array and loops over them 
const Tags = ({ tags = [] }) => (
  <div className='tags flex flex-wrap'>{tags.map(tag => <Tag {...tag} />)}</div>
);

class Show extends Component {
  // runs when the component loads on the page 
  componentDidMount() {
    // when we mount our shoe component, we want to set the featuredMix in 
    // our redux state to be the currently viewed mix 
    const { setFeaturedMix, id } = this.props;
    // sets our featured mix in the redux state 
    setFeaturedMix(id);
  }

  componentWillUnmount() {
    const { setFeaturedMix } = this.props
    // we remove our featuredMix from the redux state again 
    setFeaturedMix(false);
  }

  render() {
    const { tags, description, play_count, created_time, audio_length } = this.props;
    return (
      <div className="ph3 ph4-l pad-bottom">
        <div className="measure center lh-copy">

          {/* <Tags tags={mix.tags} /> */}
          {/* deleting all the "mix" because ...props are passing it through */}
          <Tags tags={tags} />

          {/* <p>{mix.description}</p> */}
          <p>{description}</p>

          {/* <Stat statName="Plays" statNumber={mix.play_count || 0} statWord="times" /> */}
          <Stat statName="Plays" statNumber={play_count || 0} statWord="times" />

          {/* new Date() creates a date/time stamp from the current time  */}
          {/* differenceInDays(new Date(), mix.created_time) */}
          <Stat statName="Uploaded" statNumber={differenceInDays(new Date(), created_time)} statWord="days ago" />

          <Stat statName="Lasting for" statNumber={audio_length / 60} statWord="minutes" />
        </div>
      </div>
    );
  }
}


// this is what we called a selector, it grabs a certain
// piece of data from our state
const getMix = (mixes, slug) => {
  //here we grab the mix that has a slug that matches
  //our params from the url
  const [mix = {}] = mixes.filter(mix => mix.slug === slug);
  return mix;
};


export default connect(
  (state, props) => ({
    // mix: getMix(state.mixes, props.match.params.slug)
    // instead of "mix: getMix", the "..." (spread operator)
    // it takes whatever is in javascript object and takes all the properties
    // and lays them out for you
    ...getMix(state.mixes, props.match.params.slug)
  }),
  actions
)(Show); 
