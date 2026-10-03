import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import AddNewsPage from "./pages/AddNewsPage";

import { initialNews } from "./data/news";
import { getNews } from "./api/newsApi";

function App() {
  const [news, setNews] = useState(initialNews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const apiNews = await getNews();

        if (!ignore) {
          setNews((previousNews) => [...previousNews, ...apiNews]);

          setIsLoaded(true);
        }
      } catch (error) {
        if (!ignore) setError(error.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadNews();

    return () => {
      ignore = true;
    };
  }, []);

  function addNews(newNews) {
    setNews((previousNews) => [newNews, ...previousNews]);
  }

  function deleteNews(id) {
    setNews((previousNews) => previousNews.filter((item) => item.id !== id));
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage news={news} />} />

        <Route
          path="/news"
          element={
            <NewsPage
              news={news}
              loading={loading}
              error={error}
              isLoaded={isLoaded}
            />
          }
        />

        <Route
          path="/news/:id"
          element={
            <NewsDetailsPage
              news={news}
              loading={loading}
              onDeleteNews={deleteNews}
            />
          }
        />

        <Route path="/add-news" element={<AddNewsPage onAddNews={addNews} />} />

        <Route
          path="*"
          element={
            <main className="container section">
              <h1>404</h1>
              <p>Страница не найдена.</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
