import { useState } from "react"
import {Link} from "react-router-dom"
import * as ROUTES from "../constants/routes"
import "../styles/App.css"

import Header from "../components/Header"
import RecentlyAddedAlbums from "../components/RecentlyAddedAlbums"
import FeaturedAlbums from "../components/FeaturedAlbums"

const Home = ({searchInput}) => {
    // console.log(searchInput)
    return(
        <div>
            <Header searchInput={searchInput}/>
            <FeaturedAlbums />
            <RecentlyAddedAlbums />

            {/* <Link to={ROUTES.BASIC_FILE_UPLOAD} aria-label="Home">
                <p>Basic file upload example</p>
            </Link> */}
        </div>  
    )
}

export default Home