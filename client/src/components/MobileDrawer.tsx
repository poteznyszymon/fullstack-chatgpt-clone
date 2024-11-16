import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

interface MobileDrawerProps {
  newTitle: string;
  openDrawer: boolean;
  handleClick: () => void;
}

const MobileDrawer = ({ openDrawer, handleClick }: MobileDrawerProps) => {
  return (
    <div
      className={`text-gray-text fixed top-0 w-[60%] md:w-[50%] lg:hidden h-full border-r font-inter border-r-gray-900 bg-gray-drawer ease-in-out duration-500 z-30 ${
        openDrawer ? "left-0" : "left-[-100%]"
      }`}
    >
      <div className="flex justify-between items-center py-3 px-5">
        <h1 className="w-full text-xl font-semibold">ChatAi</h1>
        <div className="flex gap-2">
          <BiEdit
            size={24}
            className="cursor-pointer text-gray-text hover:text-gray-300"
            onClick={() => {}}
          />
          <button onClick={handleClick}>
            <MdClose size={26} className="hover:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="flex-1 px-3"></div>
    </div>
  );
};

export default MobileDrawer;
