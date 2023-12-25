import './App.scss';
import Header from './components/Common/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  const {user,loginContext}=useContext(UserContext);
  // const [hideHeader,setHideHeader]= useState(false);
  // useEffect(() =>{
  //     if(window.location.pathname === '/login'){
  //       setHideHeader(true)
  //     }
  // },[])

  useEffect(()=>{
    if(localStorage.getItem("token")){
      loginContext(localStorage.getItem("email"),localStorage.getItem("token"))
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
