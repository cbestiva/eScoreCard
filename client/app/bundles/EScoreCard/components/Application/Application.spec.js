import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Application from './Application.jsx';
import scoreCardForm from '../ScoreCardForm/ScoreCardForm.jsx'
import {expect} from 'chai';

let currentUser = {
  firstname: 'Charlene',
  lastname: 'Estiva',
  email: 'cestivatest@gmail.com'
};

describe('Application', () => {

  it('should exist', () => {
    let application = TestUtils.renderIntoDocument(<Application user={currentUser}/>);
    expect(application).to.exist;
  });

  it('should render the scoreCardForm on initial load', () => {
   let application = TestUtils.renderIntoDocument(<Application user={currentUser}/>);
   expect(application.state.showCardForm).to.be.true;
  });

  it('handleShowScoreCards() renders list of score cards', () => {
    let scoreCards = [
      {
        id: 1,
        created_at: '2017-05-01T15:32:08.224-07:00',
        course_name: 'Balboa Golf Course',
        city: 'San Diego',
        state: 'CA'
      }
    ]
    let application = TestUtils.renderIntoDocument(<Application user={currentUser} scoreCards={scoreCards}/>);
    let scoreCardsLink = TestUtils.findRenderedDOMComponentWithClass(application, 'js-scoreCardsLink');
    TestUtils.Simulate.click(scoreCardsLink);
    expect(application.state.showCardForm).to.be.false;
    expect(application.state.showAllCards).to.be.true;
  });
})