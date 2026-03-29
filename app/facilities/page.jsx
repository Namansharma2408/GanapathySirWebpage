'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Papa from "papaparse";
const FacilityCard = ({ facility, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative group transition-all duration-200 transform ${
        isHovered ? 'scale-105 -translate-y-2' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div className={`absolute left-0 right-0 top-0 bottom-0 max-w-md mx-auto bg-linear-to-r ${facility.gradientFrom} ${facility.gradientTo} rounded-2xl blur-sm transition-opacity duration-500 ${
        isHovered ? 'opacity-70' : 'opacity-0'
      }`}></div>
      
      {/* Main card */}
      <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 w-full max-w-md mx-auto" style={{ minHeight: '420px', height: 'auto' }}>
        <div className="p-5">
          {/* Header with icon and title */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-full bg-linear-to-br ${facility.gradientFrom} ${facility.gradientTo} flex items-center justify-center text-white text-2xl shadow-lg`}>
                {facility.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{facility.name}</h3>
                <p className="text-sm text-gray-600">{facility.category}</p>
              </div>
            </div>
            {!facility.image && (
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                facility.status === 'Available' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : facility.status === 'Maintenance'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {facility.status}
              </div>
            )}
          </div>

          {/* Features list */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Features:</h4>
            <div className="grid grid-cols-1 gap-2">
              {facility.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-linear-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Image - moved below features */}
          {facility.image && (
            <div className="relative h-48 overflow-hidden rounded-xl mb-4">
              <Image 
                src={facility.image} 
                alt={facility.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Image overlay with gradient */}
              <div className={`absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent`}></div>
              {/* Status badge on image */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                facility.status === 'Available' 
                  ? 'bg-green-100/90 text-green-700 border border-green-200/50' 
                  : facility.status === 'Maintenance'
                  ? 'bg-yellow-100/90 text-yellow-700 border border-yellow-200/50'
                  : 'bg-red-100/90 text-red-700 border border-red-200/50'
              }`}>
                {facility.status}
              </div>
            </div>
          )}
        
        </div>
      </div>
    </div>
  );
};
const page = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch facilities from Google Sheets
  useEffect(() => {
    const fetchFromGoogleSheets = async () => {
      try {
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vTN4o_AOl08UFSJSfwREhghbbDjgSPzshPwcsa7xlYpXW8WkgDW2JMtM5PSRFbn4sxovbibg5YXeqJV/pub?output=csv";

        const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv,text/plain,*/*",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Google Sheets data: ${response.status} ${response.statusText}. Make sure the sheet is published to the web.`,
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
              .filter((row) => row.name && row.name.trim() !== "")
              .map((row, index) => ({
                id: row.id || index + 1,
                name: row.name?.trim() || "",
                category: row.category?.trim() || "",
                features: row.features
                  ? row.features
                      .replace(/^\[|\]$/g, '')
                      .split(",")
                      .map((feature) => {
                        let cleaned = feature.replace(/^["'\s]+|["'\s]+$/g, '');
                        // Handle unicode characters sometimes present in CSVs
                        // Replace unicode escapes like u207b and u00b9 with their actual characters
                        // or just replace the corrupted version directly
                        cleaned = cleaned.replace(/\\u207b/g, '⁻').replace(/\\u00b9/g, '¹');
                        cleaned = cleaned.replace(/\\u00b0/g, '°'); // Degree symbol
                        // Also handle if they show up as string literals cm\u207b\u00b9
                        cleaned = cleaned.replace(/cm\\u207b\\u00b9/g, 'cm⁻¹');
                        return cleaned;
                      })
                      .filter(Boolean)
                  : [],
                capacity: row.capacity?.trim() || "",
                location: row.location?.trim() || "",
                status: row.status?.trim() || "Available",
                icon: row.icon?.trim() || "📊",
                gradientFrom: row.gradientFrom?.trim() || "from-blue-400",
                gradientTo: row.gradientTo?.trim() || "to-indigo-500",
                image: row.image?.trim() || "",
                route: row.route?.trim() || "",
              }));
            setFacilities(parsedData);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setFacilities([]);
          },
        });
      } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFromGoogleSheets();
  }, []);

  return (
    <div >
      <div className='h-32'/>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 z-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent ">
            Research Facilities
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore our world-class research facilities equipped with cutting-edge technology and instruments to support advanced scientific research and innovation.
          </p>
        </div>
        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {(facilities || []).map((facility, index) => (
            <FacilityCard
              key={facility.$id || facility.id || index}
              facility={facility}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className='h-32'/>
    </div>
  )
}

export default page