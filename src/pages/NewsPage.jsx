import { useState } from "react";

import NewsList from "../components/NewsList";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function NewsPage({ news }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const categories = [...new Set(news.flatMap((item) => item.categories))];

  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Все" || item.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container section">
      <h1>Новости</h1>

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <p className="results-count">Найдено новостей: {filteredNews.length}</p>

      <NewsList news={filteredNews} />
    </main>
  );
}

export default NewsPage;
