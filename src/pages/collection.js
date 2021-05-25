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

    const [userData, setUserData] = useState([])
    const [albumsCollection, setAlbumsCollection] = useState([])

    const [albums, setAlbums] = useState([])

    useEffect(() => {

        const fetchUserAlbums = async() => {
            const userAlbums = await db.collection("albums")
            const query = userAlbums.where("usersCollection", "array-contains", "JDGEJL57awNvQNXQkxk3ClbqdMG2").get()

            setAlbums(query)
            
        }

        db.collection("albums").where("usersCollection", "array-contains", currentUser.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        
            console.log(currentUser.uid)
       

        


        const fetchUserData = async() => {
            const user = await db.collection("users").doc(currentUser.uid).get()

            // // update user document
            // const oldUser = await db.collection("users").doc(currentUser.uid)
            // oldUser.update({
            //     albumsInUserCollection: ["album1", "album2"]
            // })

            // const oldUser = await db.collection("users").doc(currentUser.uid)
            // oldUser.update({
            //     albumsInUserCollection: ["AuO9i3l3cfrT1xQfts3k","Do8M2gFdtPrgHZekZ3iz"]
            // })
            
            // console.log(user.data())
            setUserData(user.data())
            // setAlbumData(album.data())
            // console.log(albumsCollection)
            // console.log(albumsCollection.docs)
            // console.log(albumsCollection.docs[0].id)
        }
    
        fetchUserData()

        // fetch all albums that exists in firebase
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

    // console.log(userData)
    // console.log(userData.albumsInUserCollection)

    // console.log(albumsCollection)

    // now we need to find albums we have in the userData.albumsInUserCollection array in the albumsCollection array.


    return(
        <div>
            <Header />
            <div>this is collection of {currentUser.displayName}</div>

        </div>
    )
}

export default Collection