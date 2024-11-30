import { Navbar } from "./Navbar";
import "./../styles.css";
import Aside from "./Aside";
import Cart from "./Carts";
import Searchbox from "./searchbox";





export default function Homepage(){
   
    
    return(
        <>

        <Navbar/>
        <Aside/>
        <Searchbox/>
        <Cart/>
        
        </>
    )
}