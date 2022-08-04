import { useState, useEffect, createContext } from "react";
import Category from "../components/Category";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [productUS, setProductUS] = useState({});
    const [modal, setModal] = useState(false);
    const [order,setOrder] = useState([]);

    const handleSetOrder = ({categoryId, image, ...product_}) => {
        if(order.some(productState => productState.id === product_.id)){
            //Update quantity
            const orderUpdated = order.map(
                producState => producState.id === product_.id ? 
                product_ : producState
            );
            setOrder(orderUpdated);
        } else {
            setOrder([...order, product_]);
        }
        setModal(false);
    }

    const handleSetModal = () => {
        setModal(!modal);
    }

    const handleSetProductUS = (product_) => {
        setProductUS(product_);
    }

    const getCategories = async () => {
        const res = await fetch('/api/categories')
        .then(res => res.json());
        setCategories(res);
    }

    const handleClickCategories = id => {
        const category = categories.filter(cat => cat.id === id );
        setCurrentCategory(category[0]);
    }
    
    useEffect(() => {
        getCategories();
    },[]);    

    useEffect(() => {
        setCurrentCategory(categories[0])
    },[categories])

    return(
        <QuioscoContext.Provider
        value={{
            categories,
            currentCategory,
            handleClickCategories,
            productUS,
            handleSetProductUS,
            modal,
            handleSetModal,
            order,
            handleSetOrder
        }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext


