import { useQuery } from "@tanstack/react-query";

const useCheckAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await fetch("/api/check-auth");
      const data = await response.json();
      if (!response.ok) return null;
      console.log(data.success);
      return data;
    },
  });

  return { user, isLoading };
};

export default useCheckAuth;
