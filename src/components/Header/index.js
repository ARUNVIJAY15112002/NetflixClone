import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

const Header = () => (
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
      <HiOutlineSearch className="search-icon" />
      <img
        src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
        className="profile-img"
        alt="profile"
      />
    </div>
  </nav>
)

export default Header
