import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {showSearchBox: false}

  onClickSearchIcon = () => {
    this.setState(prevState => ({showSearchBox: !prevState.showSearchBox}))
  }

  onChangeSearchInput = e => {
    const {getSearchInput} = this.props
    if (e.key === 'Enter') {
      getSearchInput(e.target.value)
    }
  }

  render() {
    const {showSearchBox} = this.state

    const iconStyle = showSearchBox ? 'icon-button-change' : 'icon-button'

    return (
      <nav className="nav-container">
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
        </div>
      </nav>
    )
  }
}

export default Header
