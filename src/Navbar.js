import React from 'react'
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Navbar({cart, categoryList}) {
  return (
    <>
    <div className="header">
        <Link to="/">
        <img className="logo" src="https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png" alt="logo"/>
        </Link>
        <div className="header_search">
            <input type="text" placeholder="Search Products"></input>
            <SearchIcon className="searchIcon"/>

        </div>

        <div className="header_nav">
            <div className="header_option">
                <span className="header_optionone">Hii Guest</span>
                <span className="header_optiontwo">Sign In</span>
            </div>
            <div className="header_option">
                <span className="header_optionone">Return</span>
                <span className="header_optiontwo">& Orders</span>
            </div>
            <div className="header_option">
                <span className="header_optionone">Your</span>
                <span className="header_optiontwo">Prime</span>
            </div>

            <div className="header_optionBaseket">
                <Link to="/cart">
                <ShoppingCartIcon />
                <span>{cart.total_items}</span></Link>
            </div>

        </div>
    </div>

    <div className="header_bottom">
        <ul>
            {/* {
                categoryList?.map(category=>{
                    return <li key={category.id}>
                        <Link to={'/category/${category.slug}'} >
                        {category.name}</Link></li>
                })
            } */}
            {
                        categoryList?.map(category=>{
                            return <li key={category.id}>
                                <Link to={`/category/${category.slug}`}>
                                {category.name}
                                </Link>
                                </li>
                        })
                    }
            <li>
                <img src="https://m.media-amazon.com/images/G/31/IN-hq/2021/img/Mobile_Traffic_/XCM_Manual_1321458_1651511_IN_3781247_400x39_en_IN._CB655944656_.jpg" className="amznlogo" alt=""/>
            </li>

        </ul>
    </div>
    </>
  )
}

export default Navbar