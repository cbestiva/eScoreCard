import React, { PropTypes } from 'react';
import Emoji from 'node-emoji';
import css from './ScoreCardForm.scss'

export default class ScoreCardForm extends React.Component {

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
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(key) {
    return (e) => {
      let cardState = this.state.scoreCard;
      let cardsState = this.state.scoreCards;
      cardState[key] = e.target.value;
      this.setState({
        scoreCard: cardState,
        scoreCards: cardsState
      });
    }
  }

  render() {
    return (
      <div className='scoreCardFormWrap'>
        <div className='row'>
          <h1 className={`${css.headline}`}>Playing a new round of golf? {Emoji.get('golf')}</h1>
        </div>

        <div className='row'>
          <form className='courseForm col-md-offset-2 col-md-8' onSubmit={this.props.handleSubmit}>
            <h2 className={`${css.subheadline}`}>
              Enter the course information below to create a new score card
            </h2>
            <input className={`${css.inputCourse} js-courseName form-control`} placeholder='Enter the course name' onChange={this.handleInput('course_name')} required/>
            <input className={`${css.inputCourse} ${css.inputCourseCity} js-city form-control`} placeholder='City' onChange={this.handleInput('city')} required/>
            <select className={`${css.inputCourse} ${css.selectCourseState} js-state form-control`} onChange={this.handleInput('state')} required>
              <option value="">State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>       
            <select className={`${css.inputCourse} ${css.selectCourseHoles} js-numOfHoles form-control`} onChange={this.handleInput('num_of_holes')} required>
              <option value="">Holes</option>
              <option value='9'>9 Holes</option>
              <option value='18'>18 Holes</option>
            </select>
            <div className='courseButtonWrap'>
            <input className={`${css.inputCourse} ${css.buttonSubmitCourse} btn btn-primary`} type='submit' value='Create score card' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}