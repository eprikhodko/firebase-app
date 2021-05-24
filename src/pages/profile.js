import {useContext} from "react"
import UserContext from "../context/user"

import {Link} from "react-router-dom"

import Header from "../components/Header"

const Profile = () => {

    const currentUser = useContext(UserContext)

    return(
        <div>
            <Header />
            <div>this is profile page</div>
            <Link to={`/collection/${currentUser.displayName}`}>
                <button
                    type="button"
                    className=""
                >
                    My collection
                </button>
            </Link>
        </div>
    )
}

export default Profile