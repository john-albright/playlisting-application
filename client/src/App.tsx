import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Logout from './Pages/Logout';
//import { myContext } from './Pages/Context';
import './App.css';

const App: React.FC = (): JSX.Element => {
  //const ctx: Object = useContext(myContext);
  //console.log("app component:", ctx);
  
  /*
  const homepageRoutes = {
    path: '/',
    element: <HomePage />,
    children: [
      { path: '*', element: <Navigate to='/404' /> }
    ]
  };

  const adminpageRoutes = {
    path: '/',
    element: <AdminPage />,
    children: [
      { path: '*', element: <Navigate to='/404' /> }
    ]
  };
  
  const routing = useRoutes[homepageRoutes, adminpageRoutes]*/
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={ <HomePage /> }></Route>
        <Route path="/admin" element={ <AdminPage /> }></Route>
        <Route path="/login" element={ <Login /> }></Route>
        <Route path="/logout" element={ <Logout /> }></Route>
        <Route path="/profile" element={ <Profile /> }></Route>
        <Route path="/register" element={ <Register /> }></Route>
      </Routes>
    </>
  );
}

export default App;
