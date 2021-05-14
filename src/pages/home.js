import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/App.css"

import Header from "../components/Header"

const Home = () => {
    return(
        <div className="container-home">
            <Header />
            <Link to={ROUTES.SIGNUP} aria-label="Sign-up">
                <p>Sign-up page</p>
            </Link>
            <Link to={ROUTES.BASIC_FILE_UPLOAD} aria-label="Home">
                <p>Basic file upload example</p>
            </Link>
        </div>  
    )
}

export default Home