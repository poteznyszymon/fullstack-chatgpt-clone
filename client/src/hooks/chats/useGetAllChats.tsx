import { Chat } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useGetAllChats = () => {
  const {
    data: chats,
    isFetching,
    isError,
    refetch,
    isRefetching,
  } = useQuery<Chat[]>({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetch("/api/chats/all");
      const data = await response.json();
      if (!response.ok) throw new Error();
      if (data.chats.length == 0) return null;
      return data.chats;
    },
  });

  return { chats, isFetching, isError, refetch, isRefetching };
};

export default useGetAllChats;
