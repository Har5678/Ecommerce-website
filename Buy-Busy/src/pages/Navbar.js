import { Link, Outlet } from "react-router-dom";
import { useValue } from "../ContextProvider";





export function Navbar() {
    const { user, signOutUser } = useValue();

    const handlelogout = () => {
        signOutUser();
    }

    return (
        <>
            <div className="navbar">
                <h1 className="heading1">Busy Buy</h1>
                
                <ul>
                    {user ? <><Link to="/" onClick={handlelogout} className="link"><b>Logout</b></Link>
                        <Link to="/" className="link">
                            <b>Home</b></Link><Link to="/cartTobeAdded" className="link"><b>Carts</b></Link>
                        <Link to="/order" className="link"><b>Orders</b></Link></> :
                        <><Link to="/" className="link"><li><b>Home</b></li></Link>
                            <Link to="/SignIn" className="link"><li><b>SignIn</b></li></Link></>}
                </ul>
            </div>
            <Outlet />
        </>
    )
}