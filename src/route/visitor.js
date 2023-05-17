import { Outlet } from "react-router-dom"
import Header from "../component/header/header"
import SideBar from "../component/sidebar/sidebar"

function VisitorRoute(){
return(
    <>
      <section className="home">
      <section className="home-container">
        <SideBar />
        <section className="wrapper">
        <Header/>
        <section className="post-body">
     
        <Outlet/>  
        </section>
       
        </section>
       
      </section>
    </section>
  
    </>
)
}
export default VisitorRoute