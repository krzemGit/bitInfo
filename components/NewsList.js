import React, { Component } from 'react';
import Fetch from 'isomorphic-unfetch'
// component and source of truth for news section, used stadard fetching instead of getInitialProps because of infinity scroll 

class NewsList extends Component {
    state = {
        newsList: [],
        newsToDisplay: 12
    }

    handleInfinityScroll = (e) => {
        if (window.document.body.offsetHeight === window.scrollY + window.innerHeight) {
            if (this.state.newsToDisplay < 50) {
                this.setState(prevState => {
                    return ({
                        newsToDisplay: prevState.newsToDisplay + 12
                    })
                });
                this.fetchNewData()
            }
        }
    }

    fetchNewData = () => {
        dotenv.config();
        Fetch(`https://cryptocontrol.io/api/v1/public/news?key=${process.env.NEWS_KEY}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    newsList: data.slice(0, this.state.newsToDisplay)
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {

        this.fetchNewData();

        // not the most appropriate infinity scroll for react, but fast and with little code.
        document.addEventListener('scroll', this.handleInfinityScroll)

    }

    componentWillUnmout = () => {

        document.removeEventListener('scroll', this.handleInfinityScroll)

    }



    render() {
        let key = 0

        const { newsList } = this.state;

        return (
            <div className="d-flex flex-wrap justify-content-between news">

                {newsList.length > 0 ? (
                    newsList.map(news => {
                        key++;

                        return (
                            <div key={key} className="card">
                                <img className="card-img-top" src={news.originalImageUrl} alt="Original image inactive" />
                                <div className="card-body">
                                    <h5 className="card-title">{news.title}</h5>
                                    <p className="card-text">{news.description}</p>
                                    <a href={news.url} className="card__btn btn btn-primary" target="_blank">Read full article</a>
                                </div>
                            </div>)

                    })) : (<div className="news__loader">
                        <p className="news__spinner"><i class="fas fa-spinner fa-4x"></i></p>
                        <p className="news__loader-info">loading news...</p>
                    </div>)
                }

            </div>

        )
    }


}

export default NewsList;

