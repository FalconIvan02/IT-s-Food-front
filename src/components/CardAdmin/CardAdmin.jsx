import { useEffect, useState } from 'react'
import './CardAdmin.css'

function CardAdmin() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((res) => res.json())
            .then((foods) => {
                setData(foods)
            })
    }, [])

    function Delete(e) {
        if (window.confirm('Estas seguro de que quieres borrar este producto?')) {
            if (e.target.matches('button')) {
                const article = e.target.closest('article')
                const id = article.dataset.id

                fetch(`http://localhost:3000/foods/${id}`, {
                    method: 'DELETE'
                }).then((res) => {
                    if (res.ok) {
                        article.remove()
                    }
                })
            }
        }
    }

    return (
        <>
            {data?.map((food) => (
                <article key={food.id} data-id={food.id} className="containerCarta">
                    <div className="rectangleImg">
                        <img className="menu--image" src={food.image} alt={food.title} />
                    </div>
                    <div className="textCardMenu">
                        <div className="textMenu">
                            <h3 className="textCardMenu__title">{food.title}</h3>
                        </div>
                    </div>

                    <button onClick={Delete}>Eliminar</button>
                </article>
            ))}
        </>
    )
}

export default CardAdmin
