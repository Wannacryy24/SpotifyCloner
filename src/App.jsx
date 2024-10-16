import Header from "./Header/Header";
import '@fortawesome/fontawesome-free/css/all.css';
import Sidebar from "./Sidebar/Sidebar";
import Login from "./Login/Login";

export default function App(){
  return(
    <>
    <Header/>
    <Sidebar/>
    <Login/>
    </>
  )
}