import { useContext, useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from "../constants/routes"

import Header from "../components/Header"
import SearchResults from "../components/Search/SearchResults"

const Search = () => {
    

    return (
        <div>
            <Header />

            <h2>this is search results page</h2>

            <SearchResults />
        </div>
    )
}

export default Search