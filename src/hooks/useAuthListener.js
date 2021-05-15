// this hook is listening for authentication changes
// I decided to store current user in a local storage, so the header don't flicker while firebase is figuring out, is user signed in or not during a firebase.auth().onAuthStateChanged call

import {useState, useEffect, useContext} from "react"
import FirebaseContext from "../context/firebase"

const useAuthListener = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("authUser")))
    const {firebase} = useContext(FirebaseContext)

    useEffect(() => {
    // we make a call to the remote firebase database, and check if user is signed into the firebase. Firebase use Authentication State Persistence for that. Check https://firebase.google.com/docs/auth/web/auth-state-persistence for more info.
      const listener = firebase.auth().onAuthStateChanged(authUser => {
        // if user is authenticated into remote firebase, then let's write this user to the local storage
          if(authUser) {
              localStorage.setItem("authUser", JSON.stringify(authUser))
            // write authUser that we're get from firebase to the currentUser state
              setCurrentUser(authUser)
          } else {
            // if user is not signed in firebase, clean up localStorage and set current user to null
              localStorage.removeItem("authUser")
              setCurrentUser(null)
          }
        })

        // clean up listener
        return() => listener

    }, [firebase])

    return currentUser
}

export default useAuthListener