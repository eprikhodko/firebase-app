import React, { useContext } from "react"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from "../constants/routes"

import "../styles/Header.css"

const Header = () => {
    const {firebase} = useContext(FirebaseContext)
    // const {user} = useContext(UserContext)
    const user = null

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
                                }}
                            />

                            <Link to={`/p/${user.displayName}`} className="link-profile">
                                <img
                                    className="avatar-header"
                                    src={`/images/avatars/${user.displayName}.jpg`}
                                    alt={`${user.displayName} profile avatar`}
                                />
                            </Link>
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