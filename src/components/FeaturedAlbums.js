import { useContext } from "react"
import * as ROUTES from "../constants/routes"
import {Link} from "react-router-dom"

import {ReactComponent as IconArrow} from "../icons/arrow-right.svg"

import AlbumsContext from "../context/albums"

import "../styles/FeaturedAlbums.css"

const FeaturedAlbums = () => {

    // const albumsCollection = useContext(AlbumsContext)
    const {albumsCollection} = useContext(AlbumsContext)
    
 
    // console.log(AlbumsContext)
    // console.log("this is albums context", AlbumsContext._currentValue)
    // console.log(AlbumsContext._currentValue.albumsCollection)

    // console.log(albumsCollection)

    // console.log(AlbumsContext._currentValue.setAlbumsCollection)
    


    const albumComponents = albumsCollection.slice(12).map((album, index) => {
        return(
            <Link 
                to={`/albums/${album.albumId}`} 
                key={album.albumId} 
                className="container-albums__link"
            >
                <div className="album-featured">
                        <img
                            className={`album__cover album__cover--featured ${index === 1 && "album__cover--central-album"}`}
                            src={album.albumCover} 
                            alt={album.albumTitle}
                        />

                        <p className={`album-featured__artist ${index === 1 && "album-featured__artist--central"}`}>
                            <span className="album-featured__title">
                            {album.albumTitle}</span> <span className="album-featured__artist">- {album.artist}</span>
                        </p>
                        {/* <p className="album-featured__artist">
                            {album.artist}
                        </p> */}
                </div>
            </Link>
        ) 
    })

    return(
        <div className="container-featured-albums">
            <IconArrow className="arrow flip-horizontally"/>
            <div className="featured-albums">
                {albumComponents}
            </div>
            <IconArrow className="arrow"/>
        </div>
    )
}

export default FeaturedAlbums