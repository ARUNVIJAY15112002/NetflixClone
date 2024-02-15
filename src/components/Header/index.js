import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {IoMdCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {showSearchBox: false, showMenu: false}

  componentDidMount() {
    const {match} = this.props
    const {path} = match

    if (path === '/search') {
      this.setState({showSearchBox: true})
    } else {
      this.setState({showSearchBox: false})
    }
  }

  onClickSearchIcon = () => {
    const {getSearchMovies} = this.props
  }

  onChangeSearchInput = e => {
    const {getSearchInput} = this.props
    if (e.key === 'Enter') {
      getSearchInput(e.target.value)
    }
  }

  displayMenu = () => {
    this.setState({showMenu: true})
  }

  closeMenu = () => {
    this.setState({showMenu: false})
  }

  getSearchResult1 = e => {
    const {getSearchResult} = this.props
    e.preventDefault()
    getSearchResult()
  }

  render() {
    const {showSearchBox, showMenu} = this.state
    const {getSearchMovies} = this.props

    const iconStyle = showSearchBox ? 'icon-button-change' : 'icon-button'

    return (
      <nav className="nav-container">
        <div className="nav-main-card">
          <div className="nav-card-1">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dnecitokb/image/upload/v1706234912/g5twkokstl4uzxfdrcew.png"
                className="image-logo-header"
                alt="login website logo"
              />
            </Link>

            <ul className="list-items-nav">
              <Link to="/" target="blank" className="link-style">
                <li className="header-items">Home</li>
              </Link>
              <Link to="/popular" className="link-style">
                <li className="header-items">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="nav-card-2">
            <div className="search-container">
              {showSearchBox && (
                <input
                  type="search"
                  onKeyDown={this.onChangeSearchInput}
                  placeholder="search"
                  className="search"
                />
              )}

              <button className={iconStyle} testid="searchButton" type="button">
                <Link to="/search">
                  <HiOutlineSearch
                    size={18}
                    color="white"
                    testid="searchButton"
                  />
                </Link>
              </button>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
                className="profile-img"
                alt="profile"
              />
            </Link>
            <button className="menu-button" onClick={this.displayMenu}>
              <MdMenuOpen size={25} />
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="menu-mobile-container">
            <ul className="nav-mobile-views-list">
              <Link to="/" className="link-style">
                {' '}
                <li className="list-item-mobile-view">Home</li>
              </Link>
              <Link to="/popular" className="link-style">
                {' '}
                <li className="list-item-mobile-view">Popular</li>
              </Link>
              <Link to="/account" className="link-style">
                {' '}
                <li className="list-item-mobile-view">Account</li>
              </Link>
            </ul>
            <button className="close-button" onClick={this.closeMenu}>
              <IoMdCloseCircle size={25} />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
