import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Weather = () => {
  const weatherData = useSelector((state) => state.weather.value);
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

  return (
    <Container>
      {weatherData.name ? (
        <Row>
          <Col>
            <Container className="text-center">
              <h4 className="mt-4">Het weer in: {weatherData.name}</h4>
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
                    <td>Temperatuur</td>
                    <td>{weatherData.main.temp} °C</td>
                  </tr>
                  <tr>
                    <td>Gevoelstemperatuur</td>
                    <td>{weatherData.main.feels_like} °C</td>
                  </tr>
                  <tr>
                    <td>Min</td>
                    <td>{weatherData.main.temp_min} °C</td>
                  </tr>
                  <tr>
                    <td>Max</td>
                    <td>{weatherData.main.temp_max} °C</td>
                  </tr>
                  <tr>
                    <td>Luchtvochtigheid</td>
                    <td>{weatherData.main.humidity} %</td>
                  </tr>
                  <tr>
                    <td>Luchtdruk</td>
                    <td>{weatherData.main.pressure} bar</td>
                  </tr>
                  <tr>
                    <td>Windsnelheid</td>
                    <td>{(weatherData.wind.speed * 1.609).toFixed(0)} km/u</td>
                  </tr>
                  <tr>
                    <td>Zonsopkomst</td>
                    <td>{convertEpochToDatetime(weatherData.sys.sunrise)}</td>
                  </tr>
                  <tr>
                    <td>Zonsondergang</td>
                    <td>{convertEpochToDatetime(weatherData.sys.sunset)}</td>
                  </tr>
                  <tr>
                    <td>Weertype</td>
                    <td>{weatherData.weather[0].description}</td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </Col>
        </Row>
      ) : (
        <Container className="text-center">
          <h4>Geen informatie beschikbaar</h4>
        </Container>
      )}
    </Container>
  );
};

export default Weather;
