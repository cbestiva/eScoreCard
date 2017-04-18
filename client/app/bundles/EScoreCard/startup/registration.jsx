import ReactOnRails from 'react-on-rails';

// import HomeLayout from '../layouts/HomeLayout';
import Home from '../components/Home/Home';
import NewCourseForm from '../components/NewCourseForm/NewCourseForm';
import NavBar from '../components/NavBar/NavBar'

ReactOnRails.register({
  // HomeLayout,
  NavBar,
  Home,
  NewCourseForm
});