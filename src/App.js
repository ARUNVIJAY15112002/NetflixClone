import {Link, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Popular from './components/Popular'
import AccountCard from './components/AccountCard'
import SearchCard from './components/SearchCard'
import Login from './components/Login'
import MovieDetailCard from './components/MovieDetailCard'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={SearchCard} />
    <ProtectedRoute exact path="/Account" component={AccountCard} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailCard} />
    <ProtectedRoute exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App
