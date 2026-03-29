"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Papa from "papaparse";

const Page = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery images from Google Sheets CSV
  useEffect(() => {
    const fetchFromGoogleSheets = async () => {
      try {
        setLoading(true);
        // TODO: Replace this URL with the actual Google Sheet CSV URL you will provide
        const sheetUrl =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-6shh7JejH_xcVc7EorS5uPYYpOHRAsVwgz1fDbQa6yvdlhFHupbfAEQIoa8oWOjzuxnTzD0oARQx/pub?output=csv";

        const response = await fetch(sheetUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch Google Sheet data");
        }

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data
              .filter((row) => row.image && row.image.trim() !== "")
              .map((row, index) => ({
                id: row.id || index + 1,
                image: row.image.trim(),
                alt: row.alt?.trim() || row.title?.trim() || "",
                title: row.title?.trim() || "",
              }));

            setImages(parsedData);
          },
          error: (error) => {
            console.error("PapaParse error:", error);
            setImages([]);
          },
        });
      } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFromGoogleSheets();
  }, []);

  const heightClasses = ["h-64", "h-80"];

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Store random heights in state, only on client
  const [randomHeights, setRandomHeights] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      setRandomHeights(
        images.map(
          () => heightClasses[Math.floor(Math.random() * heightClasses.length)],
        ),
      );
    }
  }, [images.length]); // Only re-run when the number of images changes

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="h-32" />
      <div className="text-center mb-12 z-20 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent ">
          Gallery
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
          Explore the memories and milestones of our research journey through
          this curated collection of images.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {randomHeights.length > 0 &&
            images.map((img, idx) => (
              <div
                key={img.$id || img.id || idx}
                className={`relative w-full ${randomHeights[idx]} overflow-hidden rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => openLightbox(idx)}
              >
                {(img.src || img.image) && (
                  <Image
                    src={img.src || img.image}
                    alt={img.alt || img.title || ""}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
        </Masonry>
      )}

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-24 right-12 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200 group"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            <div
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(images[selectedImage]?.src || images[selectedImage]?.image) && (
                <Image
                  src={images[selectedImage].src || images[selectedImage].image}
                  alt={
                    images[selectedImage].alt ||
                    images[selectedImage].title ||
                    ""
                  }
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
