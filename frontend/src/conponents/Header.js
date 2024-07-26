import "./header.css";
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
      <ul>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/about"}>About</Link></li>
        <li><Link to={"/contact"}>Contact</Link></li>
        <li><Link to={"/signup"}>Signup</Link></li>
        <li><Link to={"/login"}>Login</Link></li>
      </ul>
    </div>
  )
}

export default Header
