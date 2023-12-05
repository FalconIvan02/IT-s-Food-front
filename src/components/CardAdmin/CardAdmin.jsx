import { useEffect, useState } from 'react'
import './CardAdmin.css'

function CardAdmin() {
    const [data, setData] = useState(null)

    const [isUpdating, setIsUpdating] = useState(false)
    const [updatedFood, setUpdatedFood] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((res) => res.json())
            .then((foods) => {
                setData(foods)
            })
    }, [])

    function handleUpdate(id) {
        // Find the food item to update based on its ID
        const foodToUpdate = data.find((food) => food.id === id)

        // Set the food item to the state for the modal
        setUpdatedFood(foodToUpdate)

        // Open the modal
        setIsUpdating(true)
    }
    function handleSubmitUpdate(updatedFood) {
        fetch(`http://localhost:3000/foods/${updatedFood.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFood)
        }).then((res) => {
            if (res.ok) {
                setData((prevData) => prevData.map((food) => (food.id === updatedFood.id ? updatedFood : food)))
                setIsUpdating(false)
                setUpdatedFood(null)
            }
        })
    }
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
                <article data-id={food.id} key={food.id} className="containerCarta">
                    <div className="rectangleImg">
                        <img className="menu--image" src={food.image} alt={food.title} />
                    </div>
                    <div className="textCardMenu">
                        <div className="textMenu">
                            <h3 className="textCardMenu__title">{food.title}</h3>
                        </div>
                    </div>

                    <button onClick={Delete}>Eliminar</button>
                    <button onClick={() => handleUpdate(food.id)}>Actualizar</button>
                </article>
            ))}

            {isUpdating && (
                <UpdateForm
                    updatedFood={updatedFood}
                    onCancel={() => {
                        setIsUpdating(false)
                        setUpdatedFood(null)
                    }}
                    onSubmit={handleSubmitUpdate}
                />
            )}
        </>
    )
    function UpdateForm({ updatedFood, onCancel, onSubmit }) {
        const [updatedTitle, setUpdatedTitle] = useState(updatedFood.title)
        const [updatedImage, setUpdatedImage] = useState(updatedFood.image)
        const [updatedPrice, setUpdatedPrice] = useState(updatedFood.price) // Added Price state

        function handleSubmit(e) {
            e.preventDefault()

            const updatedFoodData = {
                id: updatedFood.id,
                title: updatedTitle,
                image: updatedImage,
                price: updatedPrice // Include the Price field
            }

            onSubmit(updatedFoodData)
        }

        return (
            <div className="update-form">
                <h2>Actualizar comida</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" value={updatedImage} onChange={(e) => setUpdatedImage(e.target.value)} />
                    </label>
                    <label>
                        Price:
                        <input type="text" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
                    </label>
                    {/* Add other form fields as needed */}
                    <button type="button" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button type="submit">Actualizar</button>
                </form>
            </div>
        )
    }
}

export default CardAdmin
