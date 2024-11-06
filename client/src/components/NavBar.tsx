import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { auth } from "../firebase/firebase";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "../components/ui/use-toast";
import { MdMenu } from "react-icons/md";
import { FiLayout } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface NavBarProps {
  showDrawerIcon: boolean;
  handleDrawerClick?: () => void;
  handleMobileDrawerCLick?: () => void;
}

const NavBar = ({
  handleDrawerClick,
  showDrawerIcon,
  handleMobileDrawerCLick,
}: NavBarProps) => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({ title: "User logged out successfully" });
    } catch (error) {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="h-[48px] bg-main-gray w-full flex justify-between px-4 py-3 transition-all duration-500 fixed ">
      <div className="flex items-center text-gray-text gap-5">
        {showDrawerIcon && (
          <FiLayout
            title="Show menu"
            size={24}
            className="cursor-pointer hidden lg:block hover:text-gray-300"
            onClick={handleDrawerClick}
          />
        )}
        <MdMenu
          className="lg:hidden cursor-pointer"
          size={28}
          onClick={handleMobileDrawerCLick}
        />
        <h1 className="text-xl font-semibold">ChatAI</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-6 h-6 md:h-8 md:w-8 text-xs hover:border-2 border-gray-700 cursor-pointer fixed right-4 top-3">
            <AvatarFallback>
              {user?.email?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5 mt-2">
          <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex items-center gap-1"
            onClick={handleLogout}
          >
            <MdOutlineLogout size={15} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavBar;
