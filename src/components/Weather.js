import {
  Card,
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { initGeoLocation } from "../store/interactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WeatherForecast from "./WeatherForecast";

const Weather = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    initGeoLocation(dispatch);
  };

  const weatherData = useSelector((state) => state.weather.value);

  let weatherIcon;

  if (weatherData.weather) {
    weatherIcon =
      "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
  }

  const convertEpochToDatetime = (_epoch) => {
    let milliseconds = _epoch * 1000;
    let myDate = new Date(milliseconds);
    return (
      myDate.getDate() +
      "-" +
      (myDate.getMonth() + 1) +
      "-" +
      myDate.getFullYear() +
      " " +
      myDate.getHours() +
      ":" +
      myDate.getMinutes() +
      ":" +
      myDate.getSeconds()
    );
  };

  const getTemperatureIcon = (temperature) => {
    if (temperature <= 5) {
      return icon({ name: "temperature-low" });
    }

    if (temperature > 5 && temperature <= 15) {
      return icon({ name: "temperature-quarter" });
    }

    if (temperature > 15 && temperature <= 25) {
      return icon({ name: "temperature-three-quarters" });
    }

    if (temperature > 25) {
      return icon({ name: "temperature-three-quarters" });
    }

    return icon({ name: "temperature-low" });
  };

  return (
    <Container>
      {weatherData.name ? (
        <Row>
          <Col>
            <Container className="text-center">
              <h4 className="mt-4">Weather</h4>
            </Container>
            <Container>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>
                    <img src={weatherIcon} alt="weather icon" />{" "}
                    {weatherData.name}, {weatherData.main.temp}°C
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    {" "}
                    The high will be{" "}
                    <strong>{weatherData.main.temp_max}°C</strong>, the low will
                    be <strong>{weatherData.main.temp_min}°C</strong>.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    It feels like{" "}
                    <strong>{weatherData.main.feels_like}°C</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Humidity: <strong>{weatherData.main.humidity}%</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Pressure: <strong>{weatherData.main.pressure}hPa</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={icon({ name: "wind" })} />{" "}
                    <strong>{weatherData.wind.speed} m/s</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={icon({ name: "sun" })} />{" "}
                    {convertEpochToDatetime(weatherData.sys.sunrise)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={icon({ name: "moon" })} />{" "}
                    {convertEpochToDatetime(weatherData.sys.sunset)}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Container>
            <Container>
              <WeatherForecast></WeatherForecast>
            </Container>
          </Col>
        </Row>
      ) : (
        <Container className="text-center">
          <Row>
            <Col className="text-center">
              <h4>No data present</h4>
              <Button onClick={handleClick}>Show data</Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Weather;
