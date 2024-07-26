import { useState } from "react";
import Container from "./components/Container";
import Desserts from "./components/Desserts";
import Modal from "./components/Modal";
import Order from "./components/Order";

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container>
        <Desserts />
        <Order setOpen={setOpen} />
      </Container>
      <Modal open={open} />
    </>
  );
}
