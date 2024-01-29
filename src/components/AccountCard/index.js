import Header from '../Header'
import FooterCard from '../FooterCard'
import './index.css'

const AccountCard = () => {
  const a = 0
  return (
    <>
      <div className="account-bg-container">
        <Header />

        <div className="account-card">
          <h1 className="account-head">Account</h1>
          <hr className="hr-line-account" />
          <div className="membership-information">
            <p className="membership-head">Membership</p>
            <div className="account-person-details">
              <p className="mail-info">arun@gmail.com</p>
              <p className="password-info">Password:******</p>
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
          <button className="logout-button">Logout</button>
        </div>
      </div>
    </>
  )
}

export default AccountCard
