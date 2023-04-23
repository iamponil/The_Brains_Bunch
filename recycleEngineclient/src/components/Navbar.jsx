import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          RecycleEngine
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName}</li>
         
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
