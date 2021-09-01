import { useContext, useEffect, useState } from "react"
import AlbumsContext from "../../context/albums"

import { Link } from "react-router-dom"

import NothingFoundOnSearch from "./NothingFoundOnSearch"

const SearchResults = ({searchInput}) => {

    const {searchQuery} = searchInput

    // console.log("this value was rendered at SearchResults component ", searchQuery )

    const {albumsCollection} = useContext(AlbumsContext)

    // console.log(searchQuery)

   const [filteredAlbums, setFilteredAlbums] = useState([])
   const [isSearchInputEmpty, setIsSearchInputEmpty] = useState(true)

    useEffect(() => {

        if (searchQuery !== "") {
            const filteredAlbums = albumsCollection.filter(albumsCollection => {
                return albumsCollection.albumTitle.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilteredAlbums(filteredAlbums)
            setIsSearchInputEmpty(false)
            console.log("this is filtered albums from useEffect", filteredAlbums)
        }

  
    }, [])

    // const checkAlbums = () => {
    //     return albumsCollection.artist.toLowerCase().includes(searchQuery.toLowerCase())
    // }

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
                    {/* <div>Sorry, nothing found</div> */}
                    {isSearchInputEmpty ? <NothingFoundOnSearch searchInput={searchInput}/> : albumComponents}
                </div>
            </div>
        </div> 
    )
}

export default SearchResults