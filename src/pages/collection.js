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
    // create references to the Firestore collections
    const albumsDataRef=db.collection("albums")

    const [albumsData, setAlbumsData] = useState([])
    const [albumsIds, setAlbumsIds] = useState([])

    useEffect(() => {
        const fetchAlbumsInUserCollection = async() => {
            // lets fetch albums in user collection
            const snapshot = await db.collection("users").doc(currentUser.uid).collection("albumsInUserCollection")
            .orderBy("dateAdded", "desc")
            .get()

            // const albumsInUserCollection = snapshot.docs.map(doc => {
            //     return doc.data()
            // })

            // console.log(albumsInUserCollection)

            // map through albums and return new array with album ids
            const albumsIdsArray = snapshot.docs.map(doc => {
                return doc.data().albumId
            })

            setAlbumsIds(albumsIdsArray)
            console.log(albumsIdsArray)

            // firestore has query limit for 'in' query, so we need to split our albums ids in chunks of 10 items, and then make a query
            const chunk = 10
            const albumsDataArray = []
            for (let i = 0; i < albumsIdsArray.length; i+= chunk) {
                let temporaryArray = albumsIdsArray.slice(i, i + chunk)
                console.log(temporaryArray)

                const albumsDataSnapshot = await albumsDataRef.where(firebase.firestore.FieldPath.documentId(), 'in', temporaryArray)
                .get()
                console.log(albumsDataSnapshot)

                const mappedAlbums = albumsDataSnapshot.docs.map(doc => {
                    return doc.data()
                })

                albumsDataArray.push(mappedAlbums)

                setAlbumsData(albumsDataArray.flat())
            }
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