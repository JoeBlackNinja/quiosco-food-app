import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco";
import { useEffect } from "react";
import { formatCurrency } from '../helpers/currencyFormat'

export default function Total() {

    const { 
        order, 
        nameUser, 
        setNameUser, 
        setOrderFinal, 
        total 
    } = useQuiosco();

    const checkForm = () => {
        return order.length === 0 || nameUser === '' || nameUser.length < 3
    }

    useEffect(() => {
        checkForm();
    }, [order])

    return (
        <Layout page='Total'>
            <h1 className="text-4xl font-black">Total</h1>
            <p className="text-2xl my-10">Total a pagar</p>
            
            <form onSubmit={setOrderFinal}>
                <div>
                    <label 
                        htmlFor="nombre"
                        className="block uppercase text-slate-800 font-bold text-xl">
                    Nombre
                    </label>

                    <input
                        id="nombre"
                        type='text'
                        className="bg-gray-200 w-full mt-3 lg:w-1/3
                        p-3 rounded-md"
                        value={nameUser}
                        onChange={(e) => setNameUser(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl"> 
                        Total a pagar: {''} 
                        <span className="font-blod">
                            {formatCurrency(total)}
                        </span>
                    </p>
                </div>

                <div className="mt-5">
                    <input
                        type='submit'
                        className={`${checkForm() ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} 
                        w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value='Confirmar Pedido'
                        disabled={checkForm()}
                        
                    />
                </div>

            </form>

        </Layout>
    )
}