import Navbar from "@/components/Login/Navbar";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="m-auto">
        <p className="text-xl font-bold">Home</p>
      </div>
    </div>
  );
};

export default HomePage;
