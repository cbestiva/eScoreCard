import React, { PropTypes } from 'react';
import NavBar from '../NavBar/NavBar';
import ScoreCardForm from '../ScoreCardForm/ScoreCardForm'
import HoleForm from '../HoleForm/HoleForm'
import ScoreCard from '../ScoreCard/ScoreCard'
import ScoreCardsList from '../ScoreCardsList/ScoreCardsList'
import css from './Application.scss'

export default class Application extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // this is passed from the Rails view
    scoreCards: PropTypes.array.isRequired,
    scoreCard: PropTypes.object.isRequired,
    increment: PropTypes.number.isRequired
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
      increment: this.props.increment,
      showCardForm: true,
      showHoleForm: false,
      showScoreCard: false,
      showAllCards: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowScoreCards = this.handleShowScoreCards.bind(this);
    this.handleShowCardForm = this.handleShowCardForm.bind(this);
    this.handleShowCard = this.handleShowCard.bind(this);
  }

  // Function passed to ScoreCardForm child component 
  handleSubmit(e) {
    e.preventDefault();
    let scoreCard = this.state.scoreCard;
    let scoreCards = this.state.scoreCards;
    let showCardForm = this.state.showCardForm;
    let showHoleForm = this.state.showHoleForm;
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
        scoreCard = Object.assign(scoreCard, {id: data.id})
      }
    },
      // After ajax set showForm state to false 
      this.setState({
        showCardForm: !showCardForm,
        showHoleForm: !showHoleForm
      })
    );
  }

  handleShowScoreCards(e) {
    e.preventDefault();
    this.setState({
      showCardForm: false,
      showHoleForm: false,
      showAllCards: true
    })
  }

  handleShowCardForm(e) {
    e.preventDefault();
    // Reset score card to new empty object
    this.setState({
      scoreCard: Object.assign(this.state.scoreCard,
      {
        course_name: '',
        city: '',
        state: '',
        num_of_holes: '',
        pars: [],
        scores: [],
        total_par: 0,
        total_score: 0,
        id: ''
      }),
      showCardForm: true,
      showHoleForm: false,
      showAllCards: false
    })
  }

  handleShowCard(e, cardID) {
    e.preventDefault();
    console.log('handle show card hole called!')
    console.log('card id is ', cardID);
    let card;
    $.get(`/score_cards/${cardID}`, (data) => {
      console.log('selected card is ', data);
      card = data;
    })
      .done(() => {
        // Display selected score card data
        this.setState({
          scoreCard: card,
          showCardForm: false,
          showScoreCard: true,
          showHoleForm: false,
          showAllCards: false
        })
      })
  }

  render() {
    return (
      <div>
        <NavBar user={this.props.user}/>

        <h1 className={`${css.welcomeHeadline}`}>
          Welcome, {this.state.user.firstname}! 
        </h1>

        <div className='row'>
          <div className='col-sm-12'>
            {this.state.showCardForm || this.state.showHoleForm ?
              <a href='#' className={css.cardNavLinks} onClick={this.handleShowScoreCards}>My score cards</a> : null}
            {this.state.showAllCards || this.state.showHoleForm ?
              <a href='#' className={css.cardNavLinks} onClick={this.handleShowCardForm}>Add new score card</a> : null}
          </div>
        </div>

        {this.state.showCardForm ? <ScoreCardForm user={this.props.user} scoreCards={this.props.scoreCards}
          scoreCard={this.props.scoreCard} handleSubmit={this.handleSubmit}/> : null}

        {this.state.showHoleForm ? <HoleForm scoreCard={this.state.scoreCard} scoreCards={this.props.scoreCards}
          increment={this.props.increment} handleShowCard={this.handleShowCard}/> : null}

        {this.state.showScoreCard ? <ScoreCard scoreCard={this.state.scoreCard}/> : null}

        {this.state.showAllCards ? <ScoreCardsList scoreCards={this.props.scoreCards}
          scoreCard={this.props.scoreCard} showCardForm={this.state.showCardForm} 
          showHoleForm={this.state.showHoleForm} showAllCards={this.state.showAllCards}
          handleShowCard={this.handleShowCard}/> : null}
      </div>
    )
  }
}