import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FooterCard from '../FooterCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailCard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: [],
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMovieItem()
  }

  getMovieItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        adult: each.adult,
        backdropPath: each.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        originalLanguage: each.original_language,
        releaseDate: each.release_date,
        count: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
      }))

      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))

      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )
      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        spokenLanguages: updatedLanguagesData,
        similarMovies: updatedSimilarData.slice(0, 6),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTopCard = () => {
    const {movieDetails} = this.state
    const updatedMovieDetails = movieDetails[0]
    const {
      backdropPath,
      title,
      overview,
      runtime,
      releaseDate,
      adult,
    } = updatedMovieDetails
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    return (
      <div
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${backdropPath})`,
          width: '100vw',
        }}
        className="movie-detail-card-full"
      >
        <Header />
        <div className="movie-details-card">
          <h1 className="movie-title">{title}</h1>
          <div className="movie-details-inner-card">
            <p className="runtime-style">
              {hours}h {minutes}m
            </p>
            <p className="UA-Style">{adult ? 'A' : 'U/A'}</p>
            <p className="release-date">{year}</p>
          </div>
          <p className="movie-overview">{overview}</p>
          <button className="movie-play-button">play</button>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const updatedMovieDetails = movieDetails[0]
    const {releaseDate} = updatedMovieDetails
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDay().toString()
    let daySuffix = ''
    if (day.endsWith('1')) {
      daySuffix = 'st'
    } else if (day.endsWith('2')) {
      daySuffix = 'nd'
    } else if (day.endsWith('3')) {
      daySuffix = 'rd'
    } else {
      daySuffix = 'th'
    }
    const finalDate = `${day}${daySuffix} ${month} ${year}`

    return (
      <div className="movies-container">
        {this.renderTopCard()}
        <div className="movie-full-details-container">
          <div className="card">
            <h1 className="Genres-head">Genres</h1>
            <ul className="list-container">
              {genres.map(each => (
                <li className="Genres-items" key={each.id}>
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h1 className="Genres-head">Audio Available</h1>
            <ul className="list-container">
              {spokenLanguages.map(each => (
                <li className="Genres-items" key={each.id}>
                  {each.language}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h1 className="Genres-head">Rating Count</h1>
            <p className="details-item">{updatedMovieDetails.count}</p>
            <h1 className="Genres-head">Rating Average</h1>
            <p className="details-item">{updatedMovieDetails.rating}</p>
          </div>
          <div className="card">
            <h1 className="Genres-head">Budget</h1>
            <p className="details-item">{updatedMovieDetails.budget}</p>
            <h1 className="Genres-head">Release Date</h1>
            <p className="details-item">{updatedMovieDetails.releaseDate}</p>
          </div>
        </div>
        <div>
          <h1 className="more-like-this-head">More like this </h1>
          <ul className="similar-movies-list-container">
            {similarMovies.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id}>
                <li key={each.id}>
                  <img
                    src={each.posterPath}
                    alt={each.title}
                    className="similar-movies-img"
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="loader-container-popular" testid="loader">
        <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <Header />
      <div className="failed-view">
        <img
          className="failed-image"
          src="https://res.cloudinary.com/dug30iszj/image/upload/v1663953471/MovieApp/Popular%20page/Background-Complete_lqujhu.png"
          alt="failure view"
        />
        <p className="failed-heading">Something went wrong. Please try again</p>
        <button className="retry-btn" type="button" onClick={this.getMovieItem}>
          {' '}
          Try Again
        </button>
      </div>
    </>
  )

  renderMovieItems = () => {
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
        <div className="movies-card-bg" testid="movieItem">
          {this.renderMovieItems()}
          <FooterCard />
        </div>
      </>
    )
  }
}

export default MovieDetailCard
