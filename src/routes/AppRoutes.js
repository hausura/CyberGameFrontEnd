import { Routes,Route } from "react-router-dom";
import Home from "../components/Pages/Home/Home";
import TableUsers from "../components/Pages/UserManger/TableUser";
import Login from "../components/Pages/Login/Login";
import PrivateRoute from "./PrivateRoutes";
import NotFound from "../components/Pages/UserManger/NotFound";

const AppRoutes = () =>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/users' element={
                    <PrivateRoute>
                        <TableUsers/>
                    </PrivateRoute>}
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes> 
        </>
    )
}

export default AppRoutes;