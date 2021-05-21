import {useEffect, useState, useContext} from "react"
import {useParams} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"

import Header from "../components/Header"

import "../styles/AlbumDetails.css"

const AlbumDetails = () => {

    const currentUser = useContext(UserContext)
    // const currentUser = null

    // const params = useParams()
    // console.log(params)
    // destructure out albumId from params
    const {albumId} = useParams()

    const {firebase} = useContext(FirebaseContext)

     // create reference to the Firestore database
     const db = firebase.firestore()

    // make AJAX call to get the info about the specified album
    // I can either make a call to firebase and get an album with provided Id from firestore, or I can get all collection as an array and find specific album there

    const [albumData, setAlbumData] = useState([])
    const {albumCover, artist, year, albumTitle} = albumData

    useEffect(() => {
        const fetchAlbumData = async() => {
            const album = await db.collection("albums").doc(albumId).get()
            setAlbumData(album.data())
            // console.log(albumsCollection)
            // console.log(albumsCollection.docs)
            // console.log(albumsCollection.docs[0].id)
        }
    
        fetchAlbumData()

      },[])

    return(
        <div>
            <Header />
            <div className="container-album">
                <img 
                    src={albumCover} 
                    alt={albumTitle} 
                    className="container-album__album-cover"
                />
                <div>
                    <p>Album: {albumTitle}</p>
                    <p>Artist: {artist}</p>
                    <p>Year: {year}</p>
                    {currentUser ? (
                        <p>Add to collection</p>
                        ):(
                        <p>Login to add this album to your collection</p>
                    )}
                </div>
            </div>
        </div>
       
    )
}

export default AlbumDetails