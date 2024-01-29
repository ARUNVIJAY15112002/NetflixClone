import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import FooterCard from '../FooterCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularCard extends Component {
  state = {moviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(x => ({
        id: x.id,
        backdropPath: x.backdrop_path,
        title: x.title,
        overview: x.overview,
        posterPath: x.poster_path,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        moviesList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  displayMovies = x => (
    <li>
      <img src={x.backdropPath} alt={x.title} className="popular-image-size" />
    </li>
  )

  renderSuccessView = () => {
    const {moviesList} = this.state
    return (
      <ul className="popular-list-container">
        {moviesList.map(x => this.displayMovies(x))}
      </ul>
    )
  }

  renderPopularCard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return null
      case apiStatusConstants.failure:
        return null

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="popular-bg-container">
          {this.renderPopularCard()}

          <FooterCard />
        </div>
      </>
    )
  }
}

export default PopularCard
