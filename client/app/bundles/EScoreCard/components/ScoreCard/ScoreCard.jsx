import React, { PropTypes } from 'react';
import css from './ScoreCard.scss';

export default class ScoreCard extends React.Component {

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { 
      scoreCard: this.props.scoreCard,
      increment: this.props.increment,
      totalPar: this.props.totalPar,
      totalScore: this.props.totalScore,
      par: 3,
      swingNum: 2,
      clubSelects: [1],
      swings: [],
      score: 0,
      numOFPutts: 0
    }
    this.addClubSelect = this.addClubSelect.bind(this);
    this.removeClubSelect = this.removeClubSelect.bind(this);
    this.handleSelectPar = this.handleSelectPar.bind(this);
    this.handleSelectSwing = this.handleSelectSwing.bind(this);
    this.handleSelectPutt = this.handleSelectPutt.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  componentDidMount() {
    // this.calculateTotalScore()
  }

  componentDidUpdate() {
    console.log('total score updated = ', this.state.totalScore);
  }

  handleSelectPar(e) {
    let par = e.target.value;
    let numOfSwings = this.state.clubSelects.length;
    let numOFPutts = this.state.numOFPutts;
    this.setState({
      par: par
    },
      // Recalculate Score
      this.calculateScore(par, numOfSwings, numOFPutts)
    );
  }

  handleSelectSwing(e) {
    let club = e.target.value;
    let swings = this.state.swings.concat(club);
    let par = this.state.par;
    let numOfSwings = this.state.clubSelects.length;
    let numOFPutts = this.state.numOFPutts;
    this.setState({
      swings: swings
    },
      // Recalculate score
      this.calculateScore(par, numOfSwings, numOFPutts)
    );
  }

  handleSelectPutt(e) {
    let numOFPutts = Number(e.target.value);
    let par = this.state.par;
    let numOfSwings = this.state.clubSelects.length;
    this.setState({
      numOFPutts: numOFPutts
    },
      // Recalculate score
      this.calculateScore(par, numOfSwings, numOFPutts)
    );
  }

  addClubSelect(e) {
    e.preventDefault();
    let swingNum = this.state.swingNum; // 2
    let clubSelects = this.state.clubSelects.concat(swingNum);
    // Updates state async
    this.setState((prevState, props) => {
      return {
        swingNum: prevState.swingNum + props.increment,
        clubSelects: clubSelects
      }
    }, () => {
      return
    });
  }

  removeClubSelect(e) {
    e.preventDefault();
    let par = this.state.par;
    let numOFPutts = this.state.numOFPutts;
    let swingNum = this.state.swingNum;
    // remove last element in clubSelects and swings array
    this.state.clubSelects.pop();
    let numOfSwings = this.state.clubSelects.length;
    this.state.swings.pop();
    // Updates state async
    this.setState((prevState, props) => {
      return {
        swingNum: prevState.swingNum - props.increment
      }
    },
      // Recalculate Score
      this.calculateScore(par, numOfSwings, numOFPutts)
    );
  }

  /**
   * @param par - par state
   * @param numOfSwings - clubSelects array length state
   * @param numOfPutts - numOfPutts state
  */
  calculateScore(par, numOfSwings, numOFPutts) {
    let score = (Number(numOfSwings) - Number(par)) + Number(numOFPutts);

    if (score === -3) {
      this.setState({ 
        totalPar: par,
        score: 'ALBATROSS',
        totalScore: 'ALBATROSS'
      });
    } else if (score === -2) {
      this.setState({
        totalPar: par,
        score: 'EAGLE',
        totalScore: 'EAGLE'
      });
    } else if (score === -1) {
      this.setState({
        totalPar: par,
        score: 'BIRDIE',
        totalScore: 'BIRDIE'
      });
    } else if (score === 0) {
      this.setState({
        totalPar: par,
        score: 'PAR',
        totalScore: 'PAR'
      });
    } else {
      this.setState({
        totalPar: par,
        score: score,
        totalScore: score
      });
    }
  }

  // Render correct select node for hole based on ScoreCard's number of holes
  renderHoleSelect() {
    if(this.state.scoreCard.num_of_holes == 9) {
      return (
        <select id='HoleNumber' required>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
        </select>
      )
    } else {
      return (
        <select id='HoleNumber' required>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
          <option value='13'>13</option>
          <option value='14'>14</option>
          <option value='15'>15</option>
          <option value='16'>16</option>
          <option value='17'>17</option>
          <option value='18'>18</option>
        </select>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Course: {this.state.scoreCard.course_name}</h1>
        <h2>Track your swings, puts, and score per hole</h2>
        <form className='holeForm'>
          <div className='holeInfo'>
            <label htmlFor='holeNumber' className=''>Hole</label>
            {this.renderHoleSelect()}
            <label htmlFor='par' className=''>Par</label>
            <select id='par' required onChange={this.handleSelectPar}>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <label htmlFor='yards' className=''>Yards</label>
            <input id='yards' required />
          </div>

          <div className='swingSelectsOutterWrap'>
            { 
              this.state.clubSelects.map((swing)=> {
                return (
                  <div className='' key={swing}>
                    <label htmlFor='swingCount' className=''>Swing {swing}</label>
                    <select id='swingCount' onChange={this.handleSelectSwing}>
                      <option value=''>Club</option>
                      <option value='Driver'>Driver</option>
                      <option value='3 Wood'>3 Wood</option>
                      <option value='5 Wood'>5 Wood</option>
                      <option value='7 Wood'>7 Wood</option>
                      <option value='Hybrid'>Hybrid</option>
                      <option value='4 Iron'>4 Iron</option>
                      <option value='5 Iron'>5 Iron</option>
                      <option value='6 Iron'>6 Iron</option>
                      <option value='7 Iron'>7 Iron</option>
                      <option value='8 Iron'>8 Iron</option>
                      <option value='9 Iron'>9 Iron</option>
                      <option value='PW'>PW</option>
                      <option value='AW'>AW</option>
                      <option value='SW'>SW</option>
                    </select>
                    <button className='btn' onClick={this.removeClubSelect}>Delete</button>
                  </div>
                )
              })
            }
             <button className='btn' onClick={this.addClubSelect}>Add swing</button>
          </div>

          <div className='puttWrap'>
            <label htmlFor='puttCount'>Putt Count</label>
            <select id='puttCount' required onChange={this.handleSelectPutt}>
              <option value=''>Number of putts</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>

          <div className='scoresWrap'>
            <div className='score'>
              <label htmlFor='holeScore'>Score</label>
              <input id='holeScore' className='js-holeScore' value={this.state.score} readOnly/>
            </div>

            <div className='totalScore'>
              <label htmlFor='totalScore'>Total Score</label>
              <input id='totalScore' value={this.state.totalScore} readOnly/>
            </div>
          </div>
          
        </form>
      </div>
    )
  }
}