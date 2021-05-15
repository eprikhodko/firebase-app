import {useState} from "react"
import {firebase} from "../lib/firebase"
import '../styles/App.css'

// if you forgot to import "firebase/firestore" in /lib/firebase.js, you will get an error: firebase.firestore is not a function

const BasicFileUpload = () => {
  const [fileUrl, setFileUrl] = useState(null)

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

  const handleSubmit = (event) => {
    event.preventDefault()
    // create reference to the Firestore database
    const db = firebase.firestore()
    // get username from the input
    const username = event.target.username.value
    ////////////////////////////////////////////////////
    // if username is true (not empty), then console.log(username)
    username && console.log(username)
    ////////////////////////////////////////////////////
    // if username is not empty, then(&& === then) add a new document in collection "users"
    username && db.collection("users").doc(username).set({
      name: username,
      avatar: fileUrl
    })
  }
  
  return (
    <div className="App">
      <p>this is basic file upload to Firebase example</p>

      <form onSubmit={handleSubmit}>
        {/* file upload */}
        <input 
          type="file" 
          onChange={handleFileUpload}
        />

        {/* username input */}
        <input
          type="text"
          name="username"
          placeholder="type in your username"
        />

        <button 
          type="submit"
          >
            Submit
          </button>
      </form>
      

    </div>
  );
}

export default BasicFileUpload
