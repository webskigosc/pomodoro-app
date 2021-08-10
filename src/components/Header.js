import Logomark from './Logomark';

function Header({ title, description }) {
  return (
    <header className="wrapper">
      <div className="flex flex--center">
        <Logomark maxWidth="72px" maxHeight="64px" />
        <div className="logotype">
          <span className="logotype__title">{title}</span>
          <span className="logotype__description">{description}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
