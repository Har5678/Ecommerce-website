import { useRef, useState, } from "react"
import { useValue } from "../ContextProvider";


export default function Aside() {
    const {setMaxValue,setCategory,category}=useValue();
   
    const inputRef = useRef();
    const [value, setValue] = useState(1);
    

    const handleprice=()=>{
        setValue(inputRef.current.value);
        setMaxValue(inputRef.current.value);
    }

    const handlecategory = (e) => {
        const checked = e.target.checked;
        const isPresent = category.includes(e.target.value);
        if (checked && !isPresent) {
            setCategory([e.target.value, ...category]);
        } else {
            setCategory(category.filter((cat) => cat !== e.target.value));
        }
    }

    return (

        <aside>
            <div className="filter">
                <h2>Filter</h2>
                <p>Price: {value}</p>
                <input type="range" min="1" max="9000" ref={inputRef} onChange={handleprice} />
                <form>
                    <ul>
                        <li>
                            <input type="checkbox" id="Clothes" name="category" value="Clothes" onClick={handlecategory} />
                            <label for="Clothes">Clothes</label>
                        </li>
                        <li>
                            <input type="checkbox" id="Toys" name="category" value="Toys" onClick={handlecategory} />
                            <label for="Toys">Toys</label>
                        </li>
                        <li>
                            <input type="checkbox" id="Jwellery" name="category" value="Jwellery" onClick={handlecategory} />
                            <label for="Jwellery">Jwellery</label>
                        </li>
                        <li>
                            <input type="checkbox" id="electronics" name="category" value="Electronics" onClick={handlecategory} />
                            <label for="electronics">Electronics</label>
                        </li>
                    </ul>
                </form>

            </div>


        </aside>

    )
}