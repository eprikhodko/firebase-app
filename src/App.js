import {firebase} from "./lib/firebase"
import './App.css'


function App() {

  const handleFileUpload = (event) => {
    // get file object from the file input
    const file = event.target.files[0]
    // get storage reference from firebase
    const firebaseStorageReference = firebase.storage().ref()
    // create file reference
    const fileReference = firebaseStorageReference.child(file.name)
    // upload our file from our form input to the firebase Storage
    fileReference.put(file)
    .then(() => {
      console.log("file was uploaded to Firestorage")
    })
  }

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
