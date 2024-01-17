import { Button, Col, Container, Row, Table } from "react-bootstrap";
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
              <h4 className="mt-4">
                Weather in {weatherData.name}{" "}
                <img src={weatherIcon} alt="weather icon" />
              </h4>
            </Container>
            <Container>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Temperature{" "}
                      <FontAwesomeIcon
                        icon={getTemperatureIcon(weatherData.main.temp)}
                      />
                    </td>
                    <td>{weatherData.main.temp} °C</td>
                  </tr>
                  <tr>
                    <td>
                      Feels like{" "}
                      <FontAwesomeIcon
                        icon={getTemperatureIcon(weatherData.main.feels_like)}
                      />
                    </td>
                    <td>{weatherData.main.feels_like} °C</td>
                  </tr>
                  <tr>
                    <td>
                      Min{" "}
                      <FontAwesomeIcon
                        icon={getTemperatureIcon(weatherData.main.temp_min)}
                      />
                    </td>
                    <td>{weatherData.main.temp_min} °C</td>
                  </tr>
                  <tr>
                    <td>
                      Max{" "}
                      <FontAwesomeIcon
                        icon={getTemperatureIcon(weatherData.main.temp_max)}
                      />
                    </td>
                    <td>{weatherData.main.temp_max} °C</td>
                  </tr>
                  <tr>
                    <td>
                      Humidity{" "}
                      <FontAwesomeIcon icon={icon({ name: "droplet" })} />
                    </td>
                    <td>{weatherData.main.humidity} %</td>
                  </tr>
                  <tr>
                    <td>
                      Pressure{" "}
                      <FontAwesomeIcon
                        icon={icon({
                          name: "down-left-and-up-right-to-center",
                        })}
                      />
                    </td>
                    <td>{weatherData.main.pressure} bar</td>
                  </tr>
                  <tr>
                    <td>
                      Wind speed{" "}
                      <FontAwesomeIcon icon={icon({ name: "wind" })} />
                    </td>
                    <td>{weatherData.wind.speed} m/s</td>
                  </tr>
                  <tr>
                    <td>
                      Sunrise <FontAwesomeIcon icon={icon({ name: "sun" })} />
                    </td>
                    <td>{convertEpochToDatetime(weatherData.sys.sunrise)}</td>
                  </tr>
                  <tr>
                    <td>
                      Sunset <FontAwesomeIcon icon={icon({ name: "moon" })} />
                    </td>
                    <td>{convertEpochToDatetime(weatherData.sys.sunset)}</td>
                  </tr>
                </tbody>
              </Table>

              <WeatherForecast></WeatherForecast>
            </Container>
          </Col>
        </Row>
      ) : (
        <Container className="text-center">
          <Row>
            <Col className="text-center">
              <h4>Geen informatie beschikbaar</h4>
              <Button onClick={handleClick}>Weersinformatie</Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Weather;
