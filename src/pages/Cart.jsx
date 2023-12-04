import MenuFooter from "../components/MenuFooter/MenuFooter";
import CardCart from "../components/CardCart/CardCart";

import "../assets/styles/Cart.css";

function Cart() {
    return (
        <>
            <header className="cart-header">
                <h1>Carrito</h1>
            </header>
            <main>
                <CardCart />
            </main>
            <MenuFooter />
        </>
    );
}

export default Cart;
