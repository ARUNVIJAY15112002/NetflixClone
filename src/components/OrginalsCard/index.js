import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingCard extends Component {
  state = {trendingList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.fetchTrendingData()
  }

  fetchTrendingData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
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
      const updatedData = data.results.map(x => ({
        id: x.id,
        backdropPath: x.backdrop_path,
        title: x.title,
        overview: x.overview,
        posterPath: x.poster_path,
      }))
      this.setState({
        trendingList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const {trendingList} = this.state
    return (
      <Slider {...settings} className="slider-container">
        {trendingList.map(eachMovie => (
          <div className="slick-item" key={eachMovie.id}>
            <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
              <img
                className="logo-image"
                src={eachMovie.posterPath}
                alt={eachMovie.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
    )
  }

  renderLoadingViewView = () => (
    <div className="loading-failure-container">
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={48} width={48} />
      </div>
    </div>
  )

  onRetry = () => this.fetchTrendingData()

  renderFailureView = () => (
    <div className="loading-failure-container">
      <img
        src="https://res.cloudinary.com/dug30iszj/image/upload/v1664109617/MovieApp/Icon_joakz9.png"
        className="warning"
        alt="failure view"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button type="button" className="try-again" onClick={this.onRetry}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)

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
}

export default TrendingCard
