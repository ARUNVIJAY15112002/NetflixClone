import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FooterCard from '../FooterCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
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
    <li key={x.id}>
      <Link to={`/movies/${x.id}`} key={x.id} target="blank">
        <img
          src={x.backdropPath}
          alt={x.title}
          className="popular-image-size"
        />
      </Link>
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

  renderLoadingView = () => (
    <div className="loader-container-popular" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderFailureView = () => (
    <div className="failed-view">
      <img
        className="failed-image"
        src="https://res.cloudinary.com/dug30iszj/image/upload/v1663953471/MovieApp/Popular%20page/Background-Complete_lqujhu.png"
        alt="failure view"
      />
      <p className="failed-heading">Something went wrong. Please try again</p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularCard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="popular-bg-container" testid="popular">
          <Header />
          {this.renderPopularCard()}

          <FooterCard />
        </div>
      </>
    )
  }
}

export default Popular
