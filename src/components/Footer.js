import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="text-center">
      <small>
        See:{" "}
        <a
          href="https://github.com/geoffsmiths/weather-forecast"
          target="_blank"
          title="Weatherforecast by geoffsmiths"
          rel="noreferrer"
        >
          Github
        </a>{" "}
        | Powered by{" "}
        <a
          href="https://openweathermap.org"
          target="_blank"
          title="openweathearmap"
          rel="noreferrer"
        >
          Openweathermap
        </a>
      </small>
    </Container>
  );
};

export default Footer;
