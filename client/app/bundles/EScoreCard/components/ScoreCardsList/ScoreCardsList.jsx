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

  removeScoreCard(e, cardId) {
    e.preventDefault();
    let scoreCards = this.state.scoreCards;
    let updatedScoreCards;
    $.ajax({
      headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
      type: 'DELETE',
      url: `/score_cards/${cardId}`,
      dataType: 'json',
      success: (data) => {
        // Return a new array with the score cards who's id does not match data.id
        updatedScoreCards = scoreCards.filter((scoreCard) => {
          return scoreCard.id !== data.id
        })
      }
    })
      .done(() => {
        // Set state of scoreCards to updatedScoreCards
        this.setState({
          scoreCards: updatedScoreCards
        })
      })
  }

  render() {
    return (
      <div>
        <h1 className={`${css.headline}`}>Your score cards list:</h1>
        {this.state.scoreCards.map((card) => {
          return (
            <div key={card.id}>
              <a href='#' onClick={(e) => this.props.handleShowCard(e, card.id)}>
                {card.created_at.substring(0, 10)} {card.course_name} {card.num_of_holes} Holes - {card.city} {card.state}
              </a>
              <button className={`${css.buttonDelete} btn btn-danger`} onClick={(e) => this.removeScoreCard(e, card.id)}>Delete</button>
            </div>
          )
        })}
      </div>
    )
  }
}