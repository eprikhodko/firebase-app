import { useContext, useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import * as ROUTES from "../constants/routes"

import Header from "../components/Header"
import SearchResults from "../components/Search/SearchResults"

const Search = () => {
    
    const [albumsCollection, setAlbumsCollection] = useState([])

    const {firebase} = useContext(FirebaseContext)

    // create reference to the Firestore database
    const db = firebase.firestore()

    // fetch albums collection from Firestore
     useEffect(() => {
        const fetchAlbums = async() => {
            const albumsCollection = await db.collection("albums")
            .orderBy("dateCreated", "desc")
            .get()
            // for each album document in "albums" collection in fireStore, return album document and add new property of albumId which value equals to document.id
            setAlbumsCollection(albumsCollection.docs.map(doc => {
                return {...doc.data(), albumId: doc.id}
            }))
        }
     
        fetchAlbums()
    
    },[])

    console.log(albumsCollection)


    return (
        <div>
            <Header />

            <h2>this is search results page</h2>

            <SearchResults albums={albumsCollection}/>
        </div>
    )
}

export default Search