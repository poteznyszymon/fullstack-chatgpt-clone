import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogoutUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error();
      return data;
    },
    onSuccess: () => {
      toast({ title: "User logged out successfully" });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { logout };
};

export default useLogoutUser;
