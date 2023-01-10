import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

// Context
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

// Icons
import { FaHome, FaMoon, FaSearch, FaSun, FaDoorOpen } from "react-icons/fa";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { logout, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  console.log(currentUser);

  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='left'>
          <h1>Friends</h1>

          <Link to='/'>
            <FaHome />
          </Link>

          <Link onClick={() => toggle(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </Link>
        </div>

        <center className='center'>
          <form>
            <input type='text' placeholder='Search' />
            <FaSearch />
          </form>
        </center>

        <div className='right'>
          <div className='user'>
            <img
              src={`http://localhost:5000/uploads/${currentUser.profilePic}`}
              alt=''
            />
            <span>{currentUser.name}</span>
          </div>
          <Link onClick={handleLogout}>
            <FaDoorOpen />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
