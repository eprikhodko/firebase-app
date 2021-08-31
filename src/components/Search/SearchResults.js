import { useContext, useState } from "react"
import AlbumsContext from "../../context/albums"

import { Link } from "react-router-dom"

const SearchResults = ({searchInput: {searchQuery}}) => {

    // console.log("this value was rendered at SearchResults component ", searchQuery )

    const {albumsCollection} = useContext(AlbumsContext)

    // console.log(albumsCollection)

    const filteredAlbums = albumsCollection.filter(albumsCollection => {
        return albumsCollection.albumTitle.toLowerCase().includes(searchQuery.toLowerCase())
    })


    // const checkAlbums = () => {
    //     return albumsCollection.artist.toLowerCase().includes(searchQuery.toLowerCase())
    // }

    // console.log(filteredAlbums)


    const albumComponents = filteredAlbums.map(album => {
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
                <h2 className="heading-recently-added-albums">Search results</h2>
                <div className="container-albums">
                    {albumComponents}
                </div>
            </div>
        </div> 
    )
}

export default SearchResults