import { useState } from "react";
import { useNavigate } from "react-router";

function AddNewsPage({ onAddNews }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    categories: "",
    shortDescription: "",
    fullText: "",
    image: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newNews = {
      id: Date.now(),
      title: formData.title,

      categories: formData.categories
        .split(",")
        .map((category) => category.trim())
        .filter((category) => category !== ""),

      shortDescription: formData.shortDescription,
      fullText: formData.fullText,
      image:
        formData.image || `https://picsum.photos/seed/${Date.now()}/800/450`,
      date: new Date().toLocaleDateString("ru-RU"),
    };

    onAddNews(newNews);

    navigate("/news");
  }

  return (
    <main className="container section">
      <h1>Добавить новость</h1>

      <form className="news-form" onSubmit={handleSubmit}>
        <label>
          Заголовок
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Категории
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="Например: Наука, Общество"
            required
          />
        </label>

        <label>
          Ссылка на изображение
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <label>
          Краткое описание
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows="3"
            required
          />
        </label>

        <label>
          Полный текст
          <textarea
            name="fullText"
            value={formData.fullText}
            onChange={handleChange}
            rows="8"
            required
          />
        </label>

        <button type="submit" className="button">
          Добавить новость
        </button>
      </form>
    </main>
  );
}

export default AddNewsPage;
