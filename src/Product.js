import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import "./product.css";

function Product({ productsList,addToCart,fetchProductsByCategory}) {
  let {slug} = useParams()
  console.log(slug)

  useEffect(()=>{
      if(slug) { fetchProductsByCategory(slug) }
  },[slug])
  return (
    <div className="products_wrap">
      {
      productsList.map((items) => {
        return (
                <div className="product" key={items.id}>
                    <img
                    src={items.image.url}
                    alt=""
                    />
                    <h3>{items.name}</h3>
                    <p>{items.price.formatted_with_symbol}</p>
                    <button onClick={()=>addToCart(items.id,1)}>Add to Cart</button>
                </div>
        );
      })}
    </div>
  );
}

export default Product;
