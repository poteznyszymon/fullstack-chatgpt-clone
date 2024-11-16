import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import useGetAllChats from "@/hooks/chats/useGetAllChats";
import { Loader2 } from "lucide-react";
import LoadingButton from "./shared/LoadingButton";
import DrawerItem from "./DrawerItem";
import useAddChat from "@/hooks/chats/useAddChat";
import { Link } from "react-router-dom";

interface MobileDrawerProps {
  newTitle: string;
  openDrawer: boolean;
  handleClick: () => void;
}

const MobileDrawer = ({ openDrawer, handleClick }: MobileDrawerProps) => {
  const { chats, isFetching, isRefetching, isError, refetch } =
    useGetAllChats();
  const { addChat, isPending: isAddingChatLoading } = useAddChat({
    onHomePage: false,
  });
  return (
    <>
      <div
        className={`text-gray-text fixed z-50 top-0 w-[60%] md:w-[50%] lg:hidden h-full border-r font-inter border-r-gray-900 bg-gray-drawer ease-in-out duration-500  ${
          openDrawer ? "left-0" : "left-[-100%]"
        }`}
      >
        <div className="flex justify-between items-center py-3 px-5">
          <Link to={"/"}>
            <h1 className="w-full text-xl font-semibold">ChatAi</h1>
          </Link>
          <div className="flex gap-2">
            <div
              title="Create new chat"
              className="hover:bg-secondary/80 p-2 group rounded-md cursor-pointer"
              onClick={() => {
                addChat();
                handleClick();
              }}
            >
              {!isAddingChatLoading && (
                <BiEdit className="size-6 text-gray-text group-hover:text-gray-300" />
              )}
              {isAddingChatLoading && (
                <Loader2 className="size-6 animate-spin text-gray-text" />
              )}
            </div>
            <div
              onClick={handleClick}
              className="hover:bg-secondary/80 p-2 group rounded-md cursor-pointer"
            >
              <MdClose size={26} className="hover:text-gray-300" />
            </div>
          </div>
        </div>
        <div className="flex-1 px-3">
          <div className="flex-1 overflow-y-auto">
            {!isFetching &&
              !isRefetching &&
              chats &&
              chats.map((item) => (
                <DrawerItem key={item._id} onClick={handleClick} item={item} />
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
      </div>
      {openDrawer && (
        <div
          onClick={handleClick}
          className="fixed top-0 lg:hidden z-30 w-screen h-screen bg-opacity-30 bg-black/50"
        />
      )}
    </>
  );
};

export default MobileDrawer;
