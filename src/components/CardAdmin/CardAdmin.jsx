import { useEffect, useState } from 'react'
import './CardAdmin.css'

function CardAdmin() {
    const [data, setData] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updatedFood, setUpdatedFood] = useState(null)
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((res) => res.json())
            .then((foods) => {
                setData(foods)
            })
    }, [])

    function handleUpdate(id) {
        const foodToUpdate = data.find((food) => food.id === id)
        setUpdatedFood(foodToUpdate)
        setIsUpdating(true)
    }

    function handleAdd() {
        setIsAdding(true)
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

    function handleAddSubmit(newFood) {
        console.log(newFood)
        fetch('http://localhost:3000/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFood)
        }).then((res) => {
            if (res.ok) {
                fetch('http://localhost:3000/foods')
                    .then((res) => res.json())
                    .then((foods) => {
                        setData(foods)
                    })
                setIsAdding(false)
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

                            <p>${food.price}</p>
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

            {isAdding && <AddForm onCancel={() => setIsAdding(false)} onSubmit={handleAddSubmit} />}

            <div className="containerCarta clickable" onClick={handleAdd}>
                <div className="rectangleImg">
                    <div className="menu--image add-icon">+</div>
                </div>
                <div className="textCardMenu">
                    <div className="textMenu">
                        <h3 className="textCardMenu__title">Agregar Nuevo Producto</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

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

function AddForm({ onCancel, onSubmit }) {
    const [newTitle, setNewTitle] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newType, setNewType] = useState('')
    const [newDescription, setNewDescription] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        const newFood = {
            name: newTitle,
            title: newTitle,
            price: parseFloat(newPrice),
            image: newImage,
            type: [newType],
            description: newDescription
        }

        onSubmit(newFood)
    }

    return (
        <div className="update-form">
            <h2>Agregar Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </label>
                <label>
                    Image URL:
                    <input type="text" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
                </label>
                <label>
                    Price:
                    <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                </label>
                <label>
                    Type:
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="lunch"
                                checked={newType === 'lunch'}
                                onChange={() => setNewType('lunch')}
                            />
                            Lunch
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="drink"
                                checked={newType === 'drink'}
                                onChange={() => setNewType('drink')}
                            />
                            Drink
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="cake"
                                checked={newType === 'cake'}
                                onChange={() => setNewType('cake')}
                            />
                            Cake
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="coffee"
                                checked={newType === 'coffee'}
                                onChange={() => setNewType('coffee')}
                            />
                            Coffee
                        </label>
                    </div>
                </label>
                <label>
                    Description:
                    <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                </label>
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default CardAdmin