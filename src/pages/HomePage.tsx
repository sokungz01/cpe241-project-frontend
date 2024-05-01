import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="text-xl font-bold">Home</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
