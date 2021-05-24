import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import * as ROUTES from "./constants/routes"
import "./styles/App.css"

import UserContext from "./context/user"

// pages
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import BasicFileUpload from "./pages/basic-file-upload"
import Upload from "./pages/upload"
import AlbumDetails from "./components/AlbumDetails"
import Profile from "./pages/profile"

import useAuthListener from "./hooks/useAuthListener"

const App = () => {

  const currentUser = useAuthListener()
  
  return(
    <UserContext.Provider value = {currentUser}>
      <Router>
            <Switch>
              <Route path={ROUTES.HOME} component ={Home} exact />
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGNUP} component={Signup} />
              <Route path={ROUTES.BASIC_FILE_UPLOAD} component={BasicFileUpload} />
              <Route path={ROUTES.UPLOAD} component={Upload} />
              <Route path={`${ROUTES.ALBUMS}/:albumId`} component={AlbumDetails} />
              <Route path={"/profile"} component={Profile} />
            </Switch>
      </Router>
    </UserContext.Provider>
    
  )
}

export default App;
