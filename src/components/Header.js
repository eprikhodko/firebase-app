import React, { useContext } from "react"
import {Link, useHistory} from "react-router-dom"

import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"
import AlbumsContext from "../context/albums"

import * as ROUTES from "../constants/routes"

import logo from "../img/logo-music-database-theme-dark.png"
import "../styles/Header.css"

import SearchBox from "./Search/SearchBox"

const Header = ({searchInput, repeatSearch, nothingIsFound, albums, submit}) => {
    const {firebase} = useContext(FirebaseContext)
    // const {user} = useContext(UserContext)
    const currentUser = useContext(UserContext)
    // console.log(currentUser.displayName)
    const {setAlbumsCollection} = useContext(AlbumsContext)

    const history = useHistory()

    const {submitSearch, setSubmitSearch} = submit || {}    
    const {setSearchQuery} = searchInput || {}
    
    // const handleUpdateAlbumsContext = () => {

    //     const fetchAlbums = async() => {
    //         const albumsCollection = await firebase.firestore().collection("albums")
    //         .orderBy("dateCreated", "desc")
    //         .get()
    //         // for each album document in "albums" collection in fireStore, return album document and add new property of albumId which value equals to document.id
    //        const albums = albumsCollection.docs.map(doc => {
    //             return {...doc.data(), albumId: doc.id}
    //         })
        
    //         setAlbumsCollection(albums)
    //     }
    
    //     fetchAlbums()
    //     console.log("albums context updated")
    // }

    // console.log(value)

    const handleHomeClick = () => {
        console.log("i was clicked by MusicDB word")
        setSubmitSearch("")
        console.log(submitSearch)
        setSearchQuery("")
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__container-search">
                    <Link to={ROUTES.HOME} aria-label="Home" className="header__link" onClick={handleHomeClick}>
                        {/* <img 
                            className="container-header__logo" 
                            src={logo}
                            alt="Music Database logo"
                            width="150px"
                        /> */}
                        <p className="header__logo">MusicDB</p>
                    </Link>

                  <SearchBox searchInput={searchInput} repeatSearch={repeatSearch} nothingIsFound={nothingIsFound} albums={albums} submit={submit}/>

                  {/* <button 
                        type="button"
                        onClick={handleUpdateAlbumsContext}
                        > 
                        Update Context
                  </button> */}

                </div>
                

                <div className="header__container-buttons">
                    {currentUser ? (
                        < >
                            <Link to={`/profile/${currentUser.displayName}`}>
                                <button
                                    type="button"
                                    className=""
                                >
                                    Profile
                                </button>
                            </Link>

                            <Link to={`/collection/${currentUser.displayName}`}>
                                <button
                                    type="button"
                                    className=""
                                >
                                    My Collection
                                </button>
                            </Link>

                            <Link to={ROUTES.UPLOAD}>
                                <button
                                    type="button"
                                    className=""
                                >
                                    Upload
                                </button>
                            </Link>
                             
                            <button 
                                type="button"
                                onClick={() => firebase.auth().signOut()}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        firebase.auth().signOut()
                                    }
                            }}> 
                                Sign Out 
                            </button>

                            {/* <button className="header__btn">Account</button> */}
                        </>
                    ):(
                        < >
                            <Link to={ROUTES.LOGIN}>
                                <button 
                                    type="button"
                                    className="container-buttons__button-login"
                                    >
                                        Log In
                                </button>
                            </Link>
                           
                           <Link to={ROUTES.SIGNUP}>
                                <button 
                                    type="button"
                                    className="container-buttons__button-signup"
                                    >
                                        Sign Up
                                </button>
                           </Link>
                        </>
                    )}
                    
                </div>
            </div>
        </header>
    )
}

export default Header