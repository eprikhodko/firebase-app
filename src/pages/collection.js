import {useContext, useState, useEffect} from "react"

import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"


import Header from "../components/Header"

const Collection = () => {

    const {firebase} = useContext(FirebaseContext)
    const currentUser = useContext(UserContext)
    // console.log(currentUser.uid)
 
    // ok, what next? 
    // next I need to make a call to firestore, and get a user document by Id.
    // lets first create a reference to the firestore

    // create reference to the Firestore database
    const db = firebase.firestore()

    // now lets make an AJAX call to firestore and save response to the state

    const [albums, setAlbums] = useState([])

    useEffect(() => {

        const fetchAlbums = async() => {
            const userAlbums = await db.collection("albums")
            const query = userAlbums.where("usersCollection", "array-contains", "JDGEJL57awNvQNXQkxk3ClbqdMG2").get()

            // setAlbums(query)
            
        }

        const fetchUserAlbums = async() => {
            const albumsRef = db.collection("albums")
            const snapshot = await albumsRef.where("usersCollection", "array-contains", currentUser.uid).get()

            // console.log(snapshot.docs[0].data())
            
        //    console.log(snapshot.docs)

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
                return <div key={album.albumTitle}>
                            {album.albumTitle}
                        </div>
            })}
        </div>
    )
}

export default Collection