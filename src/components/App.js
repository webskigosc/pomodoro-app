import React from 'react';
// import { v4 as uuidv4 } from 'uuid';

import Header from './Header';
import Footer from './Footer';
import TaskTimer from './TaskTimer';
import TasksList from './TasksList';

function App() {
  const app = {
    title: 'Pomodoro',
    description: 'Your favorite task timer',
    course: {
      title: 'Kurs Reacta',
      URL: 'https://kursreacta.pl',
    },
    stage: 'Week 5',
  };

  return (
    <>
      <Header title={app.title} description={app.description} />
      <Mainpage />
      <Footer stage={app.stage} course={app.course} />
    </>
  );
}

export default App;

function Mainpage() {
  return (
    <main className="wrapper">
      <TaskTimer />
      <TasksList />
    </main>
  );
}
