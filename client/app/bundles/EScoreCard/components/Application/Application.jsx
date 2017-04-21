import React, { PropTypes } from 'react';
import NavBar from '../NavBar/NavBar';
import ScoreCardForm from '../ScoreCardForm/ScoreCardForm'
import ScoreCard from '../ScoreCard/ScoreCard'
import css from './Application.scss'

export default class Application extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // this is passed from the Rails view
    scoreCards: PropTypes.array.isRequired,
    scoreCard: PropTypes.object.isRequired,
    showForm: PropTypes.bool.isRequired,
    showCard: PropTypes.bool.isRequired,
    increment: PropTypes.number.isRequired,
    totalPar: PropTypes.number.isRequired,
    totalScore: PropTypes.number.isRequired
  };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { 
      user: this.props.user,
      scoreCards: this.props.scoreCards,
      scoreCard: this.props.scoreCard,
      showForm: this.props.showForm,
      showCard: this.props.showCard,
      increment: this.props.increment,
      totalPar: this.props.totalPar,
      totalScore: this.props.totalScore
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Function passed to ScoreCardForm child component 
  handleSubmit(e) {
    e.preventDefault();
    let scoreCards = this.state.scoreCards;
    let showForm = this.state.showForm;
    let showCard = this.state.showCard;
    $.ajax({
      headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
      type:'POST',
      url:'/score_cards',
      dataType: 'json',
      data: {score_card: this.state.scoreCard},
      success:function(data) {
        console.log('DATA = ' + JSON.stringify(data));
        scoreCards.push(data);
        console.log(scoreCards);
      }
    },
      // After ajax set showForm state to false 
      this.setState({
        showForm: !showForm,
        showCard: !showCard
      })
    );
  }

  render() {
    return (
      <div>
        <NavBar user={this.props.user}/>

        <h1 className={`${css.welcomeHeadline}`}>
          Welcome, {this.state.user.firstname}. Playing a round of golf? 
        </h1>

        {this.state.showForm ? <ScoreCardForm user={this.props.user} scoreCards={this.props.scoreCards}
          scoreCard={this.props.scoreCard} handleSubmit={this.handleSubmit}/> : null}
        {this.state.showCard ? <ScoreCard scoreCard={this.props.scoreCard} increment={this.props.increment}
          totalPar={this.props.totalPar} totalScore={this.props.totalScore}/> : null}
      </div>
    )
  }
}