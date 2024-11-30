import React from 'react'
import { useValue } from '../ContextProvider'

const Searchbox = () => {
    const {setSearchedItem}=useValue();
    return (
        <div style={{
            width:"350px",
            
            display: "flex",
            margin:"auto",
            height: "50px",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid blue",
            marginTop:"10px"
        }}>
            <input type="text" placeholder="Search products..." style={{
                width: "100%",
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "transparent"
            }} onChange={(e)=>setSearchedItem(e.target.value)}/>
        </div>
    )
}

export default Searchbox