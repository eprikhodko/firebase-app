import {useState} from "react"
import {firebase} from "./lib/firebase"
import './App.css'


function App() {
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
  // after we're put our file to the firebase Storage, we need to get a URL to this file.

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  
  return (
    <div className="App">
      hello {" "}

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
          type="button"
          >
            Submit
          </button>
      </form>
      

    </div>
  );
}

export default App;
