import {useContext, useEffect, useState} from "react"
// below is a proper import if we don't use FirebaseContext
// import firebase from "firebase/app"
import UserContext from "../context/user"
import FirebaseContext from "../context/firebase"

import Header from "../components/Header"
import NavbarUserProfile from "../components/NavbarUserProfile"

import "../styles/upload.css"

const Upload = () => {

  const {firebase} = useContext(FirebaseContext)

  const [fileUrl, setFileUrl] = useState(null)
  const [fileName, setFileName] = useState("")
  const [albumsCollection, setAlbumsCollection] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [albumInfo, setAlbumInfo] = useState({
    albumTitle: "",
    artist: "",
    year: "",
    addToUserCollection: false
  })

  const {albumTitle, artist, year, addToUserCollection} = albumInfo

  // create reference to the Firestore database
  const db = firebase.firestore()

  const currentUser = useContext(UserContext)

  const isInvalid = albumTitle === "" || artist === "" || year === "" || fileUrl === null

  // https://firebase.google.com/docs/storage/web/create-reference?authuser=0
  // https://firebase.google.com/docs/storage/web/upload-files?authuser=0
  const handleFileUpload = async (event) => {
      // get file object from the file input
      const file = event.target.files[0]
      // create reference to the storage service
      const storage = firebase.storage()
      // create storage reference from our storage service
      const storageRef = storage.ref()
      // create child reference
      const fileReference = storageRef.child(`album-covers/${file.name}`)
      console.log(file.name)
      // upload file from form input to the firebase Storage
      await fileReference.put(file)
      // after we're uploaded our file to the firebase Storage, we need to get an URL to this file. We will need this fileUrl later, when we will be creating user record with the username and avatar. We need to store this url in the state. 
      const fileUrl = await fileReference.getDownloadURL()
      // save URL in the state
      setFileUrl(fileUrl)
      setFileName(file.name)
  }

  console.log(fileUrl)
  console.log("this is filename:", fileName)

  const handleSubmit = async (event) => {
    event.preventDefault()
    // <<-- Create document in Firestore -->>
    // check Add data chapter in Firebase docs
    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-v8_11

    // In some cases, it can be useful to create a document reference with an auto-generated ID, then use the reference later. For this use case, you can call doc():
    // Add a new document with a generated id.
    const newAlbumRef = db.collection("albums").doc()

    // later...
    const createNewAlbum = async() => {
        await newAlbumRef.set(
          {
          albumId: newAlbumRef.id,
          albumTitle: albumTitle,
          artist: artist,
          year: year,
          albumCover: fileUrl,
          albumCoverFileName: fileName,
          uploadedBy: currentUser.uid,
          dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      }
      )
      console.log(newAlbumRef.id)

      // add album to user collection if user checked 'add this album to my collection' checkbox
      addToUserCollection && db.collection("users").doc(currentUser.uid).collection("albumsInUserCollection")
      .add({
        albumId: newAlbumRef.id,
        dateAdded: firebase.firestore.FieldValue.serverTimestamp()
      })
    }

    albumTitle && createNewAlbum()
    
    // clean albumInfo state after we submitted album upload form
    setAlbumInfo({
      albumTitle: "",
      artist: "",
      year: "",
      addToUserCollection: false
    })

    setFileUrl(null)
    albumTitle && setIsSubmitted(true)

    fileUrl && console.log("file uploaded")
  }

  // looks like I made this part to show already uploaded albums to the database. 

  // useEffect(() => {
  //   const fetchAlbumItems = async() => {
  //       const albumsCollection = await db.collection("albums").get()
  //       setAlbumsCollection(albumsCollection.docs.map(doc => {
  //           return doc.data()
  //       }))
  //   }

  //   fetchAlbumItems()

  //   setIsSubmitted(false)

  // },[isSubmitted])

  console.log(isSubmitted)

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    type === "checkbox" ? setAlbumInfo({
      ...albumInfo,
      [name]: checked
    }) 
    :
    setAlbumInfo({
      ...albumInfo,
      [name]: value
    })
  }

  // console.log(albumsCollection)  
  
  return (
    <div>
        <Header />
        <div className="container-upload-main">
            <div className="container-upload">

              <NavbarUserProfile />

                <h2 className="heading-upload-album">Upload album to the database</h2>
                <form onSubmit={handleSubmit} className="form-upload">  
                  <label>
                    Album title
                      <input
                        type="text"
                        name="albumTitle"
                        placeholder="Album title"
                        value={albumTitle}
                        onChange={handleChange}
                      />
                  </label>
                    
                  <label> 
                    Artist
                      <input 
                        type="text"
                        name="artist"
                        placeholder="Artist"
                        value={artist}
                        onChange={handleChange}
                      />
                  </label>
                    
                  <label> 
                    Released
                      <input 
                        type="number"
                        name="year"
                        className="form-upload__input-year"
                        placeholder="Year"
                        value={year}
                        onChange={handleChange}
                      />
                  </label>
                  
                  <label className="form-upload__label-upload-album-image">
                    Upload album image
                      <input 
                          type="file"
                          onChange={handleFileUpload}
                          className="form-upload__input-file-upload"
                      />
                  </label>

                  {fileUrl 
                    && 
                  <img 
                    className="form-upload__image-uploaded-album" 
                    src={fileUrl} 
                    alt="uploaded album"
                  />}

                  {/* <label>Collection</label> */}

                  <label className="form-upload__label-add-to-my-collection">
                      <input
                        type="checkbox"
                        name="addToUserCollection"
                        checked={albumInfo.addToUserCollection}
                        onChange={handleChange}
                        className="form-upload__input-checkbox"
                      />
                    add this album to my collection
                  </label>

                    <button 
                      type="submit"
                      className={`form-upload__btn-upload ${isInvalid && "btn-disabled"}`}
                      disabled={isInvalid}
                    >
                        Upload album to database
                    </button>
                </form>
                
                {/* <div className="container-albums">
                    {albumsCollection.map(album => {
                        return <div 
                                    key={album.albumTitle} 
                                    className="container-albums__album">

                                    <img 
                                        width="150px"
                                        src={album.albumCover} 
                                        alt={album.albumTitle}
                                    />

                                    <p>{album.albumTitle}</p>

                              </div>
                    })}
                </div> */}  
            </div>
        </div>
    </div>
  )
} 

export default Upload
