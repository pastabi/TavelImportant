export function NewsArea({ news, isLocationSet, isNewsLoading }) {
  return (
    <div className="news-area area-styling">
      <h3>News</h3>

      {isNewsLoading ? (
        <div>
          <p className="no-content loading-news">
            Loading... <br />
            (If it's taking too long, try searching for another location)
          </p>
        </div>
      ) : news && isLocationSet ? (
        <ul className="news-list">
          {news.map((article) => (
            <NewsArticle article={article} key={article.id} />
          ))}
        </ul>
      ) : (
        <p className="no-content">
          To get news for your destination, start entering a location name in the search field, and
          when you see the right one - press "Get" button or "Enter" key
        </p>
      )}
    </div>
  );
}
function NewsArticle({ article }) {
  return (
    <li>
      <h4 className="title">{article.title}</h4>
      <p className="description">{article.description}</p>
      <div className="news-info">
        <span className="news-date">{article.published.split(" ", 1)} </span>
        <span className="source">&bull; Author: {article.author} &bull;</span>
        <a href={article.url}>Read full article</a>
      </div>
    </li>
  );
}
