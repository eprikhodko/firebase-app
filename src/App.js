import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import * as ROUTES from "./constants/routes"
import "./styles/App.css"

import BasicFileUpload from "./pages/basic-file-upload"

const App = () => {
  
  return(
    <Router>
      <Switch>
        <Route path={ROUTES.BASICFILEUPLOAD} component={BasicFileUpload} />
      </Switch>
    </Router>
  )
}

export default App;
