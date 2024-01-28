import Cookies from 'js-cookie'
import {Component} from 'react'
import TrendingCard from '../TrendingCard'
import Header from '../Header'
import OrginalsCard from '../OrginalsCard'
import FooterCard from '../FooterCard'

import './index.css'

class Home extends Component {
  state = {cardData: []}

  componentDidMount() {
    this.getUpperCard()
  }

  getUpperCard = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
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
    }
  }

  renderSuccessView = () => {
    const {cardData} = this.state
    const {backdropPath, title, overview} = cardData
    return (
      <>
        <div
          className="image-card"
          alt={title}
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${backdropPath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <div className="home-header-content">
            <h1 className="home-poster-title" key={title}>
              {title}
            </h1>
            <h1 className="home-poster-overview" key={overview}>
              {overview}
            </h1>
            <button className="home-poster-play-btn" type="button">
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {cardData} = this.state

    return (
      <div className="bg-home-container">
        {this.renderSuccessView()}
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
