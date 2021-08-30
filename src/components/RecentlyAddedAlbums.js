import { useContext } from "react"
import * as ROUTES from "../constants/routes"
import {Link} from "react-router-dom"

import AlbumsContext from "../context/albums"

import "../styles/RecentlyAddedAlbums.css"

const RecentlyAddedAlbums = () => {

    const {albumsCollection} = useContext(AlbumsContext)

    const albumComponents = albumsCollection.map(album => {
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
        <div className="container-uploaded-albums-main">
            <div className="container-uploaded-albums">
                <h2 className="heading-recently-added-albums">Recently added albums</h2>
                <div className="container-albums">
                    {albumComponents}
                </div>
            </div>
        </div> 
    )
}

export default RecentlyAddedAlbums