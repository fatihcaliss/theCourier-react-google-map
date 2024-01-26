import { useQuery } from "@tanstack/react-query";
import { fetchAllRegions } from "../services";

const useGetRegions = () => {
  const {
    data: regions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getAllRegions"],
    queryFn: fetchAllRegions,
    placeholderData: [],
    select: ({ list }) => list || [],
  });

  return { regions, error, isLoading };
};

export default useGetRegions;
