import Cookies from 'js-cookie'
import Header from '../Header'
import FooterCard from '../FooterCard'
import AccountContext from '../../context/AccountContext'

import './index.css'

const AccountCard = props => (
  <AccountContext.Consumer>
    {value => {
      const {name, password} = value
      const pass = password.length
      const finalPassword = '*'.repeat(password.length)

      const logoutAction = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <>
          <div className="account-main-bg">
            <Header />
            <div className="account-bg-container">
              <div className="account-card">
                <h1 className="account-head">Account</h1>
                <hr className="hr-line-account" />
                <div className="membership-information">
                  <p className="membership-head">Member ship</p>
                  <div className="account-person-details">
                    <p className="mail-info">{name}@gmail.com</p>
                    <p className="password-info">Password:{finalPassword}</p>
                  </div>
                </div>
                <hr className="hr-line-account" />
                <div className="plan-details-card">
                  <p className="planDetails">Plan details </p>
                  <div className="plan-information">
                    <p className="plan-type">Premium </p>
                    <p className="plan-clarity">Ultra HD</p>
                  </div>
                </div>
                <hr className="hr-line-account" />
                <button className="logout-button" onClick={logoutAction}>
                  Logout
                </button>
              </div>
              <div className="account-footer-container">
                <FooterCard />
              </div>
            </div>
          </div>
        </>
      )
    }}
  </AccountContext.Consumer>
)

export default AccountCard
