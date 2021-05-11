import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import * as ROUTES from "./constants/routes"
import "./styles/App.css"

import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import BasicFileUpload from "./pages/basic-file-upload"

const App = () => {
  
  return(
    <Router>
      <Switch>
        <Route path={ROUTES.HOME} component ={Home} exact />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.SIGNUP} component={Signup} />
        <Route path={ROUTES.BASIC_FILE_UPLOAD} component={BasicFileUpload} />
      </Switch>
    </Router>
  )
}

export default App;
