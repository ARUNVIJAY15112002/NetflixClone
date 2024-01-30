import {Link, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import PopularCard from './components/PopularCard'
import AccountCard from './components/AccountCard'
import SearchCard from './components/SearchCard'
import Login from './components/Login'
import MovieDetailCard from './components/MovieDetailCard'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={PopularCard} />
      <ProtectedRoute exact path="/search" component={SearchCard} />
      <ProtectedRoute exact path="/account" component={AccountCard} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetailCard} />
      <ProtectedRoute exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)
export default App
