import { Link, useParams } from "react-router";

function NewsDetailsPage({ news, loading }) {
  const { id } = useParams();

  const currentNews = news.find((item) => item.id === Number(id));

  if (loading && !currentNews) {
    return (
      <main className="container section">
        <p>Загрузка...</p>
      </main>
    );
  }

  if (!currentNews) {
    return (
      <main className="container section">
        <h1>Новость не найдена</h1>

        <Link to="/news" className="button">
          Вернуться к новостям
        </Link>
      </main>
    );
  }

  return (
    <main className="container section">
      <article className="news-details">
        <img
          className="news-details-image"
          src={currentNews.image}
          alt={currentNews.title}
        />

        <div className="news-meta">
          <div className="categories">
            {currentNews.categories?.map((category) => (
              <span className="category" key={category}>
                {category}
              </span>
            ))}
          </div>

          <span className="news-date">
            {currentNews.date ?? "Дата не указана"}
          </span>
        </div>

        <h1>{currentNews.title}</h1>

        <p className="news-full-text">{currentNews.fullText}</p>

        <Link to="/news" className="button secondary-button">
          ← Назад к новостям
        </Link>
      </article>
    </main>
  );
}

export default NewsDetailsPage;
