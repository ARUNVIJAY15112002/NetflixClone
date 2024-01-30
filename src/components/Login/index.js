import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  getUserName = e => {
    this.setState({username: e.target.value})
  }

  getPassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {username, password} = this.state
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  submitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  renderFormContainer = () => {
    const {errorMsg, showSubmitError} = this.state
    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <h1 className="login-text">Login</h1>
        <div className="input-container">
          <label htmlFor="user-input" className="login-label-style">
            USERNAME
          </label>
          <input
            type="text"
            id="user-input"
            className="login-input-style"
            onChange={this.getUserName}
          />
        </div>
        <div className="input-container">
          <label htmlFor="user-password" className="login-label-style">
            PASSWORD
          </label>
          <input
            type="password"
            id="user-password"
            className="login-input-style"
            onChange={this.getPassword}
          />
        </div>
        {showSubmitError && <p className="error-data">{errorMsg}</p>}
        <button className="Login-button" type="submit">
          Login
        </button>
        <button type="submit" className="sign-in-button">
          Sign in
        </button>
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken === undefined) {
      return (
        <div className="login-container" testid="login">
          <img
            src="https://res.cloudinary.com/dnecitokb/image/upload/v1706234912/g5twkokstl4uzxfdrcew.png"
            className="image-logo"
            alt="login website logo"
          />
          {this.renderFormContainer()}
        </div>
      )
    }
    return <Redirect to="/" />
  }
}

export default Login
