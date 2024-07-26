import useCartStore from "../state/store";
import EmptyCart from "/images/illustration-empty-cart.svg";
import Close from "/images/icon-remove-item.svg";
import CarbonNeutral from "/images/icon-carbon-neutral.svg";
import { parsePrice } from "../utils/lib.";
import { useEffect, useState } from "react";
interface OrderProps {
  setOpen: (open: boolean) => void;
}
const Order = ({ setOpen }: OrderProps) => {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const removeItem = useCartStore((state) => state.removeItem);
  //const AddItem = useCartStore((state) => state.addItem);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = items
        .map((item) => item.price * item.quantity)
        .reduce((a, b) => a + b, 0);
      setTotal(totalPrice);
    };

    calculateTotal();
  }, [items]);

  console.log(items);
  return (
    <section className="cart">
      <h2>Your Cart ({totalItems})</h2>
      {items.length === 0 ? (
        <div className="cart__empty">
          <img src={EmptyCart} alt="Empty cart" width={100} height={100} />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <div>
          {items.map((item, index) => (
            <>
              <div key={index}>
                <div className="order">
                  <div>
                    <p className="order__title">{item.name}</p>
                    <div className="order__info">
                      <p className="order__quantity">{item.quantity}x</p>
                      <p className="order__price">
                        @ ${parsePrice(item.price)}
                      </p>
                      <p className="order__totalprice">
                        ${parsePrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.name)} className="">
                    <img src={Close} alt="close button" />
                  </button>
                </div>
                <hr className="order__line" />
              </div>
            </>
          ))}
          <div className="order__total">
            <p>Order Total</p>
            <p className="order__finalprice">${parsePrice(total)}</p>
          </div>
          <div className="carbonNeutral">
            <img src={CarbonNeutral} alt="carbon neutral" />
            <p>
              This is a <span className="bold">carbon-neutral</span> delivery
            </p>
          </div>
          <div className="confirmOrder" onClick={() => setOpen(true)}>
            <button>Confirm Order</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Order;
