import {useState, useEffect, useContext} from "react"
import * as ROUTES from "../constants/routes"
import {Link} from "react-router-dom"
import FirebaseContext from "../context/firebase"

import {ReactComponent as IconArrow} from "../icons/arrow-right.svg"

import "../styles/FeaturedAlbums.css"

const FeaturedAlbums = () => {
    const [albumsCollection, setAlbumsCollection] = useState([])

    const {firebase} = useContext(FirebaseContext)

    // create reference to the Firestore database
    const db = firebase.firestore()

    // fetch albums collection from Firestore
     useEffect(() => {
        const fetchAlbums = async() => {
            const albumsCollection = await db.collection("albums").get()
            // for each album document in "albums" collection in fireStore, return album document and add new property of albumId which value equals to document.id
            setAlbumsCollection(albumsCollection.docs.map(doc => {
                return {...doc.data(), albumId: doc.id}
            }))
            // console.log(albumsCollection)
            // console.log(albumsCollection.docs)
            // console.log(albumsCollection.docs[0].id)
        }
     
        fetchAlbums()
    
    },[])

    // console.log(albumsCollection.slice(10))

    const albumComponents = albumsCollection.slice(12).map((album, index) => {
        return(
            <Link 
                to={`/albums/${album.albumId}`} 
                key={album.albumId} 
                className="container-albums__link"
            >
                <div className="album-featured">
                        <img
                            className={`album__cover album__cover--featured ${index === 1 && "album__cover--central-album"}`}
                            src={album.albumCover} 
                            alt={album.albumTitle}
                        />

                        <p className={`album-featured__artist ${index === 1 && "album-featured__artist--central"}`}>
                            <span className="album-featured__title">
                            {album.albumTitle}</span> <span className="album-featured__artist">- {album.artist}</span>
                        </p>
                        {/* <p className="album-featured__artist">
                            {album.artist}
                        </p> */}
                </div>
            </Link>
        ) 
    })

    return(
        <div className="container-featured-albums">
            <IconArrow className="arrow flip-horizontally"/>
            <div className="featured-albums">
                {albumComponents}
            </div>
            {/* <div>this is featured albums</div> */}
            <IconArrow className="arrow"/>
        </div>
    )
}

export default FeaturedAlbums