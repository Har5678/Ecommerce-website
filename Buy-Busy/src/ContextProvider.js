import { createContext, useContext, useState, useEffect } from "react";
import { db } from "./Firebase.init";
import { addDoc, collection, getDocs, query, where, doc, updateDoc, deleteDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase.init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const AddContext = createContext();


export const useValue = () => {
    const context = useContext(AddContext);
    return context;
}
export const ContextProvider = ({ children }) => {
    const [addToCart, setaddToCart] = useState([]);
    const [data1, setData1] = useState([]);
    const [maxValue, setMaxValue] = useState(1);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState([]);
    const [searchedItem, setSearchedItem] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            if (searchedItem === "" && maxValue <= 1 && category.length == 0) {
                const querySnapshot = await getDocs(collection(db, "products"));
                let content = [];
                querySnapshot.forEach((doc) => {
                    content.push({ id: doc.id, ...doc.data() });
                });
                setData1(content);
                return;
            }
            if (maxValue > 1 && category.length == 0 && searchedItem === "") {
                const productRef = collection(db, "products");
                const q = query(productRef, where("price", "<=", Number(maxValue)));
                const querySnapshot = await getDocs(q);
                const filtereProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log(filtereProducts);
                setData1(filtereProducts);
                return;
            }
            if (maxValue <= 1 && category.length > 0 && searchedItem === "") {
                const productRef = collection(db, "products");
                const q = query(productRef, where("category", "in", category));
                const querySnapshot = await getDocs(q);
                const filterProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setData1(filterProducts);
                return;
            }
            if (maxValue <= 1 && category.length == 0 && searchedItem !== "") {
                const querySnapshot = await getDocs(collection(db, "products"));
                let content1 = [];
                querySnapshot.forEach((doc) => {
                    content1.push({ id: doc.id, ...doc.data() });
                });
                const filterProducts = content1.filter(product => product.name.toLowerCase().includes(searchedItem.toLowerCase()));
                setData1(filterProducts);
                return;
            }
            if (maxValue > 1 && category.length > 0 && searchedItem === "") {
                const productRef = collection(db, "products");
                const q = query(productRef, where("category", "in", category));
                const querySnapshot = await getDocs(q);
                const filterProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                const finalProducts = filterProducts.filter(product=>product.price<=maxValue);
                setData1(finalProducts);
                return;
            }
            if (maxValue > 1 && category.length == 0 && searchedItem !== "") {
                const productRef = collection(db, "products");
                const q = query(productRef, where("price", "<=", Number(maxValue)));
                const querySnapshot = await getDocs(q);
                const filtereProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                const finalProduct=filtereProducts.filter(product => product.name.toLowerCase().includes(searchedItem.toLowerCase()));
                setData1(finalProduct);
                return;
            }
            if (maxValue <= 1 && category.length > 0 && searchedItem !== "") {
                const productRef = collection(db, "products");
                const q = query(productRef, where("category", "in", category));
                const querySnapshot = await getDocs(q);
                const filterProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                const finalProduct=filterProducts.filter(product=>product.name.toLowerCase().includes(searchedItem.toLowerCase()));
                setData1(finalProduct);
                return;
            }
            if (maxValue > 1 && category.length > 0 && searchedItem !== "") {
                const productRef = collection(db, "products");
                const q = query(productRef, where("category", "in", category));
                const querySnapshot = await getDocs(q);
                const filterProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                const finalProducts = filterProducts.filter(product=>product.price<=maxValue && product.name.toLowerCase().includes(searchedItem.toLowerCase()));
                setData1(finalProducts);
                return;
            }
        }
        fetchProducts();
    }, [searchedItem, category, maxValue]);

    const addUser = async (credentials) => {
        await createUserWithEmailAndPassword(auth, credentials.email, credentials.password, credentials.displayName);

    }

    const signinUser = async (credentials) => {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    }

    const signOutUser = async () => {
        await auth.signOut();
        setUser(null);
    }

    const addCartQuantity = async (cartId, newQuantity) => {
        console.log(cartId, newQuantity);
        const cartRef = doc(db, "cart", cartId);
        await updateDoc(cartRef, {
            quantity: newQuantity + 1
        })

    }
    const removeCartQuantity = async (cartId, newQuantity) => {
        if (newQuantity) {
            const cartRef = doc(db, "cart", cartId);
            await updateDoc(cartRef, {
                quantity: newQuantity - 1
            })
        }
    }
    const removeFromCart = async (cartId) => {
        const cartRef = doc(db, "cart", cartId);
        await deleteDoc(cartRef);
    }

    const addCart = async (productId, quantity, userId) => {
        const productRef = doc(db, 'products', productId);
        const cartCollection = collection(db, "cart");
        const cartQuery = query(cartCollection, where("product", "==", productRef),
            where("userId", "==", userId));
        const querySnapshot = await getDocs(cartQuery);
        const isFound = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        if (isFound.length > 0) {
            const docRef = doc(db, "cart", isFound[0].id);
            await updateDoc(docRef, {
                quantity: isFound[0].quantity + quantity
            })
            toast.success("Product count increase");

        } else {
            await addDoc(collection(db, "cart"), {
                product: productRef,
                userId: userId,
                quantity: quantity
            });
            toast.success("Product Added to Cart");
        }
    }

    const createOrder = async (products, tproductPrice) => {

        const productRefs = products.map(product => ({
            productRef: doc(db, "products", product.productId),
            quantity: product.quantity
        }))

        await addDoc(collection(db, "orders"), {
            userId: user.uid,
            products: productRefs,
            totalPrice: tproductPrice,
            orderDate: serverTimestamp(),

        })
        navigate("/order");
        toast.success("order added successfully");
    }

    useEffect(() => {
        const fetchOrder = async () => {
            if (user) {
                const orderCollection = collection(db, "orders");
                const q = query(orderCollection, where("userId", "==", user.uid));
                const orderSnapshot = await getDocs(q);
                let orders = [];
                for (const orderDoc of orderSnapshot.docs) {
                    const orderData = orderDoc.data();
                    const products = [];
                    for (const product of orderData.products) {
                        const productSnapshot = await getDoc(product.productRef);
                        const productData = productSnapshot.data();

                        products.push({
                            id: product.productRef.id,
                            quantity: product.quantity,
                            category: productData.category,
                            image: productData.image,
                            name: productData.name,
                            price: productData.price,

                        })

                    }
                    orders.push({
                        id: orderDoc.id,
                        orderDate: orderData.orderDate.toDate().toLocaleDateString(),
                        products: products,
                        userId: user.uid,
                        totalPrice: orderData.totalPrice
                    })
                }
                setOrder(orders);
            }
        }
        fetchOrder();
    })


    useEffect(() => {
        const fetchCartData = async () => {
            if (user) {
                const cartCollection = collection(db, "cart");
                const userCart = query(cartCollection, where("userId", "==", user.uid));
                const cartSnapshot = await getDocs(userCart);
                const cartItems = [];
                for (const cartDoc of cartSnapshot.docs) {
                    const cartData = cartDoc.data();
                    const productRef = cartData.product;
                    const productDoc = await getDoc(productRef);
                    const productData = productDoc.data();
                    cartItems.push({
                        id: cartDoc.id,
                        productId: productRef.id,
                        category: productData.category,
                        image: productData.image,
                        name: productData.name,
                        price: productData.price,
                        quantity: cartData.quantity,
                        userId: cartData.userId
                    })
                }
                setaddToCart(cartItems);

            }
        }
        fetchCartData();
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                navigate('/');
            } else {
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [user])

    return (
        <AddContext.Provider value={{ setSearchedItem, order, createOrder, addCart, addCartQuantity, removeCartQuantity, removeFromCart, data1, setMaxValue, setCategory, category, addUser, signinUser, user, signOutUser, addToCart }}>
            {children}
        </AddContext.Provider>
    )
}