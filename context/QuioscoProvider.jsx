import { useState, useEffect, createContext } from "react";

import { toast } from 'react-toastify';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [productUS, setProductUS] = useState({});
    const [modal, setModal] = useState(false);
    const [order,setOrder] = useState([]);

    const handleSetOrder = ({categoryId, ...product_}) => {
        if(order.some(productState => productState.id === product_.id)){
            //Update quantity
            const orderUpdated = order.map(
                producState => producState.id === product_.id ? 
                product_ : producState
            );
            setOrder(orderUpdated);
            toast.success('Changes saved success');
        } else {
            setOrder([...order, product_]);
            toast.success('Added to order');
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

    const handleEditOrder = id => {
        const productUpdate = order.filter(product => product.id === id);
        setProductUS(productUpdate[0]);
        setModal(!modal); 
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
            handleSetOrder,
            handleEditOrder
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


