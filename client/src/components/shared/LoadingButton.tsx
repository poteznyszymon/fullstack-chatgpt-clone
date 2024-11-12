import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButton extends ButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

const LoadingButton = ({
  loading,
  children,
  className,
  ...props
}: LoadingButton) => {
  return (
    <Button disabled={loading} className={className} {...props}>
      {loading ? <Loader2 className="animate-spin size-4" /> : <>{children}</>}
    </Button>
  );
};

export default LoadingButton;
