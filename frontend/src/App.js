import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './Root.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import GetUserProfile from './pages/GetUserProfile.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path='profile' element={<GetUserProfile />} />
      <Route path="signup" element={<Signup />} />

    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
