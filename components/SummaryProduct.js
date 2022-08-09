import Image from "next/image"

import { formatCurrency } from '../helpers/currencyFormat'

const SummaryProduct = ({product}) => {
  return (
    <div className="shadow p-5 mb-3 flex gap-10 items-center">
        <div className="md:w-1/6">
            <Image
                width={300}
                height={400}
                alt={`Image product ${product.name}`}
                src={`/assets/img/${product.image}.jpg`}
            />
        </div>

        <div className="md:w-5/6">
            <p className="text-3xl font-bold">{product.name}</p>
            <p className="text-xl font-bold mt-4">Cantidad:  {product.quantity}</p>
            <p className="text-xl font-bold mt-4 text-amber-500">Precio:  {formatCurrency(product.price)}</p>
            <p className="text-xl font-bold mt-4 text-amber-800">Subtotal:  {formatCurrency(product.price * product.quantity)}</p>
        </div>

    </div>
  )
}

export default SummaryProduct
