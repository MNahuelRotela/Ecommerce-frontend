import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Importa useParams
import { fetchProductById } from '../redux/features/productsSlice';
import NavBar from '../components/NavBar/NavBar';

function Detail() {
  const { productId } = useParams(); // Obtén el productId de los parámetros de la URL
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (loading) {
    return (
      <section className="text-gray-600 dark:text-gray-400 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">Loading...</h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!selectedProduct) {
    return (
      <section className="text-gray-600 dark:text-gray-400 body-font overflow-hidden">
      <header>
        <NavBar />
      </header>
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">Product not found.</h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Verifica si el producto tiene una marca definida
  const brandName = selectedProduct.Brand ? selectedProduct.Brand.name : 'GENÉRICO';
  const brandImage = selectedProduct.Brand
    ? selectedProduct.Brand.img_url
    : 'https://www.sinmarca.com.ar/wp-content/uploads/2021/11/sinmarca.png';

  return (
    <section className="text-gray-600 dark:text-gray-400 body-font overflow-hidden mt-28 bg-white dark:bg-gray-900">
      <header>
        <NavBar />
      </header>
      <div className="container px-5 py-20 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={selectedProduct.name}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={selectedProduct.img_url}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 dark:text-gray-300 tracking-widest">
              {brandName}
            </h2>
            {/* Muestra la imagen de la marca o la imagen predeterminada */}
            <img
              alt={brandName}
              src={brandImage}
              className="w-40 mt-2"
            />
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {selectedProduct.name}
            </h1>
            <p className="leading-relaxed">{selectedProduct.description}</p>
            <div className="mt-4">
              <div className='flex'>
              <h3 className="text-2xl  line-through  text-gray-400 dark:text-gray-300">${selectedProduct.price}</h3>
              <div className="rounded-lg bg-orange-300 relative ml-4 px-2">
                <h3 className="font-bold text-sm text-white mt-1">{selectedProduct.discountPercentage}% OFF</h3>
              </div>
              </div>
              <div className='flex'>
              <h2 className="title-font font-medium text-4xl text-gray-900 dark:text-gray-200 mt-2">
                ${selectedProduct.finalPrice}
              </h2>
              <button className="flex ml-auto text-white bg-orange-300 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded">
                Agregar al carrito
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;
