import { useState, useEffect, useContext } from "react"
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import * as ROUTES from "./constants/routes"
import "./styles/App.css"

import FirebaseContext from "./context/firebase"
import UserContext from "./context/user"
import AlbumsContext from "./context/albums"

// pages
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import BasicFileUpload from "./pages/basic-file-upload"
import Upload from "./pages/upload"
import AlbumDetails from "./components/AlbumDetails"
import Profile from "./pages/profile"
import UploadedBy from "./pages/uploaded-by"
import Collection from "./pages/collection"
import Search from "./pages/search"
import NotFound from "./pages/not-found"

import useAuthListener from "./hooks/useAuthListener"
// import useAlbums from "./hooks/useAlbums"

const App = () => {

  const {firebase} = useContext(FirebaseContext)

  const [albumsCollection, setAlbumsCollection] = useState([])
  const value = {albumsCollection, setAlbumsCollection}

  // create reference to the Firestore database
  const db = firebase.firestore()

  const currentUser = useAuthListener()
  
  // fetch albums collection from Firestore
  useEffect(() => {
    const fetchAlbums = async() => {
        const albumsCollection = await db.collection("albums")
        .orderBy("dateCreated", "desc")
        .get()
        // for each album document in "albums" collection in fireStore, return album document and add new property of albumId which value equals to document.id
        setAlbumsCollection(albumsCollection.docs.map(doc => {
            return {...doc.data(), albumId: doc.id}
        }))
    }

    fetchAlbums()
  
  },[])

  console.log("albums fetched by App component")

  return(
    <UserContext.Provider value = {currentUser}>
        <AlbumsContext.Provider value = {value}>
          <Router>
              <Switch>
                <Route path={ROUTES.HOME} component ={Home} exact />
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.SIGNUP} component={Signup} />
                <Route path={ROUTES.BASIC_FILE_UPLOAD} component={BasicFileUpload} />
                <Route path={ROUTES.UPLOAD} component={Upload} />
                <Route path={ROUTES.ALBUM_DETAILS} component={AlbumDetails} />
                <Route path={ROUTES.PROFILE} component={Profile} />
                <Route path={ROUTES.COLLECTION} component={Collection} />
                <Route path={ROUTES.UPLOADED_BY} component={UploadedBy} />
                <Route path={ROUTES.SEARCH} component={Search} />
                <Route path={ROUTES.NOT_FOUND} component={NotFound} />
              </Switch>
        </Router>
      </AlbumsContext.Provider>
    </UserContext.Provider>
  )
}

export default App
