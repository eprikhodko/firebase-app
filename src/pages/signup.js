import React, {useEffect, useState, useContext} from "react"
import FirebaseContext from "../context/firebase"
import {Link, useHistory} from "react-router-dom"
import * as ROUTES from "../constants/routes"
// import {doesUsernameExist} from "../services/firebase"
import "../styles/signup.css"

const SignUp = () => {
    // set page title
    useEffect(() => {
        document.title = "Sign up"
    },[])

    const history = useHistory()
    const {firebase} = useContext(FirebaseContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const isInvalid = username ==="" || email === "" || password === "" || password.length < 6

    const handleSignUp = async (event) => {
        event.preventDefault()
            try {
                const createdUser = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)

                    console.log(createdUser.user)
                // redirect user after creating new user
                history.push(ROUTES.HOME)
     
             } catch (error) {
                 setUsername("")
                 setEmail("")
                 setPassword("")
                 setError(error.message)
             }
    }

    const handleUsernameChange = (event) => {
        // return value only matching ("^[a-z0-9]*$")
        // if we will add a space inside of brackets, like this: ("^[a-z0-9 ]*$"), we will be able to include spaces in a string. This is called Regular expressions, check MDN docs for reference
        event.target.value.match("^[a-z0-9]*$")!=null && setUsername(event.target.value.toLowerCase())
    }

    return (
        <div className="container">
            <div className="container-signup">
                {error && <p className="paragraph-error">
                    {error} 
                    <br/>
                    <br/>
                    Please try again.
                </p>}
                <form method="POST" className="container-form" onSubmit={handleSignUp}>
                    <input 
                        aria-label="Enter your username"
                        className="container-signup__input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <input 
                        aria-label="Enter your email address"
                        className="container-signup__input"
                        type="text"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value.toLowerCase())}
                    />
                    <input 
                        aria-label="Enter your password"
                        className="container-signup__input"
                        type="password"
                        placeholder="Password, at least 6 characters"
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