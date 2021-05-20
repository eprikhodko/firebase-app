import {useState, useEffect, useContext} from "react"
import * as ROUTES from "../constants/routes"
import { Link } from "react-router-dom"
import FirebaseContext from "../context/firebase"

import "../styles/UploadedAlbums.css"

const UploadedAlbums = () => {

    const [albumsCollection, setAlbumsCollection] = useState([])
    const [albumsIds, setAlbumsIds] = useState([])

    const {firebase} = useContext(FirebaseContext)

    // create reference to the Firestore database
    const db = firebase.firestore()

    // fetch albums collection from Firestore
     useEffect(() => {
        const fetchAlbums = async() => {
            const albumsCollection = await db.collection("albums").get()
            setAlbumsCollection(albumsCollection.docs.map(doc => {
                return {...doc.data(), albumId: doc.id}
            }))
            // console.log(albumsCollection)
            // console.log(albumsCollection.docs)
            // console.log(albumsCollection.docs[0].id)
            setAlbumsIds(albumsCollection.docs.map(doc => {
                return doc.id
            }))
        }
    
        fetchAlbums()
    
      },[])

    // get albums Ids
    // useEffect(() => {
    //     const fetchAlbumsIds = async() => {
    //         const albumsCollection = await db.collection("albums").get()
    //         // console.log(albumsCollection)
    //         // console.log(albumsCollection.docs)
    //         // console.log(albumsCollection.docs[0].id)
    //         setAlbumsIds(albumsCollection.docs.map(doc => {
    //             return doc.id
    //         }))
    //     }
    
    //     fetchAlbumsIds()
    
    //   },[])
    
      console.log(albumsCollection)
    //   console.log(albumsIds)

    return(
        <div className="container-uploaded-albums-main">
            <div className="container-uploaded-albums">
                <h2 className="heading-uploaded-albums">Recently added albums</h2>
                <div className="container-albums">
                    {albumsCollection.map(album => {
                        return(
                            <Link 
                                to={ROUTES.ALBUM} 
                                key={album.albumTitle} 
                                className="container-albums__link"
                            >
                                <div 
                                    className="container-albums__album"
                                >
                                    <div>
                                        <img
                                            className="album__cover"
                                            // width="150px"
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
            </div>
        </div>
        
       
    )
}

export default UploadedAlbums