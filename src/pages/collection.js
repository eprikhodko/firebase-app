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

    useEffect(() => {
        const fetchAlbumsInUserCollection = async() => {
            const userAlbumRecordsSnapshot = await db.collection("user-album-rel").where("userId", "==", currentUser.uid)
            .get()

            const albumsIdsArray = userAlbumRecordsSnapshot.docs.map(doc => {
                return doc.data().albumId
            })

            console.log(albumsIdsArray)

            // const fetchedAlbums = await albumsIdsArray.map(id => {
            //     return db.collection("albums").where("albumId", "==", id)
            //     .get()
            // })


            // console.log(fetchedAlbums)

            const albumsDataArray = []

            for (let i = 0; i < albumsIdsArray.length; i++) {
                const albumRef = db.collection("albums").doc(albumsIdsArray[i])
                const doc = await albumRef.get()
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    albumsDataArray.push(doc.data())
                    console.log('Document data:', doc.data());
                }
            }

            setAlbumsData(albumsDataArray)

            // const albumRef = db.collection("albums").doc("AuO9i3l3cfrT1xQfts3k")
            // const doc = await albumRef.get()
            // if (!doc.exists) {
            //     console.log('No such document!');
            //   } else {
            //     console.log('Document data:', doc.data());
            //   }

            
            


            // const albumsDataSnapshot = await albumsDataRef.where(firebase.firestore.FieldPath.documentId(), 'in', albumIdsArray)
            // .get()

            // setAlbumsData(albumsDataSnapshot.docs.map(doc => {
            //     return doc.data()
            // }))
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