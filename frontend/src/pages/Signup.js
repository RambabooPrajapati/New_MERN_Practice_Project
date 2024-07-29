import { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
// import GetUserProfile from './GetUserProfile';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  // const [data, setData] = useState([]);

  const registerData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status !== 200) {
        console.log("Something went wrong while registering data");
      }
      const resData = await response.json();
      return resData;
    } catch (error) {
      console.log("Something went wrong while registering data!!!!", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerData();
    if (result) {
      // setData([...data, result.user]); // Correctly setting the user data in the state
      setFormData({
        username: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className='maincontainer'>
      {/* {<GetUserProfile setData={setData}  data={data}    />} */}
      <div className='container'>
        <h3>Signup page...</h3>
        <form className="formContainer" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
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
          <span>Have an account?</span><span className="login"><Link to={"/login"}>Login</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
