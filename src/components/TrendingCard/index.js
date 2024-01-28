import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

class TrendingCard extends Component {
  state = {trendingList: []}

  componentDidMount() {
    this.TrendingData()
  }

  TrendingData = async () => {
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
      const updatedData = data.results.map(x => ({
        id: x.id,
        backdropPath: x.backdrop_path,
        title: x.title,
        overview: x.overview,
        posterPath: x.poster_path,
      }))
      this.setState({trendingList: updatedData})
    }
  }

  showCard = () => {
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div>
        <Slider>
          <h1>hi</h1>
          <h1>hello</h1>
        </Slider>
      </div>
    )
  }

  render() {
    return this.showCard()
  }
}

export default TrendingCard
