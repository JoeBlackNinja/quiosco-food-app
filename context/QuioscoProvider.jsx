import { useState, useEffect, createContext } from "react";
import Category from "../components/Category";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});

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
            handleClickCategories
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


