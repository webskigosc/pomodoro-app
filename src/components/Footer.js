function Footer({ stage, course }) {
  return (
    <footer className="Footer">
      Check app on{' '}
      <a
        className="Footer__link"
        href="https://github.com/martincodes-pl/pomodoro-app"
      >
        GitHub
      </a>{' '}
      - Learning by doing | {stage + ' '}
      <a className="Footer__link" href={course.URL}>
        {course.title}
      </a>
    </footer>
  );
}

export default Footer;
