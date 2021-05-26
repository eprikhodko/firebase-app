import {useContext, useState, useEffect} from "react"

import {Link} from "react-router-dom"

import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"


import Header from "../components/Header"

const Collection = () => {

    const {firebase} = useContext(FirebaseContext)
    const currentUser = useContext(UserContext)
    // console.log(currentUser.uid)

    // create reference to the Firestore database
    const db = firebase.firestore()

    // now lets make an AJAX call to firestore and save response to the state

    const [albums, setAlbums] = useState([])

    

    useEffect(() => {
        const fetchUserAlbums = async() => {
            const albumsRef = db.collection("albums")
            const snapshot = await albumsRef.where("albumUsers", "array-contains", currentUser.uid).get()

            setAlbums(snapshot.docs.map(album => {
                return album.data()
            }))    
        }

        fetchUserAlbums()

    },[])

    console.log(albums)  

    return(
        <div>
            <Header />
            <div>this is collection of {currentUser.displayName}</div>
            {albums.map(album => {
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
                    })}
        </div>
    )
}

export default Collection