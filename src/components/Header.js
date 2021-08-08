import Logomark from './Logomark';

function Header({ title, description }) {
  return (
    <header className="Header">
      <Logomark maxWidth="72px" maxHeight="64px" />
      <div className="Header__logotype">
        <span className="Header__title">{title}</span>
        <span className="Header__description">{description}</span>
      </div>
    </header>
  );
}

export default Header;
