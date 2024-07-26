type CartState = {
  items: Item[];
};
type Item = {
  name: string;
  price: number;
  quantity: number;
};

export type { CartState, Item };
