import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/App.css"

import Header from "../components/Header"
import UploadedAlbums from "../components/UploadedAlbums"

const Home = () => {
    return(
        <div>
            <Header />
            <UploadedAlbums />

            {/* <Link to={ROUTES.BASIC_FILE_UPLOAD} aria-label="Home">
                <p>Basic file upload example</p>
            </Link> */}
        </div>  
    )
}

export default Home