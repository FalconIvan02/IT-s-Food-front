import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../ProductsContext";

import NavBarMenu from "../components/NavBarMenu";
import MenuFooter from "../components/MenuFooter/MenuFooter";
import SearchBar from "../components/SearchBar";
import { CardNexo } from "../components/CardNexo/CardNexo";
import PacmanLoader from "react-spinners/PacmanLoader";
import AscendingIcon from "../assets/icons/Sort-ascending-letters.svg";
import DescendingIcon from "../assets/icons/Sort-descending-letters.svg";

function MenuCoffee() {
    const { data, isLoading, isError, tempList } = useContext(ProductsContext);

    const [dataCoffees, setDataCoffees] = useState([]);

    useEffect(() => {
        if (data) {
            setDataCoffees(data.coffees);
        }
    }, [data]);

    const getDataFilter = (query) => {
        // Filtrar los productos basados en la query
        const dataFilter = data.coffees.filter((coffee) => {
            return coffee.nombre.toLowerCase().includes(query);
        });

        setDataCoffees(dataFilter);
    };

    if (isLoading)
        return (
            <div className="Message-loading">
                <PacmanLoader color="#F9E0AE" />
            </div>
        );

    if (isError) return <h2>Rompiste algo capo</h2>;

    const descendingEvent = () => {
        let data = [...dataCoffees];
        console.log("La funcion se ejecuta");
        if (data.length > 0) {
            console.log("La funcion entra al sorting descending");
            let result = data.sort((a, b) => b.nombre.localeCompare(a.nombre));
            setDataCoffees(result);
        }
    };
    const ascendingEvent = () => {
        let data = [...dataCoffees];
        if (data.length > 0) {
            console.log("La funcion entra al sorting ascending");
            let result = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            setDataCoffees(result);
        }
    };

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
                {dataCoffees &&
                    dataCoffees.map(({ imagen, titulo }, index) => (
                        <CardNexo key={index} title={titulo} image={imagen} />
                    ))}
            </div>
            <MenuFooter />
        </>
    );
}
export default MenuCoffee;
