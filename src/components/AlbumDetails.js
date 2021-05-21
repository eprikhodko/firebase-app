import {useParams} from "react-router-dom"

const AlbumDetails = () => {
    // const params = useParams()
    // console.log(params)
    // destructure out albumId from params
    const {albumId} = useParams()
    console.log(albumId)

    // make AJAX call to get the info about the specified album

    return(
        <div>
            hello,this is album details
        </div>
    )
}

export default AlbumDetails