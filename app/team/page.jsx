"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Papa from "papaparse";

const ProfessorCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group transition-all duration-300 transform ${
        isHovered ? "scale-[1.02] -translate-y-1" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div
        className={`absolute -inset-2 bg-linear-to-r ${member.gradientFrom} ${member.gradientTo} rounded-3xl blur-lg transition-opacity duration-500 ${
          isHovered ? "opacity-30" : "opacity-0"
        }`}
      ></div>

      {/* Main card */}
      <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
        <div className="grid md:grid-cols-5 gap-0">
          {/* Large Profile Image */}
          <div className="md:col-span-2 relative ">
            <div className="h-80 md:h-full overflow-hidden">
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.name || "Team member"}
                  effect="blur"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  height={500}
                  width={500}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-linear-to-r md:bg-linear-to-r from-transparent via-transparent to-black/10"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-3 p-8">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {member.name || "Principal Investigator"}
              </h2>
              <p className="text-lg text-purple-600 font-semibold mb-2">
                {member.position || "Professor"}
              </p>
              <p className="text-gray-600">
                {member.department || "Chemistry Department"}
              </p>
            </div>

            {/* Research Focus */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Research Focus
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {member.specialization || "Research focus not available"}
              </p>
            </div>

            {/* Skills */}
            {Array.isArray(member.skills) && member.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={`${member.id || member.$id}-skill-${idx}`}
                      className="px-3 py-1 bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium rounded-full border border-purple-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Links */}
            <div className="flex space-x-4">
              {member.email && (
                <a href={`mailto:${member.email}`}>
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors">
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span className="text-sm font-medium">Email</span>
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group transition-all duration-300 transform ${
        isHovered ? "scale-105 -translate-y-2" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div
        className={`absolute -inset-1 bg-linear-to-r ${member.gradientFrom} ${member.gradientTo} rounded-2xl blur-sm transition-opacity duration-500 ${
          isHovered ? "opacity-40" : "opacity-0"
        }`}
      ></div>

      {/* Main card */}
      <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Profile Image */}
        <div className="relative h-120 overflow-hidden flex items-center justify-center">
          {member.image && (
            <Image
              src={member.image}
              alt={member.name || "Student"}
              fill
              className="object-cover object-center transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Image overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
          {/* Role badge */}
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/90 text-gray-700 border border-white/50`}
          >
            {member.role || "Student"}
          </div>
        </div>

        <div className="p-5">
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {member.name || "Student Name"}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {member.position || "Student"}
            </p>
          </div>

          {/* Research Focus - Brief */}
          <div className="mb-4">
            <p className="text-s text-gray-900 leading-relaxed line-clamp-2">
              Research Area :{" "}
              {member.specialization
                ? member.specialization.split(".")[0]
                : "Not specified"}
              .
            </p>
          </div>
          {member.role === "PhD" && (
            <div className="mb-4">
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                BSc : {member.bsc || "N/A"}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                MSc : {member.msc || "N/A"}
              </p>
            </div>
          )}

          {/* Contact Links - Compact */}
          <div className="flex justify-center space-x-3 pt-3 border-t border-gray-200/50">
            {member.email && (
              <a href={`mailto:${member.email}`}>
                <button className="p-2 rounded-full bg-blue-100/60 hover:bg-blue-200 text-blue-600 transition-colors">
                  <svg
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  const [principalInvestigator, setPrincipalInvestigator] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPIFromGoogleSheets = async () => {
      try {
        // Update this URL to point to your Principal Investigator CSV
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPiGnYLoOYt-6s7HXSDnhSKuizoGPcNxCaTna3sl0uDWtky3VkLZNBs_TEZae0b0PGZH60zBS-J9oa/pub?output=csv";

        const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv,text/plain,*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch PI data");
        }

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          complete: (results) => {
            if (results.errors && results.errors.length > 0) {
              console.warn("CSV parsing warnings:", results.errors);
            }

            const parsedData = results.data
              .filter((row) => row.name && row.name.trim() !== "")
              .map((row, index) => ({
                id: row.id || index + 1,
                name: row.name?.trim() || "",
                position: row.position?.trim() || "",
                role: row.role?.trim() || "PI",
                department: row.department?.trim() || "Chemistry Department",
                specialization: row.specialization?.trim() || "",
                skills: row.skills
                  ? row.skills
                      .replace(/^\[|\]$/g, '')
                      .split(",")
                      .map((skill) => skill.replace(/^["'\s]+|["'\s]+$/g, '').trim())
                      .filter(Boolean)
                  : [],
                image:
                  typeof row.image === "string" &&
                  (row.image.trim().startsWith("http") ||
                    row.image.trim().startsWith("/"))
                    ? row.image.trim()
                    : "",
                email: row.email?.trim() || "",
                linkedin: row.linkedin?.trim() || "#",
                researchgate: row.researchgate?.trim() || "#",
                gradientFrom: row.gradientFrom?.trim() || "from-purple-500",
                gradientTo: row.gradientTo?.trim() || "to-blue-600",
              }));

            if (parsedData.length > 0) {
              setPrincipalInvestigator(parsedData[0]);
            }
          },
          error: (error) => {
            console.error("Error parsing PI CSV:", error);
          },
        });
      } catch (error) {
      }
    };

    fetchPIFromGoogleSheets();
  }, []);

  useEffect(() => {
    const fetchFromGoogleSheets = async () => {
      try {
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1VJFnoJ8Pu1SE41-qNcdmYAjx-ePkr1OfvjvplTnJpPsxWoCEvFa4O5dfbLWl-4zHdiRdDc88fSUb/pub?output=csv";

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
                position: row.position?.trim() || "",
                role: row.role?.trim() || "",
                department: row.department?.trim() || "Chemistry Department",
                specialization: row.specialization?.trim() || "",
                image:
                  typeof row.image === "string" &&
                  (row.image.trim().startsWith("http") ||
                    row.image.trim().startsWith("/"))
                    ? row.image.trim()
                    : "",
                email: row.email?.trim() || "",
                linkedin: row.linkedin?.trim() || "",
                gradientFrom: row.gradientFrom?.trim() || "from-blue-500",
                gradientTo: row.gradientTo?.trim() || "to-indigo-600",
                bsc: row.bsc?.trim() || "",
                msc: row.msc?.trim() || "",
                skills: row.skills
                  ? row.skills
                      .replace(/^\[|\]$/g, '')
                      .split(",")
                      .map((skill) => skill.replace(/^["'\s]+|["'\s]+$/g, '').trim())
                      .filter((skill) => skill)
                  : [],
              }));
            setStudents(parsedData);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setStudents([]);
          },
        });
      } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFromGoogleSheets();
  }, []);


  return (
    <div className="max-w-full h-1/2 mx-auto ">
      <div className="h-32" />
      {/* Header Section */}
      <div className="relative text-center mb-16 overflow-hidden rounded-3xl h-[50vh] min-h-100">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dicnppgsn/image/upload/v1762179128/team_s2tb1t.jpg')",
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60"></div>
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full ">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Our Research Team
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Meet the dedicated researchers driving innovation in organic
              chemistry and drug discovery
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      ) : (
        <>
          {/* Principal Investigator Section - Full Width Featured Card */}
          {principalInvestigator && (
            <div className="mb-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Principal Investigator
                </h2>
                <div className="w-24 h-1 bg-linear-to-r from-purple-500 to-blue-600 mx-auto rounded-full"></div>
              </div>
              <ProfessorCard member={principalInvestigator} />
            </div>
          )}

          {/* PhD Students Section */}
          {students.filter((student) => student.role === "PhD").length >
            0 && (
            <div className="mb-20">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  PhD Students
                </h2>
                <div className="w-16 h-1 bg-linear-to-r from-green-500 to-teal-600 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {students.map(
                  (student) =>
                    student.role === "PhD" && (
                      <StudentCard
                        key={student.$id || student.id}
                        member={student}
                      />
                    ),
                )}
              </div>
            </div>
          )}

          {/* MSc Students Section */}
          {students.filter((student) => student.role === "MSc").length >
            0 && (
            <div className="mb-20">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  MSc Students
                </h2>
                <div className="w-16 h-1 bg-linear-to-r from-orange-500 to-red-600 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {students.map(
                  (student) =>
                    student.role === "MSc" && (
                      <StudentCard
                        key={student.$id || student.id}
                        member={student}
                      />
                    ),
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
