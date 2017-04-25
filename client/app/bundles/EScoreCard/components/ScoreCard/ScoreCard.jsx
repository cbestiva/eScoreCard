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
      pars: this.props.pars,
      scores: this.props.scores,
      hole: {
        number: '',
        par: '',
        yards: '',
        swings: [],
        score: 0,
        puttCount: ''
      },
      swingNum: 2,
      clubSelects: [1],
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addClubSelect = this.addClubSelect.bind(this);
    this.removeClubSelect = this.removeClubSelect.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.handleParSelect = this.handleParSelect.bind(this);
    this.calculateTotalScore = this.calculateTotalScore.bind(this);
  }

  componentDidUpdate() {
    console.log('updated par =', this.state.totalPar)
    console.log('updated hole = ', this.state.hole)
    console.log('total score updated = ', this.state.totalScore);
  }

  handleInput(key) {
    return (e) => {
      let hole = this.state.hole;
      hole[key] = e.target.value;
      this.setState({
        hole: hole
      });
    }
  }

  handleSelect(key, swing = 0) {
    return (e) => {
      let hole = this.state.hole;
      // let numOfSwings = this.state.clubSelects.length;

      if (key === 'club') {
        let club = e.target.value;
        let swingIndex = Number(swing) - 1;
        // If swings array is empty, concat club selected
        if (hole.swings.length === 0) {
          hole.swings = hole.swings.concat(club)
          // Otherwise change the value of the swing number to the new club selected
        } else {
          hole.swings[swingIndex] = club;
        }
        this.setState({
          hole: hole
        },
          // Recalculate Score
          this.calculateScore(hole)
        )
      } else {
        hole[key] = Number(e.target.value);
        this.setState({
          hole: hole
        },
          // Recalculate Score
          this.calculateScore(hole)
        )

        // Handle par select
        if (key ==='par') {
          this.handleParSelect(e)
        }
      }
    }
  }

  handleParSelect(e) {
    // Track and add each hole's par value to state pars array
    let parIndex = this.state.hole.number - 1;
    this.state.pars[parIndex] = Number(e.target.value);
    console.log('PARS ARRAY =', this.state.pars)

    // Set state totalPar to the sum of state pars array
    let totalPar = this.state.pars.reduce((a,b) => a + b, 0);
    this.setState({
      totalPar: totalPar
    })
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
    let hole = this.state.hole;
    let par = this.state.par;
    let puttCount = this.state.puttCount;
    let swingNum = this.state.swingNum;
    // remove last element in clubSelects and swings array
    this.state.clubSelects.pop();
    let numOfSwings = this.state.clubSelects.length;
    this.state.hole.swings.pop();
    // Updates state async
    this.setState((prevState, props) => {
      return {
        swingNum: prevState.swingNum - props.increment
      }
    },
      // Recalculate Score
      this.calculateScore(hole)
    );
  }

  /**
   * @param hole - hole state object
  */
  calculateScore(hole) {
    let par = hole.par;
    let numOfSwings = this.state.clubSelects.length;
    let puttCount = hole.puttCount;

    let score = Number((numOfSwings - par) + puttCount);

    if (score === -3) {
      let updatedHole = Object.assign(hole, {score: 'ALBATROSS'});
      this.setState({
        hole: updatedHole
      });
    } else if (score === -2) {
      let updatedHole = Object.assign(hole, {score: 'EAGLE'});
      this.setState({
        hole: updatedHole
      });
    } else if (score === -1) {
      let updatedHole = Object.assign(hole, {score: 'BIRDIE'});
      this.setState({
        hole: updatedHole
      });
    } else if (score === 0) {
      let updatedHole = Object.assign(hole, {score: 'PAR'});
      this.setState({
        hole: updatedHole
      });
    } else {
      let updatedHole = Object.assign(hole, {score: score})
      this.setState({
        hole: updatedHole
      });
    }
    this.calculateTotalScore(hole)
  }

  calculateTotalScore(hole) {
    console.log('TOTAL PAR = ', this.state.totalPar)
    console.log('HOLE PAR = ', hole.par)
    let holeScore = hole.score;
    let scores = this.state.scores;

    if (holeScore === 'ALBATROSS') {
      holeScore = -3;
    } else if (holeScore === 'EAGLE') {
      holeScore = -2
    } else if (holeScore === 'BIRDIE') {
      holeScore = -1
    } else if (holeScore === 'PAR') {
      holeScore = 0
    }

    // Track and add each hole's score value to state scores array
    let parIndex = this.state.hole.number - 1;
    this.state.scores[parIndex] = holeScore;
    console.log('SCORES ARRAY =', this.state.scores)

    // Set state totalScore to the sum of state scores array
    let totalScore = this.state.scores.reduce((a,b) => a + b, 0);
    console.log('TOTAL SCORE === ', totalScore)

    this.setState({
      totalScore: totalScore
    })

  }

  // Render correct select node for hole based on ScoreCard's number of holes
  renderHoleSelect() {
    if(this.state.scoreCard.num_of_holes == 9) {
      return (
        <select id='HoleNumber' onChange={this.handleSelect('number')} required>
          <option value=''>Hole</option>
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
        <select id='HoleNumber' onChange={this.handleSelect('number')} required>
          <option value=''>Hole</option>
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

            {this.renderHoleSelect()}

            <select id='par' onChange={this.handleSelect('par')} required>
              <option value=''>Par</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <label htmlFor='yards' className=''>Yards</label>
            <input id='yards' onChange={this.handleInput('yards')} required />
          </div>

          <div className='swingSelectsOutterWrap'>
            { 
              this.state.clubSelects.map((swing)=> {
                return (
                  <div className='' key={swing}>
                    <label htmlFor='swingCount' className=''>Swing {swing}</label>
                    <select id='swingCount' onChange={this.handleSelect('club', swing)}>
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
            <select id='puttCount' onChange={this.handleSelect('puttCount')} required>
              <option value=''>Putt count</option>
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
              <input id='holeScore' className='js-holeScore' value={this.state.hole.score} readOnly/>
            </div>

            <div className='totalScore'>
              <label htmlFor='totalPar'>Total Par</label>
              <input id='totalPar' value={this.state.totalPar} readOnly/>
              <label htmlFor='totalScore'>Total Score</label>
              <input id='totalScore' value={this.state.totalScore} readOnly/>
            </div>
          </div>
          
        </form>
      </div>
    )
  }
}