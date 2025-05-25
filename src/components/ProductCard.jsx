
const ProductCard = ({ producto }) => {
    if (
        !producto ||
        typeof producto !== "object" ||
        !producto.nombre
    ) {
        return null; // No muestra nada si está mal el dato
    }
    const product  = producto
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col p-4">
            <div className="overflow-hidden rounded-lg">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="h-48 w-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
                />
            </div>

            <h3 className="text-gray-900 font-semibold text-lg truncate mt-4">
                {product.nombre}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.descripcion}
            </p>
            <p className="text-purple-600 font-bold text-xl mt-3">
                S/ {product.precio.toFixed(2)}
            </p>

        </div>
    );
}


export default ProductCard;