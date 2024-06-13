import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import clinics from "./assets/clinicsData.json";
import assetAsString from "./assets/subway.kml?raw";

const App = () => {
  const defaultPosition = [35.6892, 51.389] as LatLngTuple; // Center of Tehran

  const parser = new DOMParser();
  const kml = parser.parseFromString(assetAsString, "text/xml");

  return (
    <MapContainer
      center={defaultPosition}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {clinics.map((marker) => {
        if (marker?.location?.lat && marker?.location?.lng) {
          return (
            <Marker
              key={marker.id}
              position={[+marker.location.lat, +marker.location.lng]}
              icon={L.icon({
                iconUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                popupAnchor: [13, -5],
                className: "clinic-marker-popup",
              })}
            >
              <Popup>
                <div>
                  <strong>{marker.name}</strong>
                  <br />
                  {marker.address}
                  <br />
                  {/* {marker.tell} */}
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
      <ReactLeafletKml kml={kml} />
    </MapContainer>
  );
};

export default App;
