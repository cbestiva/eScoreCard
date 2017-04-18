import React from 'react';

import Home from '../components/Home/Home';
import NewCourseForm from '../components/NewCourseForm/NewCourseForm';

// import css from './Layout.scss';

export default class Layout extends React.Component {

  render() {
    return (
      <section className={css.layout}>
        <Home />
      </section>
    );
  }

}