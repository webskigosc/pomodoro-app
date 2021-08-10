function Footer({ stage, course }) {
  return (
    <footer className="wrapper">
      <div className="description">
        Check app on{' '}
        <a
          className="description__link"
          href="https://github.com/martincodes-pl/pomodoro-app"
        >
          GitHub
        </a>{' '}
        - Learning by doing | {stage + ' '}
        <a className="description__link" href={course.URL}>
          {course.title}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
