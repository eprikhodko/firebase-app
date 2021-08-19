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

    const [sortedByDateAddedToUserCollection, setSortedByDateAddedToUserCollection] = useState([])

    useEffect(() => {
        const fetchAlbumsInUserCollection = async() => {
            // lets fetch albums in user collection
            const snapshot = await db.collection("users").doc(currentUser.uid).collection("albumsInUserCollection")
            .orderBy("dateAdded", "asc")
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
            console.log("this initial ids array from user collection", albumsIdsArray)


            // ok, so how this all works? try to describe it. 
            
            // firestore has query limit for 'in' query, so we need to split our albums ids in chunks of 10 items, and then make a query
            const chunk = 10
            const albumsDataArray = []
            for (let i = 0; i < albumsIdsArray.length; i+= chunk) {
                let temporaryArray = albumsIdsArray.slice(i, i + chunk)
                // console.log("this is temporary array", temporaryArray)

                const albumsDataSnapshot = await albumsDataRef.where(firebase.firestore.FieldPath.documentId(), 'in', temporaryArray)
                .get()
                // console.log("this is albums data snapshot", albumsDataSnapshot)
                // albumsDataSnapshot.forEach(doc => {
                //     console.log(doc.data())
                // })

                const mappedAlbums = albumsDataSnapshot.docs.map(doc => {
                    return doc.data()
                })
                // console.log("this is mapped albums", mappedAlbums)

                albumsDataArray.push(mappedAlbums)

               


                const flattenedAlbums = albumsDataArray.flat()
                console.log("this is flattened albums array from firestore", flattenedAlbums )
                console.log("this is albums Ids", albumsIdsArray)

                const sortedAlbums = []
                for (let i = 0; i < albumsIdsArray.length; i++) {
                    const found = flattenedAlbums.find(element => element.albumId === albumsIdsArray[i])
                    // console.log("found", found)
                    // check for 'undefined' values in
                    if (found) sortedAlbums.push(found)
                }

                // console.log("this is sorted albums", sortedAlbums)
                setSortedByDateAddedToUserCollection(sortedAlbums)
                console.log("this is sorted albums", sortedAlbums)

                setAlbumsData(sortedAlbums)
            }
        }

        fetchAlbumsInUserCollection()

    },[])

    // console.log(albumsData)
    const albumIdsFromFirestore = albumsData.map(album => {
        return album.albumId
    })

    console.log("this is ids from firestore", albumIdsFromFirestore)



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
        const albums = albumsData.map(album => {
            return album.year
        })

        const sortedByYear = [...albumsData].sort((a,b) => {
            if (a.year < b.year) return -1
            if (a.year > b.year) return 1
            return 0
        })
        console.log(albumsData)
        console.log(albums)
        console.log(sortedByYear)

        // const testSortArray = [1,5,10,19,undefined,19,19,25,undefined,19,23,19,24,32,45]
        // const testSort = testSortArray.sort((a,b) => a > b ? 1 : -1)
        // console.log(testSortArray)
        
        return setAlbumsData(sortedByYear)
    }

    const handleSortByAddedToCollection = () => {

        setAlbumsData(sortedByDateAddedToUserCollection)

        console.log("sorted by date added to collection")

    }

    return(
        <div>
            <Header />
            <div>this is collection of {currentUser.displayName}</div>

            <div className="container-uploaded-albums-main">
                <div className="container-uploaded-albums">
                    <h2 className="heading-recently-added-albums">Collection</h2>
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