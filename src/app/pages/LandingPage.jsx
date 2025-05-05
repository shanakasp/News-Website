import { PaginationDemo } from "../../components/PaginationDemo.tsx";
const LandingPage = () => {
  return (
    <div className=" mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Left side (2x wider) - full image */}
        <div className="flex-[2] rounded-lg overflow-hidden relative">
          {/* Image */}
          <img
            src="/heroimg.jpg"
            alt="heroimg"
            className="w-full h-3/4 object-cover rounded-lg"
          />
          <PaginationDemo className="w-full" />

          <div className="w-[728px] h-[90px] bg-gray-200 border border-gray-400 flex items-center justify-center text-sm text-gray-700">
            728x90 Ad Area
          </div>
        </div>

        {/* Right side */}
        <div className="flex-[1] px-2 flex flex-col justify-center">
          <div className="image-background  bg-gray-200 ">
            <img
              src="/heroimg.jpg"
              alt="heroimg"
              className="w-full h-3/5 overflow-hidden rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">Right Side</h2>
          </div>

          <img
            src="/heroimg.jpg"
            alt="heroimg"
            className="w-full h-2/5 overflow-hidden rounded-lg"
          />
          <h2 className="text-xl font-semibold mb-2">Right Side</h2>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
