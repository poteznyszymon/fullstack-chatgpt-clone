import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ErrorPage = () => {
  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center text-white font-inter gap-5">
      <div className="flex text-xl  gap-5 items-center">
        <h1>404</h1>
        <div className="h-12 w-[1px] bg-white"></div>
        <h2>This page could not be found</h2>
      </div>
      <Link to='/'>
        <Button className="w-36 bg-purple-500 hover:bg-purple-500/80 h-10">
          Go back home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
