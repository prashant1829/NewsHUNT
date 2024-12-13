import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us', 
    pageSize: 6,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async fetchNews() {
    const { country, category, pageSize } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey&page=${this.state.page}&pageSize=${pageSize}`;
    
    this.setState({ loading: true });
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults,
          loading: false,
        });
      } else {
        console.error("No articles found:", data);
        this.setState({ loading: false, articles: [] });
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false, articles: [] });
    }
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country || prevProps.category !== this.props.category) {
      this.setState({ page: 1 }); 
      this.fetchNews();
    }
  }

  handleNextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchNews);
    }
  };

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.setState((prevState) => ({ page: prevState.page - 1 }), this.fetchNews);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2>News Headlines</h2>
        {this.state.loading && <Loading />}
        <div className="row">
          {!this.state.loading && this.state.articles.length > 0 ? (
            this.state.articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title ? article.title.slice(0, 45) : ''}
                  description={article.description ? article.description.slice(0, 88) : ''}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  publishedAt={article.publishedAt}
                />
              </div>
            ))
          ) : (
            <p>No news available for the selected country/category.</p>
          )}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;









