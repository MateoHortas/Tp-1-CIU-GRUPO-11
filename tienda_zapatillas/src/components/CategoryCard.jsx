import "../style/CategoryCard.css";
import { useNavigate } from "react-router-dom"

function CategoryCard({ image, title }) {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log("click")
    navigate(`/productos?categoria=${title}`)
  }
  return (
    <div className="category-card d-flex gap-3" onClick={handleClick} style={{ cursor: "pointer" }}>

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