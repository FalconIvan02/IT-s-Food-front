// Importar las dependencias necesarias
import { createContext, useState, useEffect } from 'react'

// Crear el contexto de productos
export const ProductsContext = createContext({})

// Crear el proveedor de contexto de productos
export const ProductsContextProvider = ({ children }) => {
    //! Variables de estado para los productos, la carga y el error
    const [typeName, setTypeName] = useState('')
    const [data, setProducts] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setError] = useState(null)
    const typeUrl = `http://localhost:3000/foods?type=${typeName}`

    const [apiUrl, setApiUrl] = useState([])

    useEffect(() => {
        fetch(typeUrl)
            .then((res) => res.json())
            .then((data) => setApiUrl(data))
    }, [typeUrl])

    const fetchData = async () => {
        try {
            setError(null)
            setIsLoading(true)
            const response = await fetch('http://localhost:3000')
            const data = await response.json()
            setProducts(data)
        } catch (err) {
            console.error(err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Devolver el proveedor de contexto
    const contextValues = {
        data,
        isLoading,
        isError,
        typeName,
        setTypeName,

        apiUrl,
        setApiUrl
    }

    return <ProductsContext.Provider value={contextValues}>{children}</ProductsContext.Provider>
}
