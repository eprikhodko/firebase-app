import {useContext, useState, useEffect} from "react"

import {Link} from "react-router-dom"

import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"

import Header from "../components/Header"

import "../styles/collection.css"

const Collection = () => {

    const {firebase} = useContext(FirebaseContext)
    const currentUser = useContext(UserContext)
    // console.log(currentUser.uid)

    // create reference to the Firestore database
    const db = firebase.firestore()

    // now lets make an AJAX call to firestore and save response to the state

    const [albums, setAlbums] = useState([])
    const [albumsCollection, setAlbumsCollection] = useState([])


    

    useEffect(() => {
        const fetchAlbumsInUserCollection = async() => {
            const albumsRef = db.collection("user-album-rel")
            const albumDocRef = db.collection("user-album-rel").doc("JDGEJL57awNvQNXQkxk3ClbqdMG2")
            // const snapshot = await albumsRef.where("albumUsers", "array-contains", currentUser.uid).get()
            // const albumsSnapshot = await albumsRef.where("userId", "==", "JDGEJL57awNvQNXQkxk3ClbqdMG2").get()
            const albumsSnapshot = await albumsRef.where("userId", "==", true).get()


            setAlbums(albumsSnapshot.docs.map(album => {
                return album.data()
            }))  
            
            // console.log(albumsRef)
            console.log(albumsSnapshot.docs)
            // console.log(currentUser.uid)
        }

        fetchAlbumsInUserCollection()

    },[])

      // fetch albums collection from Firestore
      useEffect(() => {
        const fetchAlbums = async() => {
            // const albumsCollection = await db.collection("user-album-rel").get()
            // const docRef = db.collection("users").doc("JDGEJL57awNvQNXQkxk3ClbqdMG2")
            const docRef = db.collection("users").doc(currentUser.uid)
            
            console.log(docRef)
            const albumsCollection = await db.collection("user-album-rel").get()
            albumsCollection.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });

            const albumsQuery = await db.collection("user-album-rel").where("userId", "==", docRef).get()
            console.log(albumsQuery)
            albumsQuery.docs.map(doc => {
                console.log(doc.data())}
                )
    
            // for each album document in "albums" collection in fireStore, return album document
            setAlbumsCollection(albumsCollection.docs.map(doc => {
                return doc.data()
            }))
            console.log(albumsCollection)
            // console.log(albumsCollection.docs)
            // console.log(albumsCollection.docs[0].id)
        }
     
        fetchAlbums()
    
    },[])

    console.log(albumsCollection)

    console.log(albums)  
    

    const albumComponents = albums.map(album => {
        return(
            <Link 
                to={`/albums/${album.albumId}`} 
                key={album.albumId} 
                className="container-albums__link"
            >
                <div 
                    className="container-albums__album"
                >
                    <div>
                        <img
                            className="album__cover"
                            src={album.albumCover} 
                            alt={album.albumTitle}
                        />

                        <p className="album__album-title">
                            {album.albumTitle}
                        </p>
                        <p className="album__album-artist">
                            {album.artist}
                        </p>
                    </div>
                </div>
            </Link>
        ) 
    })

    return(
        <div>
            <Header />
            <div>this is collection of {currentUser.displayName}</div>

            <div className="container-uploaded-albums-main">
                <div className="container-uploaded-albums">
                    <h2 className="heading-recently-added-albums">Collection</h2>
                    <div className="container-albums">
                        {albumComponents}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Collection