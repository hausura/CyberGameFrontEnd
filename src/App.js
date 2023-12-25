import './App.scss';
import Header from './components/Common/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { handleRefresh } from './Redux/actions/userAction';

function App() {
  const dispatch =useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      // loginContext(localStorage.getItem("email"),localStorage.getItem("token"))
      dispatch(handleRefresh())
    }
  },[])
  return (
    <div className='app-container'>
      
      <Header/>
      <Container>
        <AppRoutes></AppRoutes>
      </Container>
      <ToastContainer
      position="top-right"
      autoClose={1000}
      />
    </div>
  );
}

export default App;
