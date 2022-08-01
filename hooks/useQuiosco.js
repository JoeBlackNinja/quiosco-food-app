import { useContext } from "react";
import QuioscoProvider from "../context/QuioscoProvider";

const useQuiosco = () => {
    return useContext(QuioscoProvider);
}

export default useQuiosco;