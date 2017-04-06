import React, { PropTypes } from 'react';

export default class Home extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired, // this is passed from the Rails view
  };

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

  handleHomeView() {

  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <h1>Hello {this.state.user.firstname}</h1>
        </div>
      );
    } else {
      return (
        <div> 
          <h1>
            Please <a href='/users/sign_in'>login</a> or <a href='/users/sign_up'>sign up</a> to access eScoreCard.
          </h1>
        </div>
      );
    }
    
  }
}