import React, { useContext } from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from "../constants/routes"

import logo from "../img/logo-music-database-theme-dark.png"
import "../styles/Header.css"

const Header = () => {
    const {firebase} = useContext(FirebaseContext)
    // const {user} = useContext(UserContext)
    const currentUser = useContext(UserContext)
    // console.log(currentUser.displayName)
    
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__container-search">
                    <Link to={ROUTES.HOME} aria-label="Home" className="header__link">
                        {/* <img 
                            className="container-header__logo" 
                            src={logo}
                            alt="Music Database logo"
                            width="150px"
                        /> */}
                        <p className="header__logo">MusicDB</p>
                    </Link>

                    <form className="header__form-search" onSubmit={() => console.log("search")}>
                        {/* <label className="label" htmlFor="query">Movie Name</label> */}
                        <input 
                            className="header__input-search" 
                            type="text" 
                            name="query"
                            placeholder="search" 
                            // value={query} 
                            // onChange={handleChange}
                        />
                        {/* <button className="button-search" type="submit">Search</button> */}
                    </form>
                </div>
                
                <div className="header__container-buttons">
                    {currentUser ? (
                        < >
                            <Link to={`/profile/${currentUser.displayName}`}>
                                <button
                                    type="button"
                                    className=""
                                >
                                    Profile
                                </button>
                            </Link>

                            <Link to={ROUTES.UPLOAD}>
                                <button
                                    type="button"
                                    className=""
                                >
                                    Upload
                                </button>
                            </Link>
                             
                            <button 
                                type="button"
                                onClick={() => firebase.auth().signOut()}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        firebase.auth().signOut()
                                    }
                            }}> 
                                Sign Out 
                            </button>

                            {/* <button className="header__btn">Account</button> */}
                        </>
                    ):(
                        < >
                            <Link to={ROUTES.LOGIN}>
                                <button 
                                    type="button"
                                    className="container-buttons__button-login"
                                    >
                                        Log In
                                </button>
                            </Link>
                           
                           <Link to={ROUTES.SIGNUP}>
                                <button 
                                    type="button"
                                    className="container-buttons__button-signup"
                                    >
                                        Sign Up
                                </button>
                           </Link>
                        </>
                    )}
                    
                </div>
            </div>
        </header>
    )
}

export default Header