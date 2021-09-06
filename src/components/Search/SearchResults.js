import { Link } from "react-router-dom"

import NothingFoundOnSearch from "./NothingFoundOnSearch"

const SearchResults = ({searchInput, filtered, submit}) => {

    const {filteredAlbums} = filtered

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
                    {albumComponents.length < 1 ? <NothingFoundOnSearch searchInput={searchInput} submit={submit}/> : albumComponents}
                </div>
            </div>
        </div> 
    )
}

export default SearchResults