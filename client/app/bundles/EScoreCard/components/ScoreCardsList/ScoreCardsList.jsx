import React, { PropTypes } from 'react';
import css from './ScoreCardsList.scss'

export default class ScoreCardsList extends React.Component {

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { 
      scoreCards: this.props.scoreCards,
      scoreCard: this.props.scoreCard,
      showCardForm: this.props.showCardForm,
      showHoleForm: this.props.showHoleForm,
      showAllCards: this.props.showAllCards
    }
  }

  render() {
    return (
      <div>
        <h2>Your score cards list:</h2>
        {this.state.scoreCards.map((card) => {
          return (
            <div key={card.id}>
              <a href='#' onClick={(e) => this.props.handleShowCardHole(e, card.id)}>
                {card.created_at.substring(0, 10)} {card.course_name} {card.num_of_holes} Holes - {card.city} {card.state}
              </a>
            </div>
          )
        })}
      </div>
    )
  }
}