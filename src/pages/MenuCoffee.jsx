import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../../ProductsContext'

import NavBarMenu from '../components/NavBarMenu'
import MenuFooter from '../components/MenuFooter/MenuFooter'
import SearchBar from '../components/SearchBar'
import { CardNexo } from '../components/CardNexo/CardNexo'
import PacmanLoader from 'react-spinners/PacmanLoader'
import AscendingIcon from '../assets/icons/Sort-ascending-letters.svg'
import DescendingIcon from '../assets/icons/Sort-descending-letters.svg'

function MenuCoffee() {
    const { data, isLoading, isError, setTypeName, apiUrl, setApiUrl } = useContext(ProductsContext)

    useEffect(() => {
        setTypeName('coffee')
    }, [])

    const [dataCoffees, setDataCoffees] = useState([])

    useEffect(() => {
        if (data) {
            setDataCoffees(data.coffees)
        }
    }, [data])

    const getDataFilter = (query) => {
        // Filtrar los productos basados en la query
        const dataFilter = data.coffees.filter((coffee) => {
            return coffee.nombre.toLowerCase().includes(query)
        })

        setDataCoffees(dataFilter)
    }

    if (isLoading)
        return (
            <div className="Message-loading">
                <PacmanLoader color="#F9E0AE" />
            </div>
        )

    if (isError) return <h2>Rompiste algo capo</h2>

    const descendingEvent = () => {
        let data = [...apiUrl]
        if (data.length > 0) {
            let result = data.sort((a, b) => b.title.localeCompare(a.title))
            setApiUrl(result)
        }
    }
    const ascendingEvent = () => {
        let data = [...apiUrl]
        if (data.length > 0) {
            let result = data.sort((a, b) => a.title.localeCompare(b.title))
            setApiUrl(result)
        }
    }

    return (
        <>
            <NavBarMenu />
            <div>
                <SearchBar getDataFilter={getDataFilter}></SearchBar>
            </div>
            <div className="buttons-sorting-container">
                <button onClick={ascendingEvent}>
                    <img src={AscendingIcon} alt="" />
                </button>
                <button onClick={descendingEvent}>
                    <img src={DescendingIcon} alt="" />
                </button>
            </div>
            <div className="cardMenuContainer">
                {apiUrl.map(({ title, image }, index) => (
                    <CardNexo key={index} title={title} image={image} />
                ))}
            </div>
            <MenuFooter />
        </>
    )
}

export default MenuCoffee
