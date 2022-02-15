import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { privateRoutes } from './PrivateRoutes'
import { publicRoutes } from './PublicRoutes'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        {publicRoutes}
        {privateRoutes}
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  )
}
