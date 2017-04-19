import React, { PropTypes } from 'react';
import logoImg from '../../../../assets/images/logo.png';
import css from './NavBar.scss'

export default class NavBar extends React.Component {
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

  handleLogoLink() {
    if (this.state.user == null) {
      return (
        <h1>
          <a href='/'><img src={logoImg} className={css.logo}/></a>
        </h1>
      )
    } else {
      return (
        <h1>
          <a href='/users/show/:id'><img src={logoImg} className={css.logo}/></a>
        </h1>
      )
    }
  }

  renderLinks() {
    if (this.state.user == null) {
      return (
        <div className={`${css.menuWrap} col-sm-3`}>
          <ul className={css.menu}>
            <li><a href='/users/sign_in'>Login</a></li>
            <li><a href='/users/sign_up'>Signup</a></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className={`${css.menuWrap} col-sm-3`}>
          <ul className={css.menu}>
            <li><a href='/users/edit'>Edit account</a></li>
            <li><a href='/users/sign_out'>Logout</a></li>
          </ul>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='row'>
        <div className={`${css.logoWrap} col-sm-9`}>
          {this.handleLogoLink()}
        </div>
        
        {this.renderLinks()}

      </div>
    )
  }
}