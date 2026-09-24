import { Link } from "react-router";
import NewsList from "../components/NewsList";

function HomePage({ news }) {
  const latestNews = news.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>NewsHub</h1>

          <p>
            Учебный новостной портал на React. Здесь публикуются последние
            новости.
          </p>

          <Link to="/news" className="button">
            Смотреть новости
          </Link>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Последние новости</h2>

        <NewsList news={latestNews} />
      </section>
    </>
  );
}

export default HomePage;
