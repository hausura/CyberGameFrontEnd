import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes,Route,Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
        <Routes>
        {/* <Route path='/login' element={<Login />}></Route> */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
    </Routes>
    </BrowserRouter> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
