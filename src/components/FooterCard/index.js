import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const FooterCard = () => (
  <div className="footer-container">
    <ul className="social-list">
      <li>
        <FaGoogle className="social-icon" />
      </li>
      <li>
        <FaTwitter className="social-icon" />
      </li>
      <li>
        <FaInstagram className="social-icon" />
      </li>
      <li>
        <FaYoutube className="social-icon" />
      </li>
    </ul>

    <p className="footer-head">Contact us</p>
  </div>
)
export default FooterCard
