import { useToast } from "@/components/ui/use-toast";
import { loginValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (values: loginValues) => {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error();
      return data;
    },
    onSuccess: () => {
      toast({ title: "User logged in successfully" });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { login, isPending };
};

export default useLoginUser;
