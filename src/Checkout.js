// import Commerce from '@chec/commerce.js';
import { Input } from "@mui/material";
import { wait } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./checkout.css";
import commerce from "./library/commerce";

function Checkout({ cart, setOrder }) {
  const navigate = useNavigate();
    const [firstname,setFirstname]= useState("")
    const [lastname,setLastname]= useState("")
    const [address,setAddress]= useState("")
    const [email,setEmail]= useState("")
    const [city,setCity]= useState("")
    const [zipcode,setZipcode]= useState("")
  const [generatedToken, setToken] = useState({});
  const [countriesList, setCountriesList] = useState([]);
  const [subDivisionList, setSubDivisionList] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [country, setCountry] = useState(null);
  const [subDivision, setSubDivision] = useState(null);
  const [shipping, setShipping] = useState(null);

  const getShippingCOuntries = async (tokenID) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      tokenID
      
    );
    // console.log(tokenID)
   // commerce.services.localeListShippingCountries(tokenID).then((response) => console.log(response));
    // console.log(countries);
    console.log(Object.entries(countries));
    setCountriesList(Object.entries(countries))
  };


  const getShippingSubdivision=async (country) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      country
    );
    setSubDivisionList(Object.entries(subdivisions));
    
    setSubDivision(Object.keys(subdivisions)[0]);
  };


  const getShippingOptions=async(tokenID,c,s)=>{
    const response=await commerce.checkout.getShippingOptions(tokenID, {
        country: c,
        region: s,
      })
      setShipping((response)[0].id)
      setShippingOptions(response)
  }

  useEffect(() => {
    const generateToken = async (cartID) => {
      const token =await commerce.checkout.generateToken(cartID, {
        type: 'cart',
      });
      // console.log(token.id)
      setToken(token);
    
      getShippingCOuntries(token.id)
    };
    generateToken(cart?.id);
  }, [cart]);

  useEffect(()=>{
    if(country){
    getShippingSubdivision(country)}

  },[country])

  useEffect(()=>{
    if(subDivision){
        getShippingOptions(generatedToken ,country,subDivision)}

  },[subDivision])


  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(generatedToken)
    // alert("Please wait while the Order is Processing")
    if(generatedToken){
    const incomingOrder= await  commerce.checkout.capture(generatedToken.id, {
        line_items: generatedToken.line_items,
        customer: {
          firstname: firstname,
          lastname: lastname,
          email: email
        },
        shipping: {
          name: firstname ,
          street: address,
          town_city: city,
          county_state: subDivision,
          postal_zip_code: zipcode,
          country: country
        },
        fulfillment: {
          shipping_method: shipping
        },
        // billing: {
        //   name: 'John Doe',
        //   street: '234 Fake St',
        //   town_city: 'San Francisco',
        //   county_state: 'US-CA',
        //   postal_zip_code: '94103',
        //   country: 'US'
        // },
        payment: {
            gateway: 'test_gateway',
            card: {
              number: '4242424242424242',
              expiry_month: '02',
              expiry_year: '24',
              cvc: '123',
              postal_zip_code: '94107',
            },
          },
        pay_what_you_want: cart.subtotal.raw
      })
      console.log(incomingOrder)
      setOrder(incomingOrder);
      navigate("/thankyou")

    }

  }



  return (
    <div className="checkout_wrap">
      <h2>Shipping Details</h2>

      <form onSubmit={e=>handleSubmit(e)}>
        <div className="checkout_form">
          <div className="checkout_coloumn">
            <label>First Name*</label>
            <Input required name="firstname" value={firstname} onChange={e=>setFirstname(e.target.value)}/>
          </div>

          <div className="checkout_coloumn">
            <label>Last Name*</label>
            <Input required name="lastname" value={lastname} onChange={e=>setLastname(e.target.value)}/>
          </div>

          <div className="checkout_coloumn">
            <label>Address</label>
            <Input required name="address" value={address} onChange={e=>setAddress(e.target.value)}/>
          </div>

          <div className="checkout_coloumn">
            <label>Email*</label>
            <Input required name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>

          <div className="checkout_coloumn">
            <label>City*</label>
            <Input required name="city" value={city} onChange={e=>setCity(e.target.value)}/>
          </div>

          <div className="checkout_coloumn">
            <label>Zipcode</label>
            <Input required name="zipcode" value={zipcode} onChange={e=>setZipcode(e.target.value)}/>
          </div>

          <div className="checkout_coloumn">
            <label>Shipping Country</label>
            <select required name="country" value={country} onChange={e=>setCountry(e.target.value)}>
                {
                    countriesList?.map(country=>{
                        return <option value={country[0]}>{country[1]}</option>

                    })
                }
              
            </select>
          </div>

          <div className="checkout_coloumn">
            <label>State/UT</label>
            <select required value={subDivision} name="subdivision" onChange={e=>setSubDivision(e.target.value)}>
            {
                    subDivisionList?.map(subdivision=>{
                        return <option value={subdivision[0]}>{subdivision[1]}</option>

                    })
                }
            </select>
          </div>


          <div className="checkout_coloumn">
            <label>Shipping Options</label>
            <select required value={shipping} name="shippingoption" onChange={e=>setShipping(e.target.value)}>
            {
                    shippingOptions?.map(item=>{
                        return <option value={item.id}>{item.description} {item.price.formatted_with_symbol}</option>

                    })
                }
            </select>
          </div>

          <div className="checkout_coloumn">
            <label>&nbsp;</label>
            <button>Pay Now</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
