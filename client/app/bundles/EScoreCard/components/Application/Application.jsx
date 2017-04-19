import React, { PropTypes } from 'react';
import NavBar from '../NavBar/NavBar';
import ScoreCardForm from '../ScoreCardForm/ScoreCardForm'
import css from './Application.scss'

export default class Application extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // this is passed from the Rails view
    scoreCards: PropTypes.array.isRequired,
    scoreCard: PropTypes.object.isRequired,
    showForm: PropTypes.bool.isRequired
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
      showForm: this.props.showForm
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state.scoreCards)
    console.log(this.state.scoreCard)
  }

  // Function passed to ScoreCardForm child component 
  handleSubmit(e) {
    e.preventDefault();
    let scoreCards = this.state.scoreCards;
    let showForm = this.state.showForm;
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
      this.setState({ showForm: !showForm })
    );
  }

  render() {
    return (
      <div>
        <NavBar user={this.props.user}/>

        <h1 className={`${css.welcomeHeadline}`}>
          Welcome, {this.state.user.firstname}. Playing a round of golf? 
        </h1>

        {this.state.showForm ? <ScoreCardForm user={this.props.user} scoreCards={this.props.scoreCards} scoreCard={this.props.scoreCard} handleSubmit={this.handleSubmit}/> : null}
        
      </div>
    )
  }
}