import React, { useContext } from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from "../constants/routes"

import "../styles/Header.css"

const Header = () => {
    const {firebase} = useContext(FirebaseContext)
    // const {user} = useContext(UserContext)
    const user = useContext(UserContext)
    // const user = firebase.auth().currentUser
    // const user = null
    // console.log(firebase.auth().currentUser)
    firebase.auth().onAuthStateChanged(user => {
            // console.log(user)
        })
    
    

    

    return (
        <header>
            <div className="container-header">
                <div className="container-buttons">
                    {user ? (
                        < >
                            <button 
                                width="22px"
                                type="button"
                                onClick={() => firebase.auth().signOut()}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        firebase.auth().signOut()
                                    }
                            }}> 
                                Sign Out 
                            </button>

                            <Link to={`/p/${user.displayName}`} className="link-profile">
                            
                            </Link>
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