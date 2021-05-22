import {useContext, useEffect, useState} from "react"
import {firebase} from "../lib/firebase"
import UserContext from "../context/user"

import Header from "../components/Header"

import "../styles/upload.css"

const Upload = () => {
    const [fileUrl, setFileUrl] = useState(null)
    const [albumsCollection, setAlbumsCollection] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [albumInfo, setAlbumInfo] = useState({
      albumTitle: "",
      artist: "",
      year: ""
    })

    const {albumTitle, artist, year} = albumInfo

    // create reference to the Firestore database
    const db = firebase.firestore()

    const currentUser = useContext(UserContext)
    // console.log(currentUser)

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
      // upload file from form input to the firebase Storage
      await fileReference.put(file)
      // after we're uploaded our file to the firebase Storage, we need to get an URL to this file. We will need this fileUrl later, when we will be creating user record with the username and avatar. We need to store this url in the state. 
      const fileUrl = await fileReference.getDownloadURL()
      // save URL in the state
      setFileUrl(fileUrl)
  }

  console.log(fileUrl)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    ////////////////////////////////////////////////////
    // if username is not empty, then(&& === then) add a new document in collection "users"



    // create a new user document in FireStore "users" collection
    albumTitle && await db.collection("albums").add({
        albumTitle: albumTitle,
        artist: artist,
        year: year,
        albumCover: fileUrl,
        uploadedBy: currentUser.uid,
        dateCreated: Date.now(),
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id)
      console.log(docRef)
    })

    // add id to album


    
    setAlbumInfo({
      albumTitle: "",
      artist: "",
      year: ""
    })

    setFileUrl(null)
    albumTitle && setIsSubmitted(true)
      
    // albumTitle && db.collection("albums").doc(albumTitle).set({
    //     name: albumTitle,
    //     albumCover: fileUrl
    // })

    fileUrl && console.log("file uploaded")

    
    
  }

  

  useEffect(() => {
    const fetchAlbumItems = async() => {
        const albumsCollection = await db.collection("albums").get()
        setAlbumsCollection(albumsCollection.docs.map(doc => {
            return doc.data()
        }))
    }

    fetchAlbumItems()

  },[isSubmitted])

  console.log(isSubmitted)

  const handleChange = (event) => {
    const {name, value} = event.target
    setAlbumInfo({
      ...albumInfo,
      [name]: value
    })
  }

  console.log(albumTitle)
  console.log(artist)
  console.log(albumInfo.year)

//   console.log(albumsCollection)
  
  
  return (
    <div>
        <Header />
        <div className="container-upload-main">
            <div className="container-upload">
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
                        name="addToMyCollection"
                        className="form-upload__input-checkbox"
                      />
                    add this album to my collection
                  </label>

                    <button 
                      type="submit"
                      className="form-upload__btn-upload"
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
