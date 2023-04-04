import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductSearch from './pages/ProductSearch';
import Product from './pages/Product';
import store from './store/index';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Provider } from 'react-redux';

export default function App(){
  return(
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/products' element={<ProductSearch/>} />
          <Route path='/product' element={<Product/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
