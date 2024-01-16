import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGeoLocation } from "../store/interactions";

const GeoDisplay = () => {
  const dispatch = useDispatch();
  const [hasGeoData, setGeoData] = useState(false);
  const geodata = useSelector((state) => state.geo.value);

  const handleClick = () => {
    initGeoLocation(dispatch);
    if (geodata) {
      setGeoData(true);
    } else {
      setGeoData(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Get Location</button>
      {hasGeoData ? (
        <table>
          <thead>
            <tr>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{geodata.lat}</td>
              <td>{geodata.long}</td>
              <td>{geodata.acc}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default GeoDisplay;
