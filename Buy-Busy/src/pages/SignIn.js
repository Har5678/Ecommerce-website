import { Link} from "react-router-dom"
import { useValue } from "../ContextProvider";


export default function SignIn(){
    
    const {signinUser} = useValue();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const credentials={
            email:e.target[0].value,
            password:e.target[1].value
        }
        signinUser(credentials);
    }
    return(
        <div className="register-form">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" required/>
                </label>
                <label>
                    Password:
                     <input type="password" required/>
                </label>
                <input type="submit" value="Sign In"/>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>


    )
}