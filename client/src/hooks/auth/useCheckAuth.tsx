import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useCheckAuth = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await fetch("/api/check-auth");
      const data = await response.json();
      if (!response.ok) return null;
      return data.user;
    },
  });

  return { user, isLoading };
};

export default useCheckAuth;
