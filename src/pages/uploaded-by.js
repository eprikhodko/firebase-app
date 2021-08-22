import { useState, useContext, useEffect } from "react"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"

import { Link } from "react-router-dom"

import Header from "../components/Header"
import NavbarUserProfile from "../components/NavbarUserProfile"

const UploadedBy = () => {

    const currentUser = useContext(UserContext)
    const {firebase} = useContext(FirebaseContext)

    // create reference to the Firestore database
    const db = firebase.firestore()

    const [albumsData, setAlbumsData] = useState([])

    useEffect(() => {

        const fetchAlbumsUploadedByUser = async () => {
            try {
                const res = await db.collection("albums").where("uploadedBy", '==', currentUser.uid)
                .get()
                const albums = res.docs.map(doc => {
                    return doc.data()
                })
                setAlbumsData(albums)
            } catch (error) {
               console.log(error) 
            }
        }

        fetchAlbumsUploadedByUser()
    }, [])

    const albumComponents = albumsData.map(album => {
        return(
            <Link 
                to={`/albums/${album.albumId}`} 
                key={album.albumId} 
                className="container-albums__link"
            >
                <div 
                    className="container-albums__album"
                >
                    <div>
                        <img
                            className="album__cover"
                            src={album.albumCover} 
                            alt={album.albumTitle}
                        />
                        <p className="album__album-title">
                            {album.albumTitle}
                        </p>
                        <p className="album__album-artist">
                            {album.artist}
                        </p>
                    </div>
                </div>
            </Link>
        ) 
    })

    return(
        <div>
            <Header />
           
            <div className="container-uploaded-albums-main">
                <div className="container-uploaded-albums">

                <NavbarUserProfile />
                <h2 className="heading-recently-added-albums">Your uploads</h2>

        
                    <div className="container-albums">
                        {albumComponents}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadedBy