import { Avatar, AvatarFallback } from "./ui/avatar";
import { MdOutlineLogout } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { FiLayout } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import useCheckAuth from "@/hooks/auth/useCheckAuth";
import useLogoutUser from "@/hooks/auth/useLogoutUser";
import { Link } from "react-router-dom";

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
  const { user } = useCheckAuth();
  const { logout } = useLogoutUser();
  console.log(user);

  return (
    <nav className="h-[48px] bg-main-gray w-full flex justify-between px-4 py-3 transition-all duration-500 fixed ">
      <div className="flex items-center text-gray-text gap-5 pt-2">
        {showDrawerIcon && (
          <div
            title="Show menu"
            className="p-2 hover:bg-secondary rounded-md group cursor-pointer"
          >
            <FiLayout
              className="size-6 hidden lg:block group-hover:text-gray-300"
              onClick={handleDrawerClick}
            />
          </div>
        )}
        <MdMenu
          className="lg:hidden cursor-pointer"
          size={28}
          onClick={handleMobileDrawerCLick}
        />
        <Link to={"/"}>
          <h1 className="text-xl font-semibold">ChatAI</h1>
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-8 text-xs hover:scale-105 cursor-pointer fixed right-4 top-3">
            <AvatarFallback>{user?.displayName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5 mt-2">
          <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex items-center gap-1"
            onClick={() => {
              logout();
            }}
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
