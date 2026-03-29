'use client'
import React from 'react'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Papa from "papaparse";
const page = () => {
  // const researchAreas = [
  //   {
  //     id: 1,
  //     title: "Photocatalysis",
  //     description: "Developing novel photocatalytic systems for sustainable organic synthesis using visible light-responsive catalysts and green chemistry principles.",
  //     features: ["Synthetic Methodology", "Drug Discovery", "Reaction Mechanisms", "Molecular Design"],
  //     gradient: "from-gray-300 to-gray-400",
  //     shadow: "shadow-lg shadow-gray-300/50"
  //   },
  //   {
  //     id: 2,
  //     title: "Electrocatalysis",
  //     description: "Advancing electrocatalytic methodologies for efficient chemical transformations and energy conversion applications.",
  //     features: ["Green Chemistry", "Sustainable Processes", "Catalyst Design", "Industrial Applications"],
  //     gradient: "from-gray-400 to-gray-500",
  //     shadow: "shadow-lg shadow-gray-400/50"
  //   },
  //   {
  //     id: 3,
  //     title: "Total Synthesis and Natural Products",
  //     description: "Exploring innovative strategies for the total synthesis of complex natural products and the development of new synthetic methodologies.",
  //     features: ["Natural Products", "Complex Molecules", "Synthetic Routes", "Method Development"],
  //     gradient: "from-gray-200 to-gray-300",
  //     shadow: "shadow-lg shadow-gray-200/50"
  //   },
  // ];

  const [researchAreas, setresearchAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFromGoogleSheets = async () => {
      setLoading(true);
      try {
        // You can update this URL to point to your research areas CSV
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6suZlIkrL5zkAnmDTOCQi7wTQJoYSDQ9e5eoim4pQQBsIXB67j7JsahL2jiJhmFhxNd9ixiHj3diC/pub?output=csv";

        const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv,text/plain,*/*",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Google Sheets data: ${response.status} ${response.statusText}.`
          );
        }

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => {
            return header.trim();
          },
          complete: (results) => {
            if (results.errors && results.errors.length > 0) {
              console.warn("CSV parsing warnings:", results.errors);
            }

            const parsedData = results.data
              .filter((row) => row.title && row.title.trim() !== "")
              .map((row, index) => ({
                id: row.id || index + 1,
                title: row.title?.trim() || "",
                description: row.description?.trim() || "",
                features: row.features
                  ? row.features
                      .replace(/^\[|\]$/g, '')
                      .split(",")
                      .map((feature) => {
                        let cleaned = feature.replace(/^["'\s]+|["'\s]+$/g, '');
                        // Handle unicode characters sometimes present in CSVs
                        cleaned = cleaned.replace(/\\u207b/g, '⁻').replace(/\\u00b9/g, '¹').replace(/\\u00b0/g, '°');
                        cleaned = cleaned.replace(/cm\\u207b\\u00b9/g, 'cm⁻¹');
                        return cleaned;
                      })
                      .filter(Boolean)
                  : [],
                image: row.image?.trim() || "",
                gradient: row.gradient?.trim() || "from-gray-300 to-gray-400",
                shadow: row.shadow?.trim() || "shadow-lg shadow-gray-300/50",
              }));
            setresearchAreas(parsedData);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setresearchAreas([]);
          },
        });
      } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
        setresearchAreas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFromGoogleSheets();
  }, []);
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className='h-32'/>
      <div className="text-center mb-12 z-20 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mt-12">
          Research Areas
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
          Exploring the frontiers of chemistry through innovative research and cutting-edge technology
        </p>
      </div>
      {/* Research Areas Zigzag */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
            <p className="mt-4 text-gray-600">Loading research areas...</p>
          </div>
        ) : researchAreas.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No research areas available at the moment.</p>
          </div>
        ) : (
          researchAreas.map((area, index) => (

          <div
            key={area.$id || area.id || `research-area-${index}`}
            className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } h-[50vh] min-h-100`}
          >
            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center p-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {area.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {area.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Array.isArray(area.features) && area.features.map((feature, idx) => (
                  <div key={`${area.id}-feature-${idx}`} className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-300 w-fit shadow-lg shadow-gray-400/50"
              >
                Learn More
              </button>
            </div>

            {/* Image Section */}
            <div className="flex-1 relative h-full">
              <div className="relative h-full group">
                {/* Background glow */}
                <div className="absolute -inset-4 bg-linear-to-r from-gray-200/20 to-gray-300/20 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

                {/* Main image container */}

                <div className="h-full rounded-xl overflow-hidden">
                  <div className='h-full rounded-xl overflow-hidden shadow-2xl bg-gray-100'>
                    {area.image && <Image
                      src={area.image}
                      alt={area.title}
                      effect="blur"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 shadow-2xl"
                      style={{ boxShadow: '0 8px 32px 0 rgba(60,60,60,0.25)' }}
                      fill
                    />}
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⚗️</span>
                  </div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl">🧪</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ))
        )}
      </div>


    </div>
  )
}

export default page