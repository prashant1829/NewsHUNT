import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, publishedAt}=this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <img src={!imageUrl?"https://tse4.mm.bing.net/th?id=OIP.m8OVn7sFXUhknFB1dMWR-gAAAA&pid=Api&P=0&h=180":imageUrl} className="card-img-top" alt="..." style={{height: "10rem"}}/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p class="card-text"><small class="text-body-secondary">By {!author?"unknown":author} on {publishedAt}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
