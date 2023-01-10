import "./auth.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const { currentUser, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className='auth'>
      <div className='card'>
        <div className='left'>
          <h1>Friends.</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
            officiis labore blanditiis asperiores explicabo tempora corporis
            quo, pariatur architecto est rem cupiditate, repellat animi
            repudiandae!
          </p>
          <section>
            <span>Don't you have an account ?</span>
            <Link to='/register'>
              <button>Register</button>
            </Link>
          </section>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form>
            <input
              type='email'
              required
              placeholder='Email Address'
              name='email'
              onChange={handleChange}
            />
            <input
              type='password'
              required
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
            {currentUser !== null && (
              <p>
                Welcome Back {currentUser.name}, go to{" "}
                <Link to='/'>home page</Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
