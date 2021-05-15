// this hook is listening for authentication changes

import {useState, useEffect, useContext} from "react"
import FirebaseContext from "../context/firebase"

const useAuthListener = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const {firebase} = useContext(FirebaseContext)
    console.log(localStorage)

    useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        

        return() => listener

    }, [firebase])

    return currentUser
}

export default useAuthListener