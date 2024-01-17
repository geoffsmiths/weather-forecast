import React from "react";
import { Container } from "react-bootstrap";
import Weather from "../components/Weather";
import Footer from "../components/Footer";

function App() {
  return (
    <Container fluid>
      <Weather></Weather>
      <Footer></Footer>
    </Container>
  );
}

export default App;
