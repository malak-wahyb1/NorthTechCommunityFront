import { Outlet } from "react-router-dom"
import Header from "../component/header/header"
import SideBar from "../component/sidebar/sidebar"
import { useSelector } from "react-redux"
import Unhautorized from "../component/unhotorized/unhhautorized"
import BottomBar from "../component/bottombar"
function VisitorRoute(){
  const token=useSelector(state=>state.token)
return(
    <>
     
        {token?(
           <section className="home">
        <section className="home-container">
        <SideBar />
        <section className="wrapper">
        <Header/>
        <section className="post-body">
     
        <Outlet/>  
        </section>
       <BottomBar/>
        </section>
        </section>
      </section>):(<Unhautorized/>)}
      
  
  
    </>
)
}
export default VisitorRoute