import useCartStore from "../state/store";
import data from "../utils/data";
import { parsePrice } from "../utils/lib.";
import AddCart from "/images/icon-add-to-cart.svg";
import Plus from "/images/icon-increment-quantity.svg";
import Minus from "/images/icon-decrement-quantity.svg";
const Desserts = () => {
  const AddItem = useCartStore((state) => state.addItem);
  const MinusItem = useCartStore((state) => state.minusItem);
  const items = useCartStore((state) => state.items);
  const getItemQuantity = (itemName: string) => {
    const item = items.find((i) => i.name === itemName);
    return item ? item.quantity : 0;
  };
  return (
    <section className="desserts">
      <h1>Desserts</h1>
      <div className="desserts_grid">
        {data &&
          data.map((item, index) => (
            <div className="desserts_card" key={index}>
              <div className="desserts_image">
                <picture>
                  <source
                    media="(min-width: 750px)"
                    srcSet={item.image.desktop}
                  />
                  <img src={item.image.mobile} alt={item.name} />

                  {getItemQuantity(item.name) > 0 ? (
                    <div className="desserts_addcart_items">
                      <button className="" onClick={() => MinusItem(item.name)}>
                        <img src={Minus} alt="minus" />
                      </button>
                      <p>{getItemQuantity(item.name)}</p>
                      <button
                        className=""
                        onClick={() => AddItem(item.name, item.price)}
                      >
                        <img src={Plus} alt="plus" className="plus" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => AddItem(item.name, item.price)}
                      className="desserts_addcart"
                    >
                      <img
                        src={AddCart}
                        alt="add to cart icon"
                        width={25}
                        height={25}
                      />
                      <p>Add to Cart</p>
                    </button>
                  )}
                </picture>
              </div>
              <div className="desserts_info">
                <p className="desserts_category">{item.category}</p>
                <p className="desserts_name">{item.name}</p>
                <p className="desserts_price">${parsePrice(item.price)}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Desserts;
