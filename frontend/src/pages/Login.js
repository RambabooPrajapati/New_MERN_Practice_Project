import { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [data, setData] = useState([]);


  const loginData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: 'include' // Ensure this is included
      });

      if (response.status !== 200) {
        console.log("Something went wrong while logging in");
        return;
      }

      const resData = await response.json();
      console.log("Login successful");
      return resData;
    } catch (error) {
      console.log("Error during login:", error);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginData();
    if (result) {
      setData([...data, formData]);
      setFormData({
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className='container'>
      <h3>Login page...</h3>
      <form className="formContainer" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <input type='submit' />
      </form>
      <div className='gotologinpage'>
        <span>Have an account?</span><span className="login"><Link to={"/signup"}>Login</Link></span>
      </div>
    </div>
  );
};

export default Login
