import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TrendingCard from '../TrendingCard'
import Header from '../Header'
import OrginalsCard from '../OrginalsCard'
import FooterCard from '../FooterCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {cardData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUpperCard()
  }

  getUpperCard = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      this.setState({cardData: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {cardData} = this.state
    const {backdropPath, title, overview} = cardData
    return (
      <>
        <div
          alt={title}
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${backdropPath})`,
            width: '100vw',
          }}
          className="top-bg-card"
        >
          <Header />
          <div className="home-header-content">
            <h1 className="home-poster-title">{title}</h1>
            <h1 className="home-poster-overview">{overview}</h1>
            <button className="home-poster-play-btn" type="button">
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  renderLoadingViewView = () => (
    <>
      <Header />
      <div className="loading-failure-container-home">
        <div className="loader-container-home" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={48} width={48} />
        </div>
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <Header />
      <div className="loading-failure-container-home">
        <img
          src="https://res.cloudinary.com/dug30iszj/image/upload/v1664109617/MovieApp/Icon_joakz9.png"
          className="warning"
          alt="failure view"
        />
        <p className="failure-para">Something went wrong. Please try again</p>
        <button type="button" className="try-again" onClick={this.getUpperCard}>
          Try Again
        </button>
      </div>
    </>
  )

  renderHomeUpperCard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingViewView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {cardData} = this.state

    return (
      <div className="bg-home-container">
        {this.renderHomeUpperCard()}
        <div className="home-items">
          <div className="movies-card-container">
            <h1 className="trending-heading">Trending Now</h1>
            <TrendingCard />
            <h1 className="trending-heading">Originals</h1>
            <OrginalsCard />
          </div>
          <div>
            <FooterCard />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
