import "./CardCart.css";

function CardCart() {
    return (
        <>
            {" "}
            <article className="CardCart-Container">
                <div className="rectangleImg">
                    <img className="Cart--image" />
                </div>
                <div>
                    <p className="Cart-firstName"></p>
                    <p className="Cart-secondName"></p>
                    <p className="Cart-price"></p>
                </div>
                <div className="Cart-quantity"></div>
            </article>
        </>
    );
}
export default CardCart;
