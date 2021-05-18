import {useState, useEffect, useContext} from "react"
import FirebaseContext from "../context/firebase"

import "../styles/UploadedAlbums.css"

const UploadedAlbums = () => {

    const [albumsCollection, setAlbumsCollection] = useState([])

    const {firebase} = useContext(FirebaseContext)

    // create reference to the Firestore database
    const db = firebase.firestore()

    // fetch albums collection from Firestore
     useEffect(() => {
        const fetchAlbumCovers = async() => {
            const albumsCollection = await db.collection("albums").get()
            setAlbumsCollection(albumsCollection.docs.map(doc => {
                return doc.data()
            }))
        }
    
        fetchAlbumCovers()
    
      },[])
    
      console.log(albumsCollection)

    return(
        <div className="container-main">
            <div className="container-albums">
                {albumsCollection.map(album => {
                    return <div 
                                key={album.albumTitle} 
                                className="container-albums__album"
                            >
                                <img 
                                    width="150px"
                                    src={album.albumCover} 
                                    alt={album.albumTitle}
                                />

                                <p>{album.albumTitle}</p>
                                <p>{album.artist}</p>


                        </div>
                })}
            </div>
        </div>
       
    )
}

export default UploadedAlbums