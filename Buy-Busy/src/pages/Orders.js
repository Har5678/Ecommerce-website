import { useValue } from "../ContextProvider";


 function Order(){
    const {order}=useValue();
    
    return(
        <>
        <h1 className="orderHeading">Your Orders</h1>
        
            {
                order.map((item, index) => (
                    <>
                    <h3 key={index} style={{
                        textAlign:"center"
                    }}>Ordered on: {item.orderDate}</h3>
                    
                        <table style={{
                            
                            margin:"auto",
                            widht:"100%",
                            
                        }}>
                            <thead>
                                <tr >
                                    <th className="tableHeader1">Title</th>
                                    <th className="tableHeaders">Price</th>
                                    <th className="tableHeaders">Quantity</th>
                                    <th className="tableHeaders">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.products.map((product,index)=>(
                                    <tr key={index}>
                                        <td className="tabelData">{product.name}</td>
                                        <td className="tabelData">&#x20B9; {product.price}</td>
                                        <td className="tabelData">{product.quantity}</td>
                                        <td className="tabelData">&#x20B9; {product.price*product.quantity}</td>
                                        
                                        
                                    </tr>
                                ))}
                                <tr>
                                    <td className="tabelDataP" colSpan="4" >&#x20B9; {item.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    
                    </>
                ))
            }

            </>
        
    )
}

export default Order;