import React from "react";
import Header from "./Header";
import Products from "./Products";
import "./Layout.css";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import {loadStripe} from '@stripe/stripe-js/pure';
import { url } from "../url";

const Layout = () => {

  const cart = useSelector((state) => state.cart);
  let total = 0;
  const itemsList = useSelector(state => state.cart.itemList);

  
  const startPayment = async ()=>{
    const stripe = await loadStripe('pk_test_51P1MHJSDhB1jOYqnOf7hbaAZRNAr2jr22HKyPvyAFSgMRt5FjgN7IlBa6elDoXlN9JOznlXqvOOemlGPzf19AVZQ007LJnjZik');

    const body = {
      products:cart.itemList
    }

    console.log("cart in frontend: ", cart.itemList);

    const headers = {
      "Content-Type":"application/json"
    }

    const response = await fetch(`${url}/api/create-checkout`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    })

    const session = await response.json()

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    });

    if(result.error){
      console.log(result.error);
    }

    return; 
  }
  
  itemsList.forEach((item)=>{
    total += item.totalPrice;
  })
  const showCart = useSelector(state => state.cart.showCart);
  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {showCart && <CartItems />}
        <div className="total-price">
          <h3>Total: Rs{total}</h3>
          <button className="orderBtn" onClick={startPayment}>Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
