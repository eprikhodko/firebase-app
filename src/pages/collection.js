import {useContext} from "react"
import UserContext from "../context/user"

import Header from "../components/Header"

const Collection = () => {
    const currentUser = useContext(UserContext)

    return(
        <div>
            <Header />
            <div>this is collection of {currentUser.displayName}</div>
        </div>
    )
}

export default Collection