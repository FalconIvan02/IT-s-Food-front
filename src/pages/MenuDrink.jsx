import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../ProductsContext";

import NavBarMenu from "../components/NavBarMenu";
import MenuFooter from "../components/MenuFooter/MenuFooter";
import SearchBar from "../components/SearchBar";
import { CardNexo } from "../components/CardNexo/CardNexo";
import PacmanLoader from "react-spinners/PacmanLoader";
import AscendingIcon from "../assets/icons/Sort-ascending-letters.svg";
import DescendingIcon from "../assets/icons/Sort-descending-letters.svg";

function MenuDrink() {
  const {
    data,
    isLoading,
    isError,
    typeUrl,
    typeName,
    setTypeName,
    apiUrl,
    setApiUrl,
  } = useContext(ProductsContext);
  useEffect(() => {
    setTypeName("drink");
  }, []);
  const [dataDrinks, setDataDrinks] = useState([]);

  useEffect(() => {
    if (data) {
      setDataDrinks(data.drinks);
    }
  }, [data]);
  console.log(apiUrl);
  const getDataFilter = (query) => {
    // Filtrar los productos basados en la query
    const dataFilter = data.drinks.filter((drinks) => {
      return drinks.nombre.toLowerCase().includes(query);
    });

    setDataDrinks(dataFilter);
  };

  if (isLoading)
    return (
      <div className="Message-loading">
        <PacmanLoader color="#F9E0AE" />
      </div>
    );

  if (isError) return <h2>Rompiste algo capo</h2>;

  const descendingEvent = () => {
    let data = [...dataDrinks];
    console.log("La funcion se ejecuta");
    if (data.length > 0) {
      console.log("La funcion entra al sorting descending");
      let result = data.sort((a, b) => b.nombre.localeCompare(a.nombre));
      setDataDrinks(result);
    }
  };
  const ascendingEvent = () => {
    let data = [...dataDrinks];
    if (data.length > 0) {
      console.log("La funcion entra al sorting ascending");
      let result = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setDataDrinks(result);
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
        {apiUrl.map(({ title, image }, index) => (
          <CardNexo key={index} title={title} image={image} />
        ))}
      </div>
      <MenuFooter />
      <img src="" alt="" />
    </>
  );
}
export default MenuDrink;
