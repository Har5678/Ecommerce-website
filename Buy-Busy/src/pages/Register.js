
import { useValue } from "../ContextProvider"


export default function Register(){
    const {addUser}=useValue();
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const credentials={
            displayName:e.target[0].value, 
            email:e.target[1].value,
            password:e.target[2].value
        }
        addUser(credentials);
        
        
    }
    return(
        <>
        <div className="Sign-up">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" required/>
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <input type="password" placeholder="Confirm Password" required/>
                <input type="submit" value="Register"/>
            </form>
        </div>
        </>
    )
}
