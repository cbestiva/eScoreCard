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
      scoreCard: this.props.scoreCard,
    }
  }

  componentDidMount() {
    console.log(this.state.scoreCard);
  }

  render() {
    return (
      <div>
        SCORE CARD!
      </div>
    )
  }
}