import React, {useEffect, useState, useContext} from "react"
import FirebaseContext from "../context/firebase"
import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
// import {doesUsernameExist} from "../services/firebase"
import "../styles/signup.css"

const SignUp = () => {
    // set page title
    useEffect(() => {
        document.title = "Sign up - Instagram"
    },[])

    const {firebase} = useContext(FirebaseContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const isInvalid = email === "" || password === "" || password.length < 6

    const handleSignUp = async (event) => {
        event.preventDefault()
            try {
                const createUser = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
     
             } catch (error) {
                 setEmail("")
                 setPassword("")
                 setError(error.message)
             }
    }

    return (
        <div className="container">
            <div className="container-login">
                {error && <p className="paragraph-error">
                    {error} 
                    <br/>
                    <br/>
                    Please try again.
                </p>}
                <form method="POST" className="container-form" onSubmit={handleSignUp}>
                    <input 
                        aria-label="Enter your email address"
                        className="input-login"
                        type="text"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value.toLowerCase())}
                    />
                    <input 
                        aria-label="Enter your password"
                        className="input-login"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button 
                        type="submit"
                        className={`button-login font-bold ${isInvalid && "button-disabled"}`}
                        disabled={isInvalid}
                    >
                        Sign up
                    </button>
                </form>
            </div>
            <div className="container-login container-signup">
                <p>
                    Have an account?{" "}
                    <Link to={ROUTES.LOGIN} className="font-bold link link-signup">
                        Log in
                    </Link>
                </p>
            </div>
        </div> 
    )
}

export default SignUp