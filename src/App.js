import { useEffect, useState } from "react";
import RegionDropdown from "./components/RegionDropdown";
import Map from "./components/Map";

function App() {
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const selectedRegionStorage = JSON.parse(
      localStorage.getItem("selectedRegion")
    );
    if (selectedRegionStorage) {
      setSelectedRegion(selectedRegionStorage);
    }
  }, []);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    localStorage.setItem("selectedRegion", JSON.stringify(region));
  };

  return (
    <div>
      <RegionDropdown
        handleRegionSelect={handleRegionSelect}
        selectedRegion={selectedRegion}
      />
      <Map selectedRegion={selectedRegion} />
    </div>
  );
}

export default App;
