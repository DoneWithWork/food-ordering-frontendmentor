import useCartStore from "../state/store";
import { parsePrice } from "../utils/lib.";
import GreenTick from "/images/icon-order-confirmed.svg";
import data from "../utils/data";

import { useState } from "react";
const Modal = ({ open }: { open: boolean }) => {
  function refreshPage() {
    window.location.reload();
  }
  const items = useCartStore((state) => state.items);

  const [total] = useState(0);
  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="modal__final">
        <img src={GreenTick} alt="Green tick" />
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
        <div>
          {items.map((item, index) => (
            <>
              <div key={index}>
                <div className="order--popup">
                  <div className="row">
                    <img
                      src={
                        data.find((d) => d.name === item.name)?.image.thumbnail
                      }
                      alt={item.name}
                    />
                    <div>
                      <p className="order__title--popup">{item.name}</p>
                      <div className="row">
                        <p className="order__quantity">{item.quantity}x</p>
                        <p className="order__price">
                          @ ${parsePrice(item.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="order__totalprice--popup">
                    ${parsePrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
              <hr className="order__line" />
            </>
          ))}
          <div className="order__total">
            <p>Order Total</p>
            <p className="order__finalprice--popup">${parsePrice(total)}</p>
          </div>
          <div className="confirmOrder">
            <button onClick={refreshPage}>Start New Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
