import { useState } from "react";
import { Route, Routes } from "react-router";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import AddNewsPage from "./pages/AddNewsPage";

import { initialNews } from "./data/news";

function App() {
  const [news, setNews] = useState(initialNews);

  function addNews(newNews) {
    setNews((previousNews) => [newNews, ...previousNews]);
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage news={news} />} />
        <Route path="/news" element={<NewsPage news={news} />} />
        <Route path="/news/:id" element={<NewsDetailsPage news={news} />} />
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
