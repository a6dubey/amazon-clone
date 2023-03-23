import Navbar from "./Navbar";
import Product from "./Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import commerce from "./library/commerce";
import { useEffect, useState } from "react";
import Checkout from "./Checkout";
import Thankyou from "./Thankyou";

function App() {



  const [productsListByCategory, setProductsListByCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productsList, setProductsList]= useState([]);
  const [orderDetails, setOrderDetails]= useState({});
  const [cart, setCart]= useState([]);

  
  const allProducts=async()=>{
    const response= await commerce.products.list();
    setProductsList(response.data);
    // console.log(response.data)
    
  } 


  const addToCart=async(productId,qty)=>{
    const response= await commerce.cart.add(productId,qty);
    // console.log(response)
    setCart(response)
    
    
  }



  const fetchProductsByCategory = async(category)=>{
    const response = await commerce.products.list({
      category_slug:[category]
    });
    setProductsListByCategory(response.data);
  }

  const allCartItems=async()=>{
    setCart(await commerce.cart.retrieve())
  }


  const removeFromCart=async(productId)=>{
    const response=await commerce.cart.remove(productId)
    // console.log(response)
    setCart(response)
  }

  const fetchCategories = async()=>{
    const response = await commerce.categories.list();
    setCategoryList(response.data);

  }
  
  const setOrder=(order)=>{
    setOrderDetails(order);
  }
 

  useEffect(() => {
    allProducts();
    allCartItems();
    fetchCategories();
  }, []);




  return (
    <Router>
      <div className="App">
        <Navbar cart={cart} categoryList={categoryList}/>

        <Routes>
          <Route
            excat
            path="/"
            element={
              <>
                <div className="banner">
                  <img
                    src="https://m.media-amazon.com/images/I/61Onc4E1-CL._SX3000_.jpg"
                    alt=""
                  />
                </div>
                <Product productsList={productsList} addToCart={addToCart}/>
              </>
            }
          />
          {/* //Route CLosed */}

          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart}/>} />
          <Route exact path="/category/:slug" element={<><div style={{marginBottom:"320px"}}></div>
             <Product productsList={productsListByCategory} fetchProductsByCategory={fetchProductsByCategory} addToCart={addToCart}/></>
          
          } />
          <Route path="/checkout" element={<Checkout cart={cart} setOrder={setOrder}/>} />
          <Route path="/thankyou" element={<Thankyou orderDetails={orderDetails}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
