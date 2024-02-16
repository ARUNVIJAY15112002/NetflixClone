import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchCard extends Component {
  state = {
    movieSearchList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  getSearchMovies = async searchIp => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      searchInput: searchIp,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchIp}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        movieSearchList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderNotFound = () => {
    const {searchInput} = this.state
    console.log(searchInput)
    return (
      <div className="search-heading-container">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657092588/Group_7394_jzwy1v.png"
          alt="no movies"
          className="search-not-found-image"
        />
        <h1 className="search-not-found-heading">
          Your search for {searchInput} did not find any matches.
        </h1>
      </div>
    )
  }

  renderSuccessView = () => {
    const {movieSearchList} = this.state

    return (
      <>
        {movieSearchList.length > 0 ? (
          <>
            <ul className="search-image-container">
              {movieSearchList.map(x => (
                <Link to={`/movies/${x.id}`} key={x.id} target="blank">
                  <li key={x.id}>
                    <img
                      src={x.posterPath}
                      alt={x.title}
                      className="search-images"
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </>
        ) : (
          this.renderNotFound()
        )}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
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
        onClick={this.getSearchMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchCard = () => {
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
      <div className="bg-searchCard" testid="search">
        <Header getSearchMovies={this.getSearchMovies} />
        {this.renderSearchCard()}
      </div>
    )
  }
}

export default SearchCard
