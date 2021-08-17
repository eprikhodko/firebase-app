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
            const snapshot = await db.collection("users").doc(currentUser.uid).collection("albumsInUserCollection")
            .orderBy("dateAdded", "desc")
            .get()

            console.log(snapshot)
            const albumsInUserCollection = snapshot.docs.map(doc => {
                return doc.data()
            })

            console.log(albumsInUserCollection)

            const albumsIdsArray = snapshot.docs.map(doc => {
                return doc.data().albumId
            })

            setAlbumsIds(albumsIdsArray)

            console.log(albumsIdsArray)

            // const fetchedAlbums = await albumsIdsArray.map(id => {
            //     return db.collection("albums").where("albumId", "==", id)
            //     .get()
            // })

            // console.log(fetchedAlbums)


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// an old way of retreiving albums collection
            // const albumsDataArray = []

            // for (let i = 0; i < albumsIdsArray.length; i++) {
            //     const albumRef = db.collection("albums").doc(albumsIdsArray[i])
            //     const doc = await albumRef.get()
            //     if (!doc.exists) {
            //         console.log('No such document!');
            //     } else {
            //         albumsDataArray.push(doc.data())
            //         console.log('Document data:', doc.data());
            //     }
            // }

            // setAlbumsData(albumsDataArray)
//////////////////////////////////////////////////////////////////////////////////////////////////////////


            
            
            const chunk = 10
            const albumsDataArray = []
            for (let i = 0; i < albumsIdsArray.length; i+= chunk) {
                let temporary = albumsIdsArray.slice(i, i + chunk)
                console.log(temporary)


                const albumsDataSnapshot = await albumsDataRef.where(firebase.firestore.FieldPath.documentId(), 'in', temporary)
                .get()

                console.log(albumsDataSnapshot)

                const mappedAlbums = albumsDataSnapshot.docs.map(doc => {
                    return doc.data()
                })

                albumsDataArray.push(mappedAlbums)

                // console.log(mappedAlbums)

                // albumsDataArray.push(albumsDataSnapshot)

                console.log(albumsDataArray.flat())

                // setAlbumsData(albumsDataSnapshot.docs.map(doc => {
                //     return doc.data()
                // }))

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