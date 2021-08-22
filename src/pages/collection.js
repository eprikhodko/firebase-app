import {useContext, useState, useEffect} from "react"

import * as ROUTES from "../constants/routes"
import {Link} from "react-router-dom"

import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"

import Header from "../components/Header"
import NavbarUserProfile from "../components/NavbarUserProfile"

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

    const [sortedByDateAddedToUserCollection, setSortedByDateAddedToUserCollection] = useState([])

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
            // console.log("this initial ids array from user collection", albumsIdsArray)
            
            // after we got our albums ids from user albums collection, let's fetch albums from "albums" collection with actual albums data.
            // firestore has query limit for 'in' query, so we need to split our albums ids in chunks of 10 items, and then make a query
            const chunk = 10
            const albumsDataArray = []
            for (let i = 0; i < albumsIdsArray.length; i+= chunk) {
                let temporaryArray = albumsIdsArray.slice(i, i + chunk)
                const albumsDataSnapshot = await albumsDataRef.where(firebase.firestore.FieldPath.documentId(), 'in', temporaryArray)
                .get()
                const mappedAlbums = albumsDataSnapshot.docs.map(doc => {
                    return doc.data()
                })
                albumsDataArray.push(mappedAlbums)

                const flattenedAlbums = albumsDataArray.flat()
                // firestore 'where in' query returns a messed up list of album documents, so we need to sort it like it was previously in the user albums collection
                const sortedAlbums = []
                for (let i = 0; i < albumsIdsArray.length; i++) {
                    const found = flattenedAlbums.find(album => album.albumId === albumsIdsArray[i])
                    // if album is NOT undefined, push it to the sortedAlbums array
                    if (found) sortedAlbums.push(found)
                }

                setSortedByDateAddedToUserCollection(sortedAlbums)
                setAlbumsData(sortedAlbums)
            }
        }

        fetchAlbumsInUserCollection()

    },[])


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

    const handleSortByYear = () => {
        const sortedByYear = [...albumsData].sort((a,b) => {
            if (a.year > b.year) return -1
            if (a.year < b.year) return 1
            return 0
        })
        return setAlbumsData(sortedByYear)
    }

    const handleSortByAddedToCollection = () => {
       return setAlbumsData(sortedByDateAddedToUserCollection)
    }

    const handleSortByArtist = () => {
        const sortedByArtist = [...albumsData].sort((a,b) => {
            if (a.artist < b.artist) return -1
            if (a.artist > b.artist) return 1
            return 0
        })
       return setAlbumsData(sortedByArtist)
    }

    const handleSortByAlbumTitle = () => {
        const sortedByAlbumTitle = [...albumsData].sort((a,b) => {
            if (a.albumTitle < b.albumTitle) return -1
            if (a.albumTitle > b.albumTitle) return 1
            return 0
        })
       return setAlbumsData(sortedByAlbumTitle)
    }

    return(
        <div>
            <Header />
           
            <div className="container-uploaded-albums-main">
                <div className="container-uploaded-albums">

                <NavbarUserProfile />

                <h2 className="heading-recently-added-albums">this is collection of {currentUser.displayName}</h2>

                    <div className="sort-albums">
                        <h3>Sort by:</h3>

                        <button 
                                type="button"
                                onClick={handleSortByYear}
                                > 
                                Year
                        </button>

                        <button 
                                type="button"
                                onClick={handleSortByAddedToCollection}
                                > 
                                Added to collection
                        </button>

                        <button 
                                type="button"
                                onClick={handleSortByArtist}
                                > 
                                Artist
                        </button>

                        <button 
                                type="button"
                                onClick={handleSortByAlbumTitle}
                                > 
                                Album Title
                        </button>
                    </div>
                    
                    <div className="container-albums">
                        {albumComponents}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Collection