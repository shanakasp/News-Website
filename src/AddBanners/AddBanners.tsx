"use client";

import { FC } from "react";

// Common interface for all ad banner components
interface AdBannerProps {
  className?: string;
  id?: string;
}

// AD-728x90 - Leaderboard Banner (Large)
export const LeaderboardBanner: FC<AdBannerProps> = ({ className, id }) => {
  return (
    <div
      id={id || "ad-leaderboard"}
      className={`w-full max-w-[980px] h-[125px] bg-gray-200 flex items-center justify-center mx-auto ${
        className || ""
      }`}
    >
      <div className="text-gray-500 text-sm flex flex-col items-center">
        <span className="font-semibold">ADVERTISEMENT</span>
        <span>728 x 90</span>
      </div>
    </div>
  );
};

// AD-336x280 - Large Rectangle Banner
export const LargeRectangleBanner: FC<AdBannerProps> = ({ className, id }) => {
  return (
    <div
      id={id || "ad-rectangle"}
      className={`w-full max-w-[3200px] h-[280px] bg-gray-200 flex items-center justify-center mx-auto ${
        className || ""
      }`}
    >
      <div className="text-gray-500 text-sm flex flex-col items-center">
        <span className="font-semibold">ADVERTISEMENT</span>
        <span>336 x 280</span>
      </div>
    </div>
  );
};

// Main component that exports all 5 ad banners with unique IDs
const AdBanners: FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Banner 1: AD-728x90 */}
      <LeaderboardBanner id="ad-leaderboard-1" />

      {/* Banner 2: AD-336x280 */}
      <LargeRectangleBanner id="ad-rectangle-1" />

      {/* Banner 3: AD-728x90 */}
      <LeaderboardBanner id="ad-leaderboard-2" />

      {/* Banner 4: AD-336x280 */}
      <LargeRectangleBanner id="ad-rectangle-2" />

      {/* Banner 5: AD-336x280 */}
      <LargeRectangleBanner id="ad-rectangle-3" />
    </div>
  );
};

// Usage example component showing how to integrate the ad banners
export const AdBannerExample: FC = () => {
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Page Content</h2>

      {/* Ad Banner 1: 728x90 */}
      <LeaderboardBanner id="ad-top" className="my-4" />

      <div className="prose max-w-none">
        <p>Your website content goes here...</p>
      </div>

      {/* Ad Banner 2: 336x280 */}
      <div className="flex justify-center my-6">
        <LargeRectangleBanner id="ad-middle-1" />
      </div>

      <div className="prose max-w-none">
        <p>More of your content here...</p>
      </div>

      {/* Ad Banner 3: 728x90 */}
      <LeaderboardBanner id="ad-middle-2" className="my-4" />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="prose max-w-none">
            <p>Additional content in a two-column layout...</p>
          </div>
        </div>

        <div className="md:w-1/3 space-y-6">
          {/* Ad Banner 4: 336x280 */}
          <LargeRectangleBanner id="ad-sidebar-1" />

          {/* Ad Banner 5: 336x280 */}
          <LargeRectangleBanner id="ad-sidebar-2" />
        </div>
      </div>
    </div>
  );
};

export default AdBanners;
