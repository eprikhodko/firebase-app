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
import NothingFoundOnSearch from "./components/Search/NothingFoundOnSearch"
// import useAlbums from "./hooks/useAlbums"

const App = () => {

  const {firebase} = useContext(FirebaseContext)

  const [albumsCollection, setAlbumsCollection] = useState([])
  const albumsValue = {albumsCollection, setAlbumsCollection}

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


  /////////////////////////  Search section   ////////////////////////////////
  // this is lifted up state from search input component
  const [searchQuery, setSearchQuery] = useState("")
  const searchInput = {searchQuery, setSearchQuery}

  const [nothingFound, setNothingFound] = useState(false)
  const [searchAgain, setSearchAgain] = useState(false)

  const nothingIsFound = {nothingFound, setNothingFound}

  const [submitSearch, setSubmitSearch] = useState("")
  const submit = {submitSearch, setSubmitSearch}

  //    const [isSearchInputEmpty, setIsSearchInputEmpty] = useState(true)
  //    const [isNothingFound, setIsNothingFound] = useState(false)
  
  const albums = {albumsCollection}
   
  // console.log(albums)

  console.log("this is albums collection in App component", albumsCollection)

  const [filteredAlbums, setFilteredAlbums] = useState([])
  // const {albumsCollection} = useContext(AlbumsContext)

  useEffect(() => {

          if (searchQuery) {
            const filteredAlbums = albumsCollection.filter(albumsCollection => {
              return albumsCollection.albumTitle.toLowerCase().includes(searchQuery.toLowerCase())
          })
          setFilteredAlbums(filteredAlbums)
          // setNothingFound(false)
          // setIsSearchInputEmpty(false)
          console.log("this is filtered albums from useEffect", filteredAlbums)
          console.log("this is filtered albums length, ", filteredAlbums.length)
          if (filteredAlbums.length < 1) {
              console.log("nothing found!")
              // setIsNothingFound(true)
              // setNothingFound(true)
          }
          // console.log("is nothing found?", isNothingFound)
          }
          
      


  }, [submitSearch])

  console.log("this is filtered albums in App component", filteredAlbums)
  console.log("this is submitted query from search box:", submitSearch)

  const filtered = {filteredAlbums}

  return(
    <UserContext.Provider value = {currentUser}>
        <AlbumsContext.Provider value = {albumsValue}>
          <Router>
              <Switch>
                {/* <Route path={ROUTES.HOME} component ={Home} exact /> */}
                {/* https://ui.dev/react-router-v5-pass-props-to-components/ */}
                <Route path={ROUTES.HOME} exact>
                  <Home searchInput={searchInput} nothingIsFound={nothingIsFound} albums={albums} submit={submit}/>
                </Route>
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.SIGNUP} component={Signup} />
                <Route path={ROUTES.BASIC_FILE_UPLOAD} component={BasicFileUpload} />
                {/* <Route path={ROUTES.UPLOAD} component={Upload} /> */}
                <Route path={ROUTES.UPLOAD}> 
                  <Upload searchInput={searchInput} />
                </Route>
                <Route path={ROUTES.ALBUM_DETAILS}>
                  <AlbumDetails submit={submit} searchInput={searchInput}/>
                </Route>
                <Route path={ROUTES.PROFILE} component={Profile} />
                <Route path={ROUTES.COLLECTION} component={Collection} />
                <Route path={ROUTES.UPLOADED_BY} component={UploadedBy} />
                <Route path={ROUTES.SEARCH} >
                  <Search searchInput={searchInput} nothingIsFound={nothingIsFound} filtered={filtered} submit={submit}/>
                </Route>
                <Route path={"/nothing-found-on-search"} component={NothingFoundOnSearch}/>
                <Route path={ROUTES.NOT_FOUND} component={NotFound} />
              </Switch>
        </Router>
      </AlbumsContext.Provider>
    </UserContext.Provider>
  )
}

export default App
