import {useEffect, useState, useContext} from "react"
import {useParams, useHistory} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"

import * as ROUTES from "../constants/routes"

import Header from "../components/Header"

import "../styles/AlbumDetails.css"

const AlbumDetails = () => {

    const currentUser = useContext(UserContext)
    // const currentUser = null

    const history = useHistory()

    const params = useParams()
    // console.log(params)
    // destructure out albumId from params
    const {albumId} = useParams()
    // console.log(albumId)

    const {firebase} = useContext(FirebaseContext)

    // create reference to the Firestore database
    const db = firebase.firestore()
    // create reference to the user-album-rel collection
    const albumsRef = db.collection("user-album-rel")
    
  
      
    // make AJAX call to get the info about the specified album
    // I can either make a call to firebase and get an album with provided Id from firestore, or I can get all collection as an array and find specific album there

    const [albumData, setAlbumData] = useState([])
    const {albumCover, artist, year, albumTitle} = albumData

    const [isInCollection, setIsInCollection] = useState(false)
    const [isAlbumUploadedByCurrentUser, setIsAlbumUploadedByCurrentUser] = useState(false)

    const [albumIdInUserAlbumsCollection, setAlbumIdInUserAlbumsCollection] = useState(null)
    

    useEffect(() => {

        // this function will fetch album data first, then if user is logged in, checkIfAlbumIsInUserCollection() function will run
        const fetchAlbumData = async() => {
            const album = await db.collection("albums").doc(albumId).get()
            setAlbumData(album.data())
        }
    
        fetchAlbumData()

        // this function will run only if user is logged in
        const checkIfAlbumIsInUserCollection = async() => {
            const snapshot = await db.collection("users").doc(currentUser.uid).collection("albumsInUserCollection")
            .where("albumId", "==", albumId)
            .get()
            if (snapshot.empty) {
                console.log('Album is not in user collection.')
                return
              }
         
            snapshot.docs.map(doc => {
                console.log(doc.data())
                console.log(doc.id)
                setAlbumIdInUserAlbumsCollection(doc.id)
                return setIsInCollection(true)
            })
        }

        // run this function only if user is logged in, or it will throw an error, because currentUser.uid will be null
        currentUser && checkIfAlbumIsInUserCollection()

        console.log(isInCollection)

    },[])

    useEffect(() => {
        const checkIfAlbumIsUploadedByCurrentUser = () => {
            
            if (albumData.uploadedBy === currentUser.uid) {
                console.log("albums is uploaded by current user")
                return setIsAlbumUploadedByCurrentUser(true)
            } else {
                console.log("albums is not uploaded by current user")
                return setIsAlbumUploadedByCurrentUser(false)
            }
        }

        checkIfAlbumIsUploadedByCurrentUser()

    },[albumData])

    console.log("album uploaded by current user?", isAlbumUploadedByCurrentUser)

    const handleAddToCollection = async() => {
        const res = await db.collection("users").doc(currentUser.uid).collection("albumsInUserCollection")
        .add({
            albumId: albumId,
            dateAdded: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('Added document with ID: ', res.id);
        setAlbumIdInUserAlbumsCollection(res.id)
        setIsInCollection(true)
    }

    const handleRemoveFromCollection = async() => {
        const res = await db.collection("users").doc(currentUser.uid).collection("albumsInUserCollection").doc(albumIdInUserAlbumsCollection)
        .delete()
        console.log('Removed document with ID:', albumIdInUserAlbumsCollection)
        setIsInCollection(false)
    }

    const handleRemoveFromDatabase = async () => {
        try {
            const res = await db.collection("albums").doc(albumData.albumId).delete()
            console.log("albums was removed from the firestore database")
            history.push(`/uploaded-by/${currentUser.displayName}`)
        } catch (error) {
            console.log(error)
        }
    }

    const albumButtons = 
    // check if album data is loaded. If it is loaded, then proceed to show a paragraph or buttons to add or remove album from collection
    // check if user is logged in
    !currentUser ? <p className="paragraph-notification">Login to add this album to your collection</p>
    // if user is logged in, check if album is in user collection
    : isInCollection
        ? <button
            type="button"
            onClick={handleRemoveFromCollection}
            >
                Remove from collection
            </button> 
        : <button
            type="button"
            onClick={handleAddToCollection}
            >
                Add to collection
            </button>

            

    const albumBtns = () => {
        if (!currentUser) {
            return <p>Login to add this album to your collection</p> 
        }
        if (isInCollection) {
            return <button>Remove from collection</button>
        } else {
            return <button>Add to collection</button>
        }
    }

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
                    {/* YOU CAN ALSO JUST ADD LOADING SKELETON, so you wont see the gap when data is still fetching and add to collection and remove from collection buttons wont flashing */
                    // if current user is logged in, then check if album is in his collection. If user is not logged in, then show him a login link
                    }
                    
                    {albumButtons}
                    {isAlbumUploadedByCurrentUser && 
                    <button
                        type="button"
                        onClick={handleRemoveFromDatabase}
                    >
                        Remove album from database
                    </button> }
                </div>
            </div>
        </div>
       
    )
}

export default AlbumDetails