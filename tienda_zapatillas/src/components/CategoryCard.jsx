import "../style/CategoryCard.css";

function CategoryCard({ image, title }) {
  return (
    <div className="category-card d-flex gap-3">

      <img
        src={image}
        alt={title}
        className="category-image"
      />

      <div className="category-overlay">

        <h4>{title}</h4>

      </div>

    </div>
  );
}

export default CategoryCard;