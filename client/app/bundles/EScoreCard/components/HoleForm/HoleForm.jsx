import React, { PropTypes } from 'react';
import css from './HoleForm.scss';

export default class HoleForm extends React.Component {

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
      scoreCards: this.props.scoreCards,
      increment: this.props.increment,
      hole: {
        number: '',
        par: '',
        yards: '',
        swings: [],
        score: '',
        putt_count: ''
      },
      swingNum: 1,
      clubSelects: [],
      holeVal: 1,
      parVal: '',
      puttVal: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addClubSelect = this.addClubSelect.bind(this);
    this.removeClubSelect = this.removeClubSelect.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.calculateTotalPar = this.calculateTotalPar.bind(this);
    this.calculateTotalScore = this.calculateTotalScore.bind(this);
    this.handleHoleSubmit = this.handleHoleSubmit.bind(this);
  }

  componentDidMount() {
    // Set hole.number state to holeVal
    this.setState({
      hole: Object.assign(this.state.hole, {number: this.state.holeVal})
    })
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
      } else if (key === 'par') {
        this.setState({
          parVal: e.target.value,
          hole: Object.assign(this.state.hole, {par: Number(e.target.value)})
        },
          // Recalculate Score
          this.calculateScore(hole)
        );
        this.calculateTotalPar(e);
      } else if (key === 'putt_count') {
        this.setState({
          puttVal: e.target.value,
          hole: Object.assign(this.state.hole, {putt_count: Number(e.target.value)})
        });
        // Recalculate Score
        this.calculateScore(hole)
      } 
    }
  }

  calculateTotalPar(e) {
    // Track and add each hole's par value to scoreCard pars array
    let parIndex = this.state.holeVal - 1;
    this.state.scoreCard.pars[parIndex] = Number(e.target.value);
    let parsArray = this.state.scoreCard.pars

    // Set state totalPar to the sum of state pars array
    let totalPar = this.state.scoreCard.pars.reduce((a,b) => a + b, 0);

    this.setState({
      scoreCard: Object.assign(this.state.scoreCard, {total_par: totalPar, pars: parsArray})
    });
  }

  addClubSelect(e) {
    e.preventDefault();
    let swingNum = this.state.swingNum;
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
    let swingNum = this.state.swingNum;
    // Remove last element in clubSelects and swings array
    if (this.state.hole.swings.length === this.state.clubSelects.length) {
      this.state.clubSelects.pop();
      this.state.hole.swings.pop();
    } else {
      this.state.clubSelects.pop();
    }
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
    let puttCount = hole.putt_count;

    let score = Number((numOfSwings - par) + puttCount);

    if (score < -3 ) {
      this.setState({
        hole: Object.assign(hole, {score: score})
      });
    } else if (score === -3) {
      // let updatedHole = Object.assign(hole, {score: 'ALBATROSS'});
      this.setState({
        hole: Object.assign(hole, {score: 'ALBATROSS'})
      });
    } else if (score === -2) {
      // let updatedHole = Object.assign(hole, {score: 'EAGLE'});
      this.setState({
        hole: Object.assign(hole, {score: 'EAGLE'})
      });
    } else if (score === -1) {
      // let updatedHole = Object.assign(hole, {score: 'BIRDIE'});
      this.setState({
        hole: Object.assign(hole, {score: 'BIRDIE'})
      });
    } else if (score === 0) {
      // let updatedHole = Object.assign(hole, {score: 'PAR'});
      this.setState({
        hole: Object.assign(hole, {score: 'PAR'})
      });
    } else if (score === 1) {
      this.setState({
        hole: Object.assign(hole, {score: 'BOGEY'})
      });
    } else if (score === 2) {
      this.setState({
        hole: Object.assign(hole, {score: 'DOUBLE BOGEY'})
      });
    } else if (score === 3) {
      this.setState({
        hole: Object.assign(hole, {score: 'TRIPPLE BOGEY'})
      });
    } else {
      let updatedHole = Object.assign(hole, {score: score})
      this.setState({
        hole: Object.assign(hole, {score: `+${score}`})
      });
    }
    this.calculateTotalScore(hole)
  }

  calculateTotalScore(hole) {
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
    } else if (holeScore === 'BOGEY') {
      holeScore = 1
    } else if (holeScore === 'DOUBLE BOGEY') {
      holeScore = 2
    } else if (holeScore === 'TRIPPLE BOGEY') {
      holeScore = 3
    } else {
      holeScore = Number(holeScore)
    }

    // Track and add each hole's score value to state scores array
    let parIndex = this.state.holeVal - 1;
    this.state.scoreCard.scores[parIndex] = holeScore;
    let scoresArray = this.state.scoreCard.scores;

    // Set state totalScore to the sum of state scores array
    let totalScore = this.state.scoreCard.scores.reduce((a,b) => a + b, 0);

    if (totalScore > 0) {
      this.setState({
        scoreCard: Object.assign(this.state.scoreCard, {total_score: `+${totalScore}`, scores:scoresArray})
      })
    } else {
      this.setState({
        scoreCard: Object.assign(this.state.scoreCard, {total_score: totalScore, scores: scoresArray})
      })
    }
  }

  handleHoleSubmit(e) {
    e.preventDefault();
    e.persist();

    let swings = this.state.hole.swings.toString();
    let parsString = this.state.scoreCard.pars.toString();
    let scoresString = this.state.scoreCard.scores.toString();
    // format pars and scores array to '{val, val, val}' to save to postgres db 
    let pars = `{${parsString}}`;
    let scores = `{${scoresString}}`;
    let holeInfo = Object.assign(this.state.hole, {swings: swings, score_card_id: this.state.scoreCard.id});
    let scoreCardInfo = Object.assign({}, {total_par: this.state.scoreCard.total_par, total_score: this.state.scoreCard.total_score,
      pars: pars, scores: scores});
    let scoreCardId = this.state.scoreCard.id

    // make POST request to hole create
    $.ajax({
      headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
      type:'POST',
      url:`/score_cards/${scoreCardId}/holes`,
      dataType: 'json',
      data: {hole: holeInfo},
      success:function(data) {
        // console.log('HOLE DATA = ' + JSON.stringify(data));
      }
    }).then(() => {
      // make PUT request to score card update to save pars and scores
      $.ajax({
        headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
        type:'PUT',
        url:`/score_cards/${scoreCardId}`,
        dataType: 'json',
        data: {score_card: scoreCardInfo},
        success:function(data) {
          // console.log('SCORE CARD DATA = ' + JSON.stringify(data));
        }
      }).done(() => {
        // If hole.number is the last hole, show the scorecard
        // otherwise call resetHoleForm func
        if (this.state.hole.number === Number(this.state.scoreCard.num_of_holes)) {
          this.props.handleShowCard(e, scoreCardId);
        } else {
          this.resetHoleForm();
        }
      })
    })
  }

  resetHoleForm() {
    let increment;

    if (this.state.holeVal === this.state.scoreCard.num_of_holes) {
      increment = 0;
    } else {
      increment = 1;
    }

    // Reset select states
    this.setState({
      hole: {
        number: this.state.holeVal + increment,
        par: '',
        yards: '',
        swings: [],
        putt_count: '',
        score: 0
      },
      clubSelects: [],
      holeVal: this.state.holeVal + increment,
      parVal: '',
      puttVal: '',
      swingNum: 1
    });
  }

  // Render correct select node for hole based on ScoreCard's number of holes
  renderHoleSelect() {
    if(this.state.scoreCard.num_of_holes == 9) {
      return (
         <input id='holeVal' className={`${css.inputHole} ${css.holeVal} form-control`} value={this.state.holeVal} readOnly/>
      )
    } else {
      return (
        <input id='holeVal' className={`${css.inputHole} ${css.holeVal} form-control`} value={this.state.holeVal} readOnly/>
      )
    }
  }

  render() {
    return (
      <div className='holeFormWrap'>
        <div className='row'>
          <h1 className={css.headline}>Course: {this.state.scoreCard.course_name}</h1>
          <h2 className={css.subheadline}>Track your swings, putts, and scores</h2>
        </div>

        <div className='row'>
          <form className='holeForm col-md-offset-3 col-md-6' onSubmit={this.handleHoleSubmit}>
            <div className={`${css.holeFormContainer}`}>
            <div className={`holeInfo ${css.rowHole}`}>
              <label htmlFor='holeNumber'>Hole</label>
              {this.renderHoleSelect()}
              <label htmlFor='par'>Par</label>
              <select id='par' className={`${css.selectHole}`} value={this.state.parVal} onChange={this.handleSelect('par')} required>
                <option value=''>Select</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <label htmlFor='yards' className=''>Yards</label>
              <input id='yards' className={`${css.inputHole} ${css.inputYards} form-control`} value={this.state.hole.yards} onChange={this.handleInput('yards')} required />
            </div>

            <div className={`${css.swingSelectsOutterWrap} ${css.rowHole}`}>
              { 
                this.state.clubSelects.map((swing)=> {
                  return (
                    <div className={`${css.swingWrap}`} key={swing}>
                      <label htmlFor='swingCount' className=''>Swing {swing}</label>
                      <select id='swingCount' style={{margin: '10px 10px'}} onChange={this.handleSelect('club', swing)} required>
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
                      <button className='btn btn-danger' onClick={this.removeClubSelect}>Delete</button>
                    </div>
                  )
                })
              }
               <button className={`${css.buttonHole} btn btn-info`} onClick={this.addClubSelect}>Add swing</button>
            </div>

            <div className={`puttScoreWrap ${css.rowHole}`}>
              <label htmlFor='puttCount'>Putt Count</label>
              <select id='puttCount' className={`${css.selectHole}`} value={this.state.puttVal} onChange={this.handleSelect('putt_count')} required>
                <option value=''>Select</option>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>

              <div className={`${css.scoreWrap}`}>
                <label htmlFor='holeScore'>Score</label>
                <input id='holeScore' className={`${css.inputHole} ${css.score} form-control`} value={this.state.hole.score} readOnly/>
              </div>
            </div>

            <div className={`${css.totalsWrap} ${css.rowHole}`}>
              <label htmlFor='totalPar'>Total Par</label>
              <input id='totalPar' className={`${css.inputHole} form-control`} value={this.state.scoreCard.total_par} readOnly/>
              <label htmlFor='totalScore'>Total Score</label>
              <input id='totalScore' className={`${css.inputHole} ${css.inputTotalScore} form-control`} value={this.state.scoreCard.total_score} readOnly/>
            </div>


            <input className={`${css.buttonHole} ${css.buttonAddHole} btn btn-primary`} type='submit' value='Add hole' />
          </div>
          </form>
        </div>
      </div>
    )
  }
}