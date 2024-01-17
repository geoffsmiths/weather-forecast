import { Card, Container, Row, Col, Table } from "react-bootstrap";
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
        text: "12 hourly Forecast",
      },
    },
  };

  const weatherForecastData = useSelector(
    (state) => state.weatherforecast.value
  );
  let hasData =
    weatherForecastData && weatherForecastData.hasOwnProperty("list");
  let labels = [];
  let temps = [];
  let feelTemps = [];
  let maxTemps = [];
  let minTemps = [];

  if (hasData) {
    weatherForecastData.list.slice(0, 5).forEach((element) => {
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

  const convertEpochToDatetime = (_epoch) => {
    let milliseconds = _epoch * 1000;
    let date = new Date(milliseconds);

    // Get the day, month, and day of the month
    let day = date.toLocaleString("en-US", { weekday: "short" }); // First three letters of the day
    let month = date.toLocaleString("en-US", { month: "short" }); // First three letters of the month
    let dayOfMonth = date.getDate(); // Day of the month

    let hours =
      date.getHours().toString().length === 1
        ? "0" + date.getHours()
        : date.getHours();

    let minutes =
      date.getMinutes().toString().length === 1
        ? "0" + date.getMinutes()
        : date.getMinutes();

    // Create the formatted date string
    let formattedDate = `${day}, ${month}, ${dayOfMonth}, ${hours}:${minutes}`;

    return formattedDate;
  };

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h4 className="mt-4">Temperature forecast linechart</h4>
          {hasData ? <Line options={options} data={data} /> : ""}

          <h4 className="mt-4">Weather forecast 12 hourly</h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hasData &&
                weatherForecastData.list.slice(0, 6).map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle">
                      {convertEpochToDatetime(item.dt)}
                    </td>
                    <td className="align-middle">{item.main.temp} °C</td>
                    <td className="align-middle">
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
