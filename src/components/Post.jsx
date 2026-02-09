import React from "react";

const Post = ({ title, author, summary, cover, createdAt, _id, index = 0 }) => {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`card card-side bg-base-100 shadow-sm ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <figure>
        <img src={cover} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          {author.username} | {createdAt}
        </p>
        <p>{summary}</p>
        <div className="card-actions justify-end">
          <a href={"post/" + _id} className="btn btn-primary">
            More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
