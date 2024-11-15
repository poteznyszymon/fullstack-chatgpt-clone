import { FiLayout } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import DrawerItem from "./DrawerItem";
import { Loader2 } from "lucide-react";
import useGetAllChats from "@/hooks/chats/useGetAllChats";
import LoadingButton from "./shared/LoadingButton";

interface DrawerProps {
  handleClick: () => void;
  showDrawer: boolean;
}

const Drawer = ({ handleClick, showDrawer }: DrawerProps) => {
  const { chats, isFetching, isRefetching, isError, refetch } =
    useGetAllChats();

  return (
    <section
      className={`fixed top-0 left-0 h-full lg:w-64 z-20 bg-gray-drawer hidden justify-between px-4 py-3 transition-transform duration-300 lg:flex ${
        showDrawer ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <div className="w-screen h-full flex flex-col">
        <nav className="flex justify-between mb-5">
          <div
            title="Hide menu"
            className="hover:bg-secondary/80 p-2 group rounded-md cursor-pointer"
            onClick={handleClick}
          >
            <FiLayout className="size-6 text-gray-text group-hover:text-gray-300" />
          </div>
          <div
            title="Create new chat"
            className="hover:bg-secondary/80 p-2 group rounded-md cursor-pointer"
            onClick={() => {}}
          >
            <BiEdit className="size-6 text-gray-text group-hover:text-gray-300" />
          </div>
        </nav>
        <div className="flex-1">
          {!isFetching &&
            !isRefetching &&
            chats &&
            chats.map((item) => (
              <DrawerItem key={item._id} item={item} isLoading={isFetching} />
            ))}
          {isFetching && !isRefetching && (
            <Loader2 className="mx-auto animate-spin" />
          )}
          {isError && (
            <div className="text-center flex flex-col">
              <LoadingButton
                variant={"secondary"}
                loading={isRefetching}
                onClick={() => refetch()}
              >
                Try again
              </LoadingButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Drawer;
