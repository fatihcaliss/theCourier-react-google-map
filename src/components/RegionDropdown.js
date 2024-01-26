import useGetRegions from "../hooks/useGetRegions";

const SelectRegionWrapper = ({ children }) => (
  <div className="m-16 w-[258px] z-10 absolute bg-white p-8 opacity-[0.9] rounded">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Select Region:
    </label>
    {children}
  </div>
);

function RegionDropdown({ handleRegionSelect, selectedRegion }) {
  const { regions, isLoading, isError } = useGetRegions();
  console.log("isLoading", isLoading);
  if (isLoading) {
    return (
      <SelectRegionWrapper>
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 mx-auto " />
      </SelectRegionWrapper>
    );
  }

  if (isError) {
    return (
      <SelectRegionWrapper>
        <div className="text-red-600 font-bold">Error fetching regions.</div>
      </SelectRegionWrapper>
    );
  }

  return (
    <SelectRegionWrapper>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e) => handleRegionSelect(e.target.value)}
          value={selectedRegion}
        >
          <option value="">Select a region</option>
          {regions?.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </SelectRegionWrapper>
  );
}
export default RegionDropdown;
