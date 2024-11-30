

import { useNavigate } from "react-router-dom";
import { useValue } from "../ContextProvider";




export default function Cart() {
    const { addCart,data1,user} = useValue();
    const navigate=useNavigate();
    const handlebutton=(d)=>{
        if(user){
            let quantity=1;
            console.log(d);
        addCart(d.id,quantity,user.uid);
    }else{
        navigate("/signIn");
        return;
    }

    }
    return (
        <>
            <main>
                {data1.map(d => (
                    <div key={d.id}>
                        <img src={d.image} alt={d.name} style={{
                            width: "200px",
                            height: "230px"
                        }} />
                        <h2>{d.name}</h2>

                        <p style={{
                            fontSize: "larger",
                            color: "darkgreen"
                        }}> &#x20B9; {d.price}</p>

                        <button className="btn1" onClick={()=>handlebutton(d)}>Add to Cart</button>
                    </div>
                ))}

            </main>

        </>

    )
}