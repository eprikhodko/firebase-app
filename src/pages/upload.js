import {useContext, useState} from "react"
import {firebase} from "../lib/firebase"

import UserContext from "../context/user"

import Header from "../components/Header"

const Upload = () => {
    const [fileUrl, setFileUrl] = useState(null)
    const [albumTitle, setAlbumTitle] = useState("")

    const currentUser = useContext(UserContext)
    console.log(currentUser)

  // https://firebase.google.com/docs/storage/web/create-reference?authuser=0
  // https://firebase.google.com/docs/storage/web/upload-files?authuser=0
  const handleFileUpload = async (event) => {
      // get file object from the file input
      const file = event.target.files[0]
      // create reference to the storage service, which is used to create references in your storage bucket
      const storage = firebase.storage()
      // create storage reference from our storage service
      const storageRef = storage.ref()
      // create child reference
      const fileReference = storageRef.child(file.name)
      // upload our file from our form input to the firebase Storage
      await fileReference.put(file)
      // after we're uploaded our file to the firebase Storage, we need to get an URL to this file. We will need this fileUrl later, when we will be creating user record with the username and avatar. We need to store this url in the state. 
      const fileUrl = await fileReference.getDownloadURL()
      // save URL in the state
      setFileUrl(fileUrl)
  }

  console.log(fileUrl)

  const handleSubmit = async (event) => {
    event.preventDefault()
    // create reference to the Firestore database
    const db = firebase.firestore()
    ////////////////////////////////////////////////////
    // if username is not empty, then(&& === then) add a new document in collection "users"



    // create a new user document in FireStore "users" collection
    albumTitle && await db.collection("albums").add({
        albumTitle: albumTitle,
        albumCover: fileUrl,
        uploadedBy: currentUser.uid,
        dateCreated: Date.now()
    })

    
    setAlbumTitle("")
      
    // albumTitle && db.collection("albums").doc(albumTitle).set({
    //     name: albumTitle,
    //     albumCover: fileUrl
    // })

    albumTitle && console.log("file uploaded")
    
  }
  
  return (
    <div>
        <Header />
        <p>this is basic file upload to FireStorage example</p>

        <form onSubmit={handleSubmit}>
            {/* file upload */}
            <input 
            type="file" 
            onChange={handleFileUpload}
            />

            {/* username input */}
            <input
            type="text"
            name="Album title"
            placeholder="Album title"
            onChange={(event) => setAlbumTitle(event.target.value)}
            />

            <button 
            type="submit"
            >
                Upload
            </button>
        </form>

    </div>
  )
} 

export default Upload