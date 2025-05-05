"use client";

// Under the authors view
import { useEffect, useState } from "react";

interface PopularNewsItem {
  id: number;
  title: string;
  abstract: string;
  url: string;
  path: string;
}

const PopularNews = () => {
  const [newsData, setNewsData] = useState<PopularNewsItem[]>([]);

  useEffect(() => {
    fetch("https://editor.samanyoluhaber.com/api/v1/popular-news", {
      headers: {
        Authorization:
          "Bearer Qp9zY2tAdn38vDb0jXzAEmr0yRwHogZ3spYiEVl1sn5j2zv5QyKN49U6WObVmFbL",
      },
    })
      .then((res) => res.json())
      .then((data) => setNewsData(data.data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "..." : text;

  return (
    <div className="border-t-4 border-red-700 mt-8 relative">
      {/* Overlapping image at top of border */}
      <div className="absolute -top-3.5 left-0 -mt-6 ">
        <img
          src="/BrownFirstNews.png"
          alt="Top banner"
          className=" h-11 object-cover rounded"
        />
      </div>

      <div className="flex flex-col gap-4 pt-4 items-center">
        {newsData.slice(0, 8).map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 border-b-2 mt-2 border-gray-300 items-center hover:bg-gray-100 transition w-full max-w-4xl"
          >
            <div className="min-w-[155px] min-h-[100px] max-w-[155px] max-h-[100px] overflow-hidden ">
              <img
                src={item.path}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center text-left">
              <h3 className="text-lg font-normal">
                {truncate(item.title, 180)}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
