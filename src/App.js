import {Component} from 'react'
import {Link, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Popular from './components/Popular'
import AccountCard from './components/AccountCard'
import SearchCard from './components/SearchCard'
import Login from './components/Login'
import MovieDetailCard from './components/MovieDetailCard'
import NotFound from './components/NotFound'
import AccountContext from './context/AccountContext'
import './App.css'

class App extends Component {
  state = {name: '', password: ''}

  getName = value => {
    this.setState({name: value})
  }

  getPassword = value => {
    this.setState({password: value})
  }

  render() {
    const {name, password} = this.state

    return (
      <AccountContext.Provider
        value={{
          name,
          password,
          getPassword: this.getPassword,
          getName: this.getName,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={SearchCard} />
          <ProtectedRoute exact path="/Account" component={AccountCard} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieDetailCard}
          />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </AccountContext.Provider>
    )
  }
}

export default App
