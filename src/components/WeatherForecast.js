import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

const WeatherForecast = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "5 day forecast, 3hr interval",
      },
    },
  };

  const weatherForecastData = useSelector(
    (state) => state.weatherforecast.value
  );
  let labels = [];
  let temps = [];
  let feelTemps = [];
  let maxTemps = [];
  let minTemps = [];

  if (weatherForecastData.list && weatherForecastData.list.length > 0) {
    weatherForecastData.list.forEach((element) => {
      labels.push(element.dt_txt);
      temps.push(element.main.temp);
      feelTemps.push(element.main.feels_like);
      maxTemps.push(element.main.temp_max);
      minTemps.push(element.main.temp_min);
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temps,
        borderColor: "#36A2EB",
        backgroundColor: "#9BD0F5",
      },
      {
        label: "Feels like",
        data: feelTemps,
        borderColor: "#c7fccd",
        backgroundColor: "#42f55a",
      },
      {
        label: "Max. Temperature",
        data: maxTemps,
        borderColor: "#e32727",
        backgroundColor: "#ab2020",
      },
      {
        label: "Min. Temperature",
        data: minTemps,
        borderColor: "#ff8629",
        backgroundColor: "#e37827",
      },
    ],
  };

  const getIcon = (iconPath) => {
    return "http://openweathermap.org/img/w/" + iconPath + ".png";
  };

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h4 className="mt-4">Temperature forecast linechart</h4>
          {weatherForecastData.list && weatherForecastData.list.length > 0 ? (
            <Line options={options} data={data} />
          ) : (
            ""
          )}

          <h4 className="mt-4">Weather forecast upcoming 5 days</h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {weatherForecastData.list.map((item, index) => (
                <tr key={index}>
                  <td>{item.dt_txt}</td>
                  <td>{item.main.temp} °C</td>
                  <td>
                    <img src={getIcon(item.weather[0].icon)} alt="dus" />{" "}
                    {item.weather[0].description}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherForecast;
