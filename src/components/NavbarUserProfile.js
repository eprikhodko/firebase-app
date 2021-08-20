import { useContext } from "react"
import UserContext from "../context/user"

import * as ROUTES from "../constants/routes"
import {Link} from "react-router-dom"

const NavbarUserProfile = () => {

    const currentUser = useContext(UserContext)

    return (
        <div className="navbar-user-profile">
                        <Link to={`/collection/${currentUser.displayName}`}
                            className="container-albums__link"
                        >
                            <p>Collection</p>
                        </Link>

                        <Link 
                            to={ROUTES.UPLOAD} 
                            className="container-albums__link"
                        >
                            <p>Upload new album</p>
                        </Link>

                        <Link to={`/profile/${currentUser.displayName}`}
                            className="container-albums__link"    
                        >
                            <p>Profile</p>
                        </Link>
                    </div>
    )
}

export default NavbarUserProfile