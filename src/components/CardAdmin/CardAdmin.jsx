import "../CardNexo/CardNexo.css";
import "../../assets/styles/CardMenu.css";
import { useEffect, useState } from "react";

function CardAdmin() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((foods) => {
        setData(foods);
      });
  }, []);

  function Delete(e) {
    if (window.confirm("Estas seguro de querer borrar esta comida?")) {
      if (e.target.matches("button")) {
        const article = e.target.closest("article");
        const id = article.dataset.id;

        fetch(`http://localhost:3000/foods/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            article.remove();
          }
        });
      }
    }
  }
  return (
    <>
      {data?.map((food) => (
        <article className="containerCarta" data-id={food.id} key={food.id}>
          <div className="rectangleImg">
            <img className="menu--image" src={food.image} alt={food.title} />
          </div>
          <div className="textCardMenu">
            <div className="textMenu">
              <span className="textCardMenu__its">IT'S</span>
              <h3 className="textCardMenu__title">{food.title}</h3>
            </div>
          </div>

          <button onClick={Delete}>Eliminar</button>
        </article>
      ))}
    </>
  );
}

export default CardAdmin;
