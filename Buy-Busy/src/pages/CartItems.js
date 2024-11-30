import { useValue } from "../ContextProvider";



function CartItem(){
    const {addToCart,addCartQuantity,removeCartQuantity,removeFromCart,createOrder}=useValue();
    
    const totalPrice=addToCart.reduce((acc, cart)=>acc+(cart.price*cart.quantity),0);

    
    return(
        <div >
            <div className="orderTotal">

            <p style={{
                marginLeft:"25px"
            }}>Total Price: &#x20B9; {totalPrice}</p>
            <button className="btn" onClick={()=>(createOrder(addToCart,totalPrice))}>Purchase</button>
            </div>
            <div className="cartItems">
                {addToCart.map((cart,index)=>(
                    <div key={index} style={{
                        width:"230px",
                        height:"400px"
                    }}>
                        <img src={cart.image}  style={{width:"200px",
                            height:"200px",
                            
                        }}/>
                        <h2>{cart.name}</h2>
                        <p style={{
                            fontSize: "larger",
                            color: "darkgreen"
                        }}> &#x20B9; {cart.price}</p>
                        
                        <img className="plus" onClick={()=>(addCartQuantity(cart.id,cart.quantity))} src="https://static.vecteezy.com/system/resources/thumbnails/000/376/259/small_2x/Basic_Elements__28121_29.jpg"></img>
                        <img className="minus" onClick={()=>(removeCartQuantity(cart.id,cart.quantity>0?cart.quantity:null))} src="https://www.svgimages.com/svg-image/s8/minus-symbol-256x256.png" />
                        <p className="quantity">{cart.quantity}</p>
                        <button className="btn3" onClick={()=>removeFromCart(cart.id)}>Remove from cart</button>
                        </div>
                )
                
                )}
            </div>
        </div>
        
    )
}

export {CartItem};