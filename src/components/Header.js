import React, { useContext } from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from "../constants/routes"

import "../styles/Header.css"

const Header = () => {
    const {firebase} = useContext(FirebaseContext)
    // const {user} = useContext(UserContext)
    const currentUser = useContext(UserContext)
    // console.log(currentUser)
    
    return (
        <header>
            <div className="container-header">
                <Link to={ROUTES.HOME} aria-label="Home">
                    
                </Link>
                <div className="container-buttons">
                    {currentUser ? (
                        < >
                             <Link to={ROUTES.HOME}>
                                <button
                                    type="button"
                                    className="container-buttons__button-home"
                                >
                                    Home
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
                        </>
                    ):(
                        < >
                            <Link to={ROUTES.HOME}>
                                <button
                                    type="button"
                                    className="container-buttons__button-home"
                                >
                                    Home
                                </button>
                            </Link>
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