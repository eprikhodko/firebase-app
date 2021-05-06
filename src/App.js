import {firebase} from "./lib/firebase"
import './App.css'


function App() {

  const handleFileUpload = (event) => {
    // get file object from the file input
    const file = event.target.files[0]
    firebase.storage().ref()
    .child(file.name)
    .put(file)
    .then(() => {
      console.log("file was uploaded to Firestorage")
    })
  }
  
  return (
    <div className="App">
      hello {" "}

      <input 
        type="file" 
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default App;
