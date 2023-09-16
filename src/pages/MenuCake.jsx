import NavBarMenu from "../components/NavBarMenu";
import MenuFooter from "../components/MenuFooter";
import CardNexo from "../components/CardNexo";
function MenuCake() {
    return (
        <>
            <NavBarMenu />
            <div className="cardNexoContainer">
                <CardNexo />
                <CardNexo />
                <CardNexo />
                <CardNexo />
            </div>
            <MenuFooter />
        </>
    );
}
export default MenuCake;