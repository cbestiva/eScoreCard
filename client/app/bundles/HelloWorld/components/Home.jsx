import React, { PropTypes } from 'react';

export default class Home extends React.Component {

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { user: this.props.user };
  }

  render() {
    return (
      <div className='homeWrap'>
        <div className='welcomeImageRow row'>
          <div className='welcomeWrap col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4'>
            <p className='welcomeText'>
              Welcome to eScoreCard!<br/>
              Developed to track and help improve your golf game.
            </p>
          </div>
        </div>


        <div className='appSpecsRow row'>
          <div className='appSpecsWrap col-sm-offset-1 col-sm-10'>
            <p>Keep track of all your golf scores for all courses played in one place.</p>
            <ul className='appSpeclist'>
              <li><span className='clubsIcon'></span>Record and Check clubs used per hole</li>
              <li>Track your putt counts <span className='puttIcon'></span></li>
              <li><span className='calculatorIcon'></span>Automatically calculates your score</li>
              <li>See your best scores<span className='scoresIcon'></span></li>
              <li><span className='friendsIcon'></span>Compare your socres with friends</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}