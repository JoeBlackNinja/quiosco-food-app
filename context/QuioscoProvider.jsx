import { useState, useEffect, createContext } from "react";

import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

const axios = require('axios');

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [productUS, setProductUS] = useState({});
    const [modal, setModal] = useState(false);
    const [order,setOrder] = useState([]);
    const [nameUser, setNameUser] = useState('');
    const [total, setTotal] = useState(0);

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
        router.push('/');
    }

    const handleEditOrder = id => {
        const productUpdate = order.filter(product => product.id === id);
        setProductUS(productUpdate[0]);
        setModal(!modal); 
    }

    const handleDeleteElementOrder = id => {
        const productUpdate = order.filter(product => product.id !== id);
        setOrder(productUpdate);
    }

    const setOrderFinal = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/orders', {
                receive:order, name:nameUser, total, date: Date.now().toString()
            });

            //Resetear APP
            setCurrentCategory(categories[0]);
            setOrder([]);
            setNameUser('');
            setTotal(0);

            toast.success('Pedido realizado correctamente');

            setTimeout(() => {
                router.push('/');
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const newTotal = order.reduce((total, product) => 
            (product.price + product.quantity) + total, 0);
            setTotal(newTotal);
    }, [order])
    
    useEffect(() => {
        getCategories();
    },[]);    

    useEffect(() => {
        setCurrentCategory({})
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
            handleEditOrder,
            handleDeleteElementOrder,
            nameUser,
            setNameUser,
            setOrderFinal,
            total

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


