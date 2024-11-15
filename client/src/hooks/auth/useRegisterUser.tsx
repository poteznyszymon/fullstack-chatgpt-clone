import { useToast } from "@/components/ui/use-toast";
import { registerValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRegisterUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: register, isPending } = useMutation({
    mutationFn: async (values: registerValues) => {
      const response = await fetch("/api/register", {
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
      toast({ title: "User created successfully" });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { register, isPending };
};

export default useRegisterUser;
