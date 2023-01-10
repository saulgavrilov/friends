import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className='auth reverse'>
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
            <span>Do you have an account ?</span>
            <Link to='/login'>
              <button>Login</button>
            </Link>
          </section>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form>
            <input
              type='text'
              placeholder='Full Name'
              name='name'
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
