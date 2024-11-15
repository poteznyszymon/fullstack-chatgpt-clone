import { useQuery } from "@tanstack/react-query";
import { Message } from "@/lib/types";

const useGetMessages = (chatId: string) => {
  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const response = await fetch(`/api/messages/${chatId}`);
      const data = await response.json();
      if (!response.ok) throw new Error();
      return data.messages;
    },
  });

  return { messages, isLoading };
};

export default useGetMessages;
