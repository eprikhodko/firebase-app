import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/App.css"

const Home = () => {
    return(
        <Link to={ROUTES.BASICFILEUPLOAD} aria-label="Home">
            <p>Basic file upload example</p>
        </Link>
    )
}

export default Home