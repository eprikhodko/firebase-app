import {useEffect, useState, useContext} from "react"
import {useParams} from "react-router-dom"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"

import Header from "../components/Header"

import "../styles/AlbumDetails.css"

const AlbumDetails = () => {

    const currentUser = useContext(UserContext)
    // const currentUser = null

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
    const {albumCover, artist, year, albumTitle, albumUsers} = albumData

    const [isInCollection, setIsInCollection] = useState(false)

    const [albumIdInUserAlbumRelCollection, setAlbumIdInUserAlbumRelCollection] = useState(null)

    useEffect(() => {
        const fetchAlbumData = async() => {
            const album = await db.collection("albums").doc(albumId).get()
            setAlbumData(album.data())

            // proceed this step only if user is logged in. currentUser is true? then setIsIncollection()
            // currentUser && setIsInCollection(album.data().albumUsers.includes(currentUser.uid))
            // console.log(album.data().albumUsers.includes(currentUser.uid))
        }
    
        fetchAlbumData()

        const fetchQuerySnapshot = async() => {
            const snapshot = await albumsRef.where("albumId", "==", albumId).where("userId", "==", currentUser.uid)
            .get()
            if (snapshot.empty) {
                console.log('No matching documents.')
                return;
              }  
              
            snapshot.docs.map(doc => {
                console.log(doc.data().userId)
                setAlbumIdInUserAlbumRelCollection(doc.id)
                console.log(albumIdInUserAlbumRelCollection)
                console.log(doc.id)
                return currentUser && setIsInCollection(doc.data().userId)
            })

            // snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data())
            // console.log(doc.data().userId)
            // })
           

        }
    
        fetchQuerySnapshot()

        console.log(isInCollection)

    },[])
    
    // console.log(albumUsers) 
    // console.log(currentUser.uid)
    // console.log(`album is in collection: ${isInCollection}`)

    // console.log(albumUsers.includes(currentUser.uid))

    // looks like I can also perform a separate query to the firestore and check if user id is in albumUsers field.

    // const isAlbumInUserCollection = albumUsers.includes(currentUser.uid)
    // console.log(isAlbumInUserCollection)


    const handleAddToCollection = async() => {
        const res = await db.collection("user-album-rel").add({
            albumId: albumId,
            userId: currentUser.uid,
            addedToUserCollection: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('Added document with ID: ', res.id);
        setAlbumIdInUserAlbumRelCollection(res.id)
        setIsInCollection(true)
    }

    const AddToCollection = async() => {
        const album = await db.collection("albums").doc(albumId)
        album.update({albumUsers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)})
        setIsInCollection(true)
    }

    const handleRemoveFromCollection = async() => {

        const res = await db.collection("user-album-rel").doc(albumIdInUserAlbumRelCollection).delete()
        setIsInCollection(false)
        // const albumRef = db.collection("user-album-rel").doc(albumIdInUserAlbumRelCollection)
        // const doc = await albumRef.get();
        // if (!doc.exists) {
        // console.log('No such document!');
        // } else {
        // console.log('Document data:', doc.data());
        // }
    }

    const RemoveFromCollection = async() => {
        const album = await db.collection("albums").doc(albumId)
        album.update({albumUsers: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)})
        setIsInCollection(false)
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
                </div>
            </div>
        </div>
       
    )
}

export default AlbumDetails