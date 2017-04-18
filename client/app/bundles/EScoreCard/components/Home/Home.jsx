import React, { PropTypes } from 'react';
import NavBar from '../NavBar/NavBar';
import css from './Home.scss'

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
      <div>
        <NavBar user={this.props.user}/>

        <section className='welcomeBanner'>
          <div className={`${css.welcomeImageRow} row`}>
            <div className={`${css.welcomeWrap} col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4`}>
              <p className={`${css.welcomeText}`}>
                Welcome to eScoreCard!<br/>
                Developed to track and help improve your golf game.
              </p>
            </div>
          </div>
        </section>

        <section className='features'>
          <div className={`${css.appSpecsRow} row`}>
            <div className={`${css.appSpecsWrap} col-sm-offset-1 col-sm-10`}>
              <p>Keep track of all your golf scores for all courses played in one place.</p>
              <ul className={`${css.appSpeclist}`}>
                <li><span className={`${css.clubsIcon}`}></span>Record and Check clubs used per hole</li>
                <li>Track your putt counts <span className={`${css.puttIcon}`}></span></li>
                <li><span className={`${css.calculatorIcon}`}></span>Automatically calculates your score</li>
                <li>See your best scores<span className={`${css.scoresIcon}`}></span></li>
                <li><span className={`${css.friendsIcon}`}></span>Compare your socres with friends</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    )
  }
}