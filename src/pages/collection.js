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
    const [albumsData, setAlbumsData] = useState([])


    useEffect(() => {
        const fetchAlbumsInUserCollection = async() => {
            const albumsRef = db.collection("user-album-rel")
            const snapshot = await albumsRef.where("userId", "==", currentUser.uid)
            .get()

            const array = snapshot.docs.map(doc => {
                return doc.data().albumId
            })

            const albumsDataRef=db.collection("albums")

            const albumsDataSnapshot = await albumsDataRef.where(firebase.firestore.FieldPath.documentId(), 'in', array)
                .get()

            setAlbumsData(albumsDataSnapshot.docs.map(doc => {
                return doc.data()
            }))
        }

        fetchAlbumsInUserCollection()
       
    },[])

    console.log(albumsData)

    const albumComponents = albumsData.map(album => {
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