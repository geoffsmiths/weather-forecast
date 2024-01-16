import { useDispatch } from "react-redux";
import { initGeoLocation } from "../store/interactions";
import { Button, Col, Container, Row } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    initGeoLocation(dispatch);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="text-center">
          <Button onClick={handleClick}>Weersinformatie</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
