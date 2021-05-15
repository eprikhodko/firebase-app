import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import * as ROUTES from "./constants/routes"
import "./styles/App.css"

import UserContext from "./context/user"

import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import BasicFileUpload from "./pages/basic-file-upload"
import useAuthListener from "./hooks/useAuthListener"

const App = () => {

  const user = useAuthListener()
  
  return(
    <UserContext.Provider value = {user}>
      <Router>
            <Switch>
              <Route path={ROUTES.HOME} component ={Home} exact />
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGNUP} component={Signup} />
              <Route path={ROUTES.BASIC_FILE_UPLOAD} component={BasicFileUpload} />
            </Switch>
      </Router>
    </UserContext.Provider>
    
  )
}

export default App;
