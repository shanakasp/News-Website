"use client";

import { useEffect, useState } from "react";

//2nd headline last 15
interface HeadlineItem {
  id: number;
  title: string;
  url: string;
  image_url: string;
  siteName: string;
  name: string;
  type: string;
}

const Headlines = () => {
  const [newsData, setNewsData] = useState<HeadlineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add window resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://editor.samanyoluhaber.com/api/v1/headlines?limit=30", {
      headers: {
        Authorization:
          "Bearer Qp9zY2tAdn38vDb0jXzAEmr0yRwHogZ3spYiEVl1sn5j2zv5QyKN49U6WObVmFbL",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const headlines = data.data.slice(15, 30);
        setNewsData(headlines);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching headlines:", err);
        setIsLoading(false);
      });
  }, []);

  // Dynamic text truncation based on screen size
  const getTruncateLength = () => {
    if (windowWidth < 640) {
      // xs screens
      return 40;
    } else if (windowWidth < 768) {
      // sm screens
      return 60;
    } else if (windowWidth < 1024) {
      // md screens
      return 80;
    } else if (windowWidth < 1280) {
      // lg screens
      return 100;
    } else {
      return 120; // xl screens and above
    }
  };

  const truncate = (text: string) => {
    const maxLength = getTruncateLength();
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (isLoading) {
    return (
      <div className="border-t-4 border-blue-700 mt-4 p-8 text-center relative">
        {/* Overlapping image at top of border */}
        <div className="absolute top-0 left-0 -mt-2 ml-2">
          <img
            src="/BrownFirstNews.png"
            alt="Top banner"
            className="h-10 object-cover rounded"
          />
        </div>
        <p className="text-gray-600 mt-6">Loading headlines...</p>
      </div>
    );
  }

  return (
    <div
      className="border-t-4 mt-12 relative"
      style={{ borderTopColor: "#2881D0" }}
    >
      {/* Overlapping image at top of border */}
      <div className="absolute -top-8 left-0 -mt-2">
        <img
          src="/LastHeadline.png"
          alt="Top banner"
          className="h-13 object-cover rounded"
        />
      </div>
      <div className="flex flex-col gap-4 py-4 mt-2">
        {newsData.map((item) => (
          <a
            key={item.id}
            href={`${item.siteName}${item.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 sm:gap-4  pb-2.5 items-start hover:bg-gray-100 p-2  rounded-none transition"
          >
            <div
              className="
                w-[100px] h-[80px]
                sm:w-[140px] sm:h-[100px]
                md:w-[200px] md:h-[130px]
                lg:w-[250px] lg:h-[150px]
                xl:w-[300px] xl:h-[180px]
                overflow-hidden
                
                flex-shrink-0
              "
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col flex-grow">
              <h3
                className="
                  font-semibold
                  text-sm
                  sm:text-base
                  md:text-lg
                  lg:text-xl
                  xl:text-2xl
                  leading-tight
                "
              >
                {truncate(item.title)}
              </h3>
              <div className="flex gap-2 mt-1 flex-wrap">
                <p className="text-xs sm:text-sm text-gray-600">
                  {item.siteName}
                </p>
                <span className="text-xs sm:text-sm text-gray-400 hidden sm:inline">
                  •
                </span>
                <p className="text-xs sm:text-sm">{item.name}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Headlines;
