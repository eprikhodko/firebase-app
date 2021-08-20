import {useContext, useEffect, useState} from "react"
import FirebaseContext from "../context/firebase"
import UserContext from "../context/user"

import {Link} from "react-router-dom"

import Header from "../components/Header"
import NavbarUserProfile from "../components/NavbarUserProfile"

const Profile = () => {

    const currentUser = useContext(UserContext)

    const {firebase} = useContext(FirebaseContext)

    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // create reference to the Firestore database
    const db = firebase.firestore()

    // const userRef = db.collection("users").doc(currentUser.uid)
    // const updateUserDate = async() => {
    //     await userRef.update({dateCreated: firebase.firestore.FieldValue.serverTimestamp()})
    // } 
    // updateUserDate()

    useEffect(() => {

        const fetchUserData = async() => {
            try {
                const response = await db.collection("users").doc(currentUser.uid)
                .get()
                setUserData(response.data())
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserData()

    },[])

    console.log(userData.dateCreated)

    return(
        <div>
            <Header />
            <div>this is profile page</div>

            <NavbarUserProfile />
            <div>
                <p>user info:</p>
                <p>{currentUser.displayName}</p>
                <p>joined: {!isLoading && new Date(userData.dateCreated.seconds * 1000).toDateString().slice(4)}</p>
                {/* another way to show date */}
                <p>joined: {!isLoading && new Date(userData.dateCreated.seconds * 1000).toDateString().split(" ").slice(1)
        .join(" ")}</p>
            </div>
        </div>
    )
}

export default Profile