import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/App.css"

const Home = () => {
    return(
        <div className="home-page-links">
            <Link to={ROUTES.SIGNUP} aria-label="Sign-up">
                <p>Sign-up page</p>
            </Link>
            <Link to={ROUTES.BASICFILEUPLOAD} aria-label="Home">
                <p>Basic file upload example</p>
            </Link>
        </div>  
    )
}

export default Home