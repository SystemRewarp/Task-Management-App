import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav
      style={{
        backgroundColor: "#242424",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        SyncBase
      </div>

      <ul
        style={{
          listStyle: "none",     // removes bullet points
          display: "flex",       // makes items horizontal
          gap: "20px",           // space between items
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link
            to="/"
            style={{ color: "#646cff", textDecoration: "none", fontSize: "1.1rem" }}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            style={{ color: "#646cff", textDecoration: "none", fontSize: "1.1rem" }}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
