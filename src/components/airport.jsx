import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Fuse from "fuse.js";
import airportData from "../utils/airports.json";

const airportList = Object.values(airportData).filter((a) => a.name && a.city);

const fuse = new Fuse(airportList, {
  keys: ["city", "name", "iata"],
  threshold: 0.3,
});

const KM_TO_MI = 0.621371;
const getDistanceMi = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;
  return (distanceKm * KM_TO_MI).toFixed(1); // distance in miles
};

export default function AirportForm() {
  const { control, handleSubmit } = useForm();
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [searchOrigin, setSearchOrigin] = useState(null); // lat/lng of top result

  const onSubmit = (data) => {
    console.log("Selected Airports:", data);
  };

  const handleSearch = (value) => {
    if (value.length > 1) {
      const results = fuse.search(value).map((r) => r.item);

      if (results.length > 0) {
        const origin = {
          lat: results[0].lat,
          lon: results[0].lon,
        };
        setSearchOrigin(origin);

        // Check all airports for distance from the top match
        const nearby = airportList
          .map((airport) => {
            if (!airport.lat || !airport.lon) return null;
            const distance = getDistanceMi(
              origin.lat,
              origin.lon,
              airport.lat,
              airport.lon,
            );
            return {
              ...airport,
              distance: parseFloat(distance),
            };
          })
          .filter((a) => a && a.distance <= 100) // now truly within 100 miles
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 10); // top 10 closest

        setSuggestions(nearby);
      } else {
        setSuggestions([]);
        setSearchOrigin(null);
      }
    } else {
      setSuggestions([]);
      setSearchOrigin(null);
    }
  };

  const handleSelect = (field, value, onChange) => {
    onChange(value);
    setSuggestions([]);
    setActiveField(null);
    setSearchOrigin(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center  gap-2 p-4 space-y-4"
    >
      {["departure", "return"].map((field) => (
        <Controller
          key={field}
          name={field}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <div className="relative">
              <label className="block mb-1 capitalize">{field} Airport</label>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  setActiveField(field);
                  handleSearch(e.target.value);
                }}
                className="border px-3 py-2 w-full"
              />
              {activeField === field && suggestions.length > 0 && (
                //   {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border mt-1 w-full max-h-60 overflow-y-auto shadow">
                  {suggestions.map((airport) => {
                    let distance = null;
                    if (searchOrigin && airport.lat && airport.lon) {
                      distance = getDistanceMi(
                        searchOrigin.lat,
                        searchOrigin.lon,
                        airport.lat,
                        airport.lon,
                      );
                    }
                    return (
                      <li
                        key={`${airport.iata || airport.icao || airport.name}-${
                          airport.lat
                        }-${airport.lon}`}
                        onClick={() =>
                          handleSelect(
                            field,
                            `${airport.city} - ${airport.iata}`,
                            onChange,
                          )
                        }
                        className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                      >
                        <div>
                          {airport.city} - {airport.iata}
                          <div className="text-sm text-gray-500">
                            {airport.name}
                          </div>
                        </div>
                        {distance && (
                          <span className="text-xs text-gray-500 mt-1">
                            {airport.distance} mi
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        />
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
