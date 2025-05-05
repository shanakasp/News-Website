"use client";

//Main headline

import {
  LargeRectangleBanner,
  LeaderboardBanner,
} from "@/AddBanners/AddBanners";
import { useEffect, useState } from "react";
import LastHeadlines from "./LastHeadlines";
import NewsGrid from "./NewsGrid";
import PopularNews from "./PopularNews";
import TopNews from "./TopNews";

export default function NewsSection() {
  const [headlines, setHeadlines] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(15); // Changed to 15 based on your request
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  // API authentication token
  const API_TOKEN =
    "Qp9zY2tAdn38vDb0jXzAEmr0yRwHogZ3spYiEVl1sn5j2zv5QyKN49U6WObVmFbL"; // Replace with your actual token

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
    const fetchHeadlines = async () => {
      try {
        setLoading(true);
        // Fetch all 15 headlines at once
        const response = await fetch(
          "https://editor.samanyoluhaber.com/api/v1/headlines?limit=15",
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === "success" && data.data.length > 0) {
          // Store all headlines
          setHeadlines(data.data);
          // Update total pages based on actual data length
          setTotalPages(data.data.length);
        }
      } catch (error) {
        console.error("Error fetching headlines:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://editor.samanyoluhaber.com/api/v1/authors?limit=5",
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setAuthors(data.data);
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchHeadlines();
    fetchAuthors();
  }, []); // Removed currentPage dependency since we're fetching all headlines at once

  // Function to get appropriate text length based on screen size
  const getTextLength = () => {
    if (windowWidth < 640) {
      // xs screens
      return 40;
    } else if (windowWidth < 768) {
      // sm screens
      return 60;
    } else if (windowWidth < 1024) {
      // md screens
      return 80;
    } else {
      return 100; // lg screens and above
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of the news section when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPagination = () => {
    // For small screens (less than 640px), show a simplified pagination
    if (windowWidth < 640) {
      return (
        <div className="flex justify-center items-center w-full">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-600 hover:text-blue-600 disabled:opacity-50"
            aria-label="Previous page"
          >
            &lt;
          </button>

          <span className="mx-4 text-sm">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-600 hover:text-blue-600 disabled:opacity-50"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      );
    }

    // For medium screens (640px to 768px), show limited pagination
    if (windowWidth < 768) {
      const pages = [];

      // Previous button
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-gray-600 hover:text-blue-600 text-sm"
        >
          Prev
        </button>
      );

      // Current page
      pages.push(
        <button
          key={currentPage}
          className="px-3 py-1 rounded-full mx-1 bg-blue-100 text-blue-600 font-bold text-sm"
        >
          {currentPage}
        </button>
      );

      // Page count indicator
      pages.push(
        <span key="count" className="text-xs text-gray-500 mx-1">
          of {totalPages}
        </span>
      );

      // Next button
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-gray-600 hover:text-blue-600 text-sm"
        >
          Next
        </button>
      );

      return pages;
    }

    // For large screens, show full pagination
    const pages = [];
    // Calculate visible page range
    let startPage, endPage;

    if (totalPages <= 5) {
      // If total pages is 5 or less, show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // Determine page range based on current page
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-gray-600 hover:text-blue-600 sm:px-4 sm:py-2"
      >
        Previous
      </button>
    );

    // First Page (if not in range)
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-full mx-1 text-gray-600 hover:bg-gray-100 sm:px-4 sm:py-2"
        >
          1
        </button>
      );

      // Ellipsis if needed
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-1 sm:px-2">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-full mx-1 sm:px-4 sm:py-2 ${
            currentPage === i
              ? "bg-blue-100 text-blue-600 font-bold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="end-ellipsis" className="px-1 sm:px-2">
          ...
        </span>
      );
    }

    // Last Page (if not in range)
    if (endPage < totalPages) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-full mx-1 text-gray-600 hover:bg-gray-100 sm:px-4 sm:py-2"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-gray-600 hover:text-blue-600 sm:px-4 sm:py-2"
      >
        Next
      </button>
    );

    return pages;
  };

  // Get the current headline based on the current page
  const currentHeadline =
    headlines.length > 0 ? headlines[currentPage - 1] : null;

  return (
    <div className="container mx-auto px-4 mt-42 ">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main News Content */}
        <div className="lg:w-2/3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Single Featured News */}
              {currentHeadline && (
                <div className="mb-8 pb-6 relative  ">
                  {/* 16:9 aspect ratio container */}
                  <div
                    className="relative w-full mb-4"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <img
                      src={currentHeadline.image_url}
                      alt={currentHeadline.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Gradient overlay from black to transparent */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent p-4 flex items-end">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {currentHeadline.title}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
              {/* Pagination */}
              <div className="flex flex-wrap justify-center items-center -mt-15 mb-10 px-1">
                {renderPagination()}
              </div>
              <LeaderboardBanner id="top-ad" className="my-4 mb-6" />
            </>
          )}
          <NewsGrid />
          <LastHeadlines />
        </div>

        {/* Authors Section */}
        <div className="lg:w-1/3 relative mt-8">
          {/* Decorative top-left image */}
          <img
            src="/authors.png" // Update this path to your actual image path
            alt="Decoration"
            className="absolute -top-8 -left-0 h-10 z-10"
          />
          <div className="bg-white py-2 border-t-4 border-orange-800">
            <div className="space-y-3">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 mt-3 pb-3 "
                >
                  <div className="flex-shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] relative">
                    <img
                      src={author.image_path}
                      alt={author.title.split("Harun Tokak")[0]}
                      className="object-cover w-full h-full" // Removed "rounded" class
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold uppercase mb-1 text-sm sm:text-base">
                      {author.title.includes("Harun Tokak")
                        ? "HARUN TOKAK"
                        : author.title.split(" ")[0] +
                          " " +
                          author.title.split(" ")[1]}
                    </h3>
                    <p className="text-xs sm:text-sm line-clamp-2">
                      {author.body
                        ? author.body
                            .replace(/<[^>]*>/g, "")
                            .substring(0, getTextLength())
                        : ""}
                      {author.body && author.body.length > getTextLength()
                        ? "..."
                        : ""}
                    </p>
                  </div>
                </div>
              ))}
              <LargeRectangleBanner id="content-ad" className="my-6" />
            </div>
          </div>
          <PopularNews />
          <LargeRectangleBanner id="content-ad" className="my-6" /> <TopNews />
          <LargeRectangleBanner id="content-ad" className="my-6" />
        </div>
      </div>
    </div>
  );
}
