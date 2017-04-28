import React, { PropTypes } from 'react';
import css from './ScoreCard.scss';

export default class ScoreCard extends React.Component {

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {
      scoreCard: this.props.scoreCard
    }
  }

  render() {
    return (
      <div className='scoreCardWrap'>
        <h1 className={`${css.headline}`}>
          {this.state.scoreCard.course_name} <br/>
          {this.state.scoreCard.city} {this.state.scoreCard.state}, {this.state.scoreCard.num_of_holes} Holes
        </h1>
        <h2 className={`${css.subheadline}`}>
          Total Par: {this.state.scoreCard.total_par} Total Score: {this.state.scoreCard.total_score}
        </h2>
        <div className={`${css.holesWrap}`}>
          {
            this.state.scoreCard.holes.map((hole) => {
              return (
                <div className={`${css.holeWrap} col-md-4`} key={hole.number}>
                  <h3 className={`${css.holeNumber}`}>Hole {hole.number}</h3>
                  <p>Par {hole.par} - {hole.yards} Yards</p>
                  <p>Clubs used: {hole.swings}</p>
                  <p>Number of putts: {hole.putt_count}</p>
                  <p>Score: {hole.score}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}