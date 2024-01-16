// import "../App.css";
import React from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Weather from "../components/Weather";

function App() {
  return (
    <Container fluid>
      <Weather></Weather>
      <Header></Header>
    </Container>
  );
}

export default App;
