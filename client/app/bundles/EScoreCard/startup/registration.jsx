import ReactOnRails from 'react-on-rails';

import Splash from '../components/Splash/Splash';
import Application from '../components/Application/Application';
import NavBar from '../components/NavBar/NavBar';
import ScoreCardForm from '../components/ScoreCardForm/ScoreCardForm';
import ScoreCard from '../components/ScoreCard/ScoreCard';
import ScoreCardsList from '../components/ScoreCardsList/ScoreCardsList'

ReactOnRails.register({
  Splash,
  Application,
  NavBar,
  ScoreCardForm,
  ScoreCard,
  ScoreCardsList
});