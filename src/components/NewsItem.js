import React from 'react';
const NewsItem =(props) =>{
    let { title, description, imagearticles, newsarticles, author, date, source } =
      props;
      console.log("--++", imagearticles, newsarticles, author, date, source);
      return (
      <div className="my-3 bckcolor1" >
        <div className="card bckcolor1" >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              imagearticles
                ? imagearticles
                : "https://images.wsj.net/im-463020/social"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title txtcolor">{title}</h5>

            <p className="card-text txtcolor">{description}</p>
            <p className="card-text">
              <small className="text-danger">
                By {author ? author : "Unknown"} On{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsarticles}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    ); 
}

export default NewsItem;
