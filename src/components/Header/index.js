import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {showSearchBox: false, showMenu: false}

  onClickSearchIcon = () => {
    this.setState(prevState => ({showSearchBox: !prevState.showSearchBox}))
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

  render() {
    const {showSearchBox, showMenu} = this.state

    const iconStyle = showSearchBox ? 'icon-button-change' : 'icon-button'

    return (
      <nav className="nav-container">
        <div className="nav-main-card">
          <div className="nav-card-1">
            <img
              src="https://res.cloudinary.com/dnecitokb/image/upload/v1706234912/g5twkokstl4uzxfdrcew.png"
              className="image-logo-header"
              alt="login website logo"
            />
            <ul className="list-items-nav">
              <li className="header-items">Home</li>
              <li className="header-items">Popular</li>
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

              <button type="button" className={iconStyle} testid="searchButton">
                <HiOutlineSearch
                  size={18}
                  color="white"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </div>

            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
              className="profile-img"
              alt="profile"
            />
            <button className="menu-button" onClick={this.displayMenu}>
              <MdMenuOpen size={25} />
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="menu-mobile-container">
            <ul className="nav-mobile-views-list">
              <li className="list-item-mobile-view">Home</li>
              <li className="list-item-mobile-view">Popular</li>
              <li className="list-item-mobile-view">Account</li>
            </ul>
            <button className="close-button" onClick={this.closeMenu}>
              <ImCross size={15} />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
