import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
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
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      'https://apis.ccbp.in/movies-app/movies/92c2cde7-d740-443d-8929-010b46cb0305'
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

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const {backdropPath} = movieDetails
    const updatedMovieDetails = movieDetails[0]
    return (
      <div className="movies-container">
        <div className="movie-full-details-container">
          <div className="card">
            <h1 className="Genres-head">Genres</h1>
            <ul className="list-container">
              {genres.map(each => (
                <li className="Genres-items" key={each.id}>
                  {each.name}
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
            <h1 className="Genres-head">Rating Average</h1>
            <p className="details-item">{updatedMovieDetails.rating}</p>
          </div>
        </div>
        <div>
          <h1 className="more-like-this-head">More like this </h1>
          <ul className="similar-movies-list-container">
            {similarMovies.map(each => (
              <img
                src={each.posterPath}
                alt={each.title}
                className="similar-movies-img"
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="loader-container-popular">
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
        <div className="movies-card-bg">{this.renderMovieItems()}</div>
      </>
    )
  }
}

export default MovieDetailCard
