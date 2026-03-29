"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Papa from "papaparse";
const PublicationCard = ({ publication, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition-all duration-200 shrink-0 w-full ${
        isHovered ? "shadow-lg" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card with clean academic design */}
      <a href={publication.link}>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
          {/* Publication Header */}
          <div className="bg-blue-50 border-b border-blue-100 p-4">
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📄</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-blue-600 font-medium text-sm">
                  {publication.journal} {publication.year}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 ">
            {/* Mobile Layout: Content at top, then both images stacked below */}
            <div className="block md:hidden georgia-font">
              {/* Main content */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-800 leading-tight mb-3">
                  {index === 0 ? (
                    <>
                      {index + 1}.{" "}
                      <span className="underline text-blue-900 hover:text-blue-700">
                        {publication.title}
                      </span>
                    </>
                  ) : (
                    <>
                      {index + 1}. {publication.title}
                    </>
                  )}
                </h3>
                {/* Authors */}
                <div className="mb-4">
                  <p className="text-gray-700 text-sm">
                    {publication.mainAuthor && (
                      <span>
                        {Array.isArray(publication.mainAuthor)
                          ? publication.mainAuthor.join(", ")
                          : publication.mainAuthor}
                      </span>
                    )}
                    {publication.sideAuthor &&
                      publication.sideAuthor.length > 0 && (
                        <span>
                          {publication.mainAuthor ? ", " : ""}
                          {Array.isArray(publication.sideAuthor)
                            ? publication.sideAuthor.join(", ")
                            : publication.sideAuthor}
                        </span>
                      )}
                    {publication.starAuthors &&
                      publication.starAuthors.length > 0 && (
                        <span>
                          {publication.mainAuthor ||
                          (publication.sideAuthor &&
                            publication.sideAuthor.length > 0)
                            ? ", "
                            : ""}
                          <span className="font-bold">
                            {Array.isArray(publication.starAuthors)
                              ? publication.starAuthors.map((author, idx) => (
                                  <span key={idx}>
                                    {author}*
                                    {idx < publication.starAuthors.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                ))
                              : `${publication.starAuthors}*`}
                          </span>
                        </span>
                      )}
                    {!publication.mainAuthor &&
                      publication.authors &&
                      Array.isArray(publication.authors) &&
                      publication.authors.map((author, idx) => (
                        <span key={idx}>
                          <span
                            className={
                              author.isCorresponding ? "font-bold" : ""
                            }
                          >
                            {author.name} {author.isCorresponding ? "*" : ""}
                          </span>
                          {idx < publication.authors.length - 1 && ", "}
                        </span>
                      ))}
                    {!publication.mainAuthor && !publication.authors && (
                      <span className="text-gray-500 italic">
                        Authors not available
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Images stacked vertically in mobile */}
              <div className="space-y-4 ">
                {/* Main image - fixed size for consistency */}
                <div className="w-full flex justify-center ">
                  {publication.image && (
                    <Image
                      src={publication.image}
                      alt={publication.title}
                      width={800} // Fixed width
                      height={500} // Fixed height for 16:10 ratio
                      style={{ width: "100%", height: "auto" }}
                      className="object-cover rounded"
                    />
                  )}
                </div>
                {/* Research image below - centered and fixed size */}
                <div className="w-full flex justify-center">
                  {publication.researchImage && (
                    <Image
                      src={publication.researchImage}
                      alt={publication.title}
                      width={300} // Smaller fixed width
                      height={200} // Fixed height for consistency
                      style={{ width: "100%", height: "auto", maxWidth: "300px" }}
                      className="object-cover rounded border"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Layout: Side-by-side with consistent sizing */}
            <div className="hidden md:flex">
              <div
                className="flex w-full georgia-font"
                style={{ minHeight: "200px" }}
              >
                {/* Left 75%: Main content at top, image below */}
                <div className="flex flex-col w-3/4 pr-4">
                  {/* Main content at top left */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-blue-800 leading-tight mb-3">
                      {index === 0 ? (
                        <>
                          {index + 1}.{" "}
                          <span className="underline text-blue-900 hover:text-blue-700">
                            {publication.title}
                          </span>
                        </>
                      ) : (
                        <>
                          {index + 1}. {publication.title}
                        </>
                      )}
                    </h3>
                    {/* Authors */}
                    <div className="mb-3">
                      <p className="text-gray-700 text-sm">
                        {publication.mainAuthor && (
                          <span>
                            {Array.isArray(publication.mainAuthor)
                              ? publication.mainAuthor.join(", ")
                              : publication.mainAuthor}
                          </span>
                        )}
                        {publication.sideAuthor &&
                          publication.sideAuthor.length > 0 && (
                            <span>
                              {publication.mainAuthor ? ", " : ""}
                              {Array.isArray(publication.sideAuthor)
                                ? publication.sideAuthor.join(", ")
                                : publication.sideAuthor}
                            </span>
                          )}
                        {publication.starAuthors &&
                          publication.starAuthors.length > 0 && (
                            <span>
                              {publication.mainAuthor ||
                              (publication.sideAuthor &&
                                publication.sideAuthor.length > 0)
                                ? ", "
                                : ""}
                              <span className="font-bold">
                                {Array.isArray(publication.starAuthors)
                                  ? publication.starAuthors.map(
                                      (author, idx) => (
                                        <span key={idx}>
                                          {author}*
                                          {idx <
                                          publication.starAuthors.length - 1
                                            ? ", "
                                            : ""}
                                        </span>
                                      ),
                                    )
                                  : `${publication.starAuthors}*`}
                              </span>
                            </span>
                          )}
                        {!publication.mainAuthor &&
                          publication.authors &&
                          Array.isArray(publication.authors) &&
                          publication.authors.map((author, idx) => (
                            <span key={idx}>
                              <span
                                className={
                                  author.isCorresponding ? "font-bold" : ""
                                }
                              >
                                {author.name}{" "}
                                {author.isCorresponding ? "*" : ""}
                              </span>
                              {idx < publication.authors.length - 1 && ", "}
                            </span>
                          ))}
                        {!publication.mainAuthor && !publication.authors && (
                          <span className="text-gray-500 italic">
                            Authors not available
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {/* Image below main content - fixed size */}
                  <div className="w-full flex justify-center mt-4">
                    {publication.image && (
                      <Image
                        src={publication.image}
                        alt={publication.title}
                        width={800} // Fixed width
                        height={400} // Fixed height
                        style={{ width: "100%", height: "auto" }}
                        className="object-cover rounded border"
                      />
                    )}
                  </div>
                </div>
                {/* Right 25%: Research image - fixed size and centered */}
                <div className="w-1/4 flex items-center justify-center">
                  <div className="bg-gray-100 rounded border p-2 flex justify-center">
                    {publication.researchImage && (
                      <Image
                        src={publication.researchImage}
                        alt={publication.title}
                        width={200} // Fixed width
                        height={150} // Fixed height
                        style={{ width: "100%", height: "auto", maxWidth: "200px" }}
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const StudentCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group transition-all duration-300 transform ${
        isHovered ? "scale-105 -translate-y-2 z-50" : "scale-100 z-0"
      } `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div
        className={`absolute -inset-1 bg-linear-to-r ${member.gradientFrom} ${
          member.gradientTo
        } rounded-2xl blur-sm transition-opacity duration-500 ${
          isHovered ? "opacity-40" : "opacity-0"
        }`}
      ></div>

      {/* Main card */}
      <div className="relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 w-72 sm:w-80 md:w-85 lg:w-95 xl:w-105 2xl:w-120">
        {/* Profile Image */}
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 xl:h-85 2xl:h-95 overflow-hidden flex items-center justify-center">
          {member?.image && (
            <Image
              src={member.image}
              alt={member.name}
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              width="480"
              height="380"
            />
          )}
          {/* Image overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
          {/* Role badge */}
          <div
            className={`absolute top-3 right-3 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium backdrop-blur-sm bg-white/90 text-gray-700 border border-white/50`}
          >
            {member.role}
          </div>
        </div>

        <div className="p-4 md:p-5 lg:p-6 xl:p-8">
          {/* Header */}
          <div className="text-center mb-3 md:mb-4">
            <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 mb-1">
              {member.name}
            </h3>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 font-medium">
              {member.position}
            </p>
          </div>
          {/* Contact Links - Compact */}
          <div className="flex justify-center space-x-3 pt-3 border-t border-gray-200/50">
            {member.email && (
              <button className="p-2 lg:p-3 rounded-full bg-blue-100/60 hover:bg-blue-200 text-blue-600 transition-colors">
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const Landingbackground = () => {
  return (
    <div className="w-full h-screen bg-slate-200 overflow-hidden">
      <Image
        src="https://res.cloudinary.com/dicnppgsn/image/upload/v1762187983/landingBackground_rzvvvq.jpg"
        alt="Landing Background"
        effect="blur"
        className="w-full h-full object-cover object-center"
        fill
      />
    </div>
  );
};
const GlassEffectBg = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-screen z-1"
      style={{
        background: "rgba(255,255,255,0.65)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(2px) saturate(180%)",
        WebkitBackdropFilter: "blur(2px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.25)",
      }}
    ></div>
  );
};

// Fallback data moved outside component to avoid React Hook warnings

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [researchAreas, setResearchAreas] = useState([]);
  const [publications, setPublications] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch research interests from API
  useEffect(() => {
    const fetchResearchFromSheets = async () => {
      try {
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6suZlIkrL5zkAnmDTOCQi7wTQJoYSDQ9e5eoim4pQQBsIXB67j7JsahL2jiJhmFhxNd9ixiHj3diC/pub?output=csv";

        const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv,text/plain,*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch research data");
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
              .filter((row) => row.title && row.title.trim() !== "")
              .map((row, index) => ({
                id: row.id || index + 1,
                title: row.title?.trim() || "",
                description: row.description?.trim() || "",
                image:
                  typeof row.image === "string" &&
                  (row.image.trim().startsWith("http") ||
                    row.image.trim().startsWith("/"))
                    ? row.image.trim()
                    : null,
              }));

            if (parsedData.length > 0) {
              setResearchAreas(parsedData);
            }
          },
          error: (error) => {
            console.warn("Failed to parse research interests:", error);
          },
        });
      } catch (err) {
        console.warn("Failed to fetch research interests:", err);
      }
    };

    fetchResearchFromSheets();
  }, []);

  // Fetch publications from Google Sheets
  useEffect(() => {
    const fetchPublicationsFromSheets = async () => {
      try {
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPnZVsvsP1Ecgv-iVWKs_rTGgOCMp68gFDzFBmDE-3SpJZE6UINUrwVZbIjOVoR5SWOublOe1cP1Ui/pub?output=csv";

        const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv,text/plain,*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch publications data");
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
              .filter((row) => row.title && row.title.trim() !== "")
              .map((row, index) => {
                let sideAuthor = [];
                if (row.sideAuthor) {
                  sideAuthor = row.sideAuthor
                    .replace(/^\[|\]$/g, "")
                    .split(",")
                    .map((a) => a.replace(/^["'\s]+|["'\s]+$/g, "").trim())
                    .filter(Boolean);
                }

                let starAuthors = [];
                if (row.starAuthors) {
                  starAuthors = row.starAuthors
                    .replace(/^\[|\]$/g, "")
                    .split(",")
                    .map((a) => a.replace(/^["'\s]+|["'\s]+$/g, "").trim())
                    .filter(Boolean);
                }

                return {
                  id: row.$id || row.id || index + 1,
                  title: row.title?.trim() || "",
                  journal: row.journal?.trim() || "",
                  link: row.doi?.trim() || "#",
                  mainAuthor: row.mainAuthor?.trim() || "",
                  sideAuthor: sideAuthor,
                  starAuthors: starAuthors,
                  year: row.year?.trim() || "",
                  image:
                    typeof row.image === "string" &&
                    (row.image.trim().startsWith("http") ||
                      row.image.trim().startsWith("/"))
                      ? row.image.trim()
                      : "",
                  researchImage:
                    typeof row.researchImage === "string" &&
                    (row.researchImage.trim().startsWith("http") ||
                      row.researchImage.trim().startsWith("/"))
                      ? row.researchImage.trim()
                      : "",
                };
              });

            if (parsedData.length > 0) {
              setPublications(parsedData);
            }
          },
          error: (error) => {
            console.warn("Failed to parse publications:", error);
          },
        });
      } catch (err) {
        console.warn("Failed to fetch publications:", err);
      }
    };

    fetchPublicationsFromSheets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === publications.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [publications.length]);

  // Fetch facilities from Google Sheets
  useEffect(() => {
    const fetchFacilitiesFromSheets = async () => {
      try {
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vQw2MWX1hvt6TrYrf4Gw3_zZi-3rOLf3_UKPbEY0dr3YMwqAaRNsisJsuwXVSXv6b8o9xCKOPetBHKv/pub?output=csv";

        const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
          cache: "no-store",
          headers: {
            Accept: "text/csv,text/plain,*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch facilities data");
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
                id: row.$id || row.id || index + 1,
                name: row.name?.trim() || "",
              }));

            if (parsedData.length > 0) {
              setFacilities(parsedData);
            }
          },
          error: (error) => {
            console.warn("Failed to parse facilities:", error);
          },
        });
      } catch (err) {
        console.warn("Failed to fetch facilities:", err);
      }
    };

    fetchFacilitiesFromSheets();
  }, []);

  // Fallback team members data

  // Fetch team members from Google Sheets
  useEffect(() => {
    const fetchTeamFromGoogleSheets = async () => {
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
          throw new Error("Failed to fetch Google Sheets data for team");
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
              }));

            if (parsedData.length > 0) {
              setTeamMembers(parsedData);
            }
          },
          error: (error) => {
            console.error("Error parsing team CSV:", error);
          },
        });
      } catch (error) {
        console.error("Error fetching team from Google Sheets:", error);
      }
    };

    fetchTeamFromGoogleSheets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arr = useMemo(() => teamMembers, [teamMembers]);
  return (
    <div>
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Landingbackground />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GlassEffectBg />
      </div>
      <div
        className="w-full h-full  flex items-center justify-center py-10 md:py-20 relative z-10"
        style={{ minHeight: "100vh" }}
      >
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center max-w-6xl relative z-20">
          <div className="w-full relative z-30 flex justify-center items-center">
            {/* Glassy Card Container */}
            <div className="relative w-full max-w-4xl z-40">
              <div className="relative z-50">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent relative z-60 leading-tight px-4">
                  Welcome to The Chemical Synthesis Group
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-800 mb-1 font-medium text-center relative z-60 mt-4 px-4">
                  Exploring organic synthesis through photocatalysis and
                  electrocatalysis
                </p>
              </div>

              {/* Subtle glow effect around card */}
              <div className="absolute -inset-1 bg-linear-to-r from-purple-200/20 via-blue-200/20 to-indigo-200/20 rounded-2xl blur-sm z-10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 relative z-50 ">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold italic mb-6 bg-linear-to-r from-purple-700 to-blue-800 bg-clip-text text-transparent ">
            Research Interests
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed  ">
            Our research explores cutting-edge areas of chemistry at the intersection of photocatalysis, electrocatalysis, and organic synthesis. By integrating these complementary disciplines, we aim to develop sustainable and efficient catalytic systems for the activation of small molecules and the construction of complex organic frameworks.
          </p>
        </div>

        {/* Cards Container */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {researchAreas.map((area, index) => (
            <div key={area.$id || area.id || index} className="group relative">
              {/* Card with Glass Morphism Effect */}
              <div className="relative backdrop-blur-xl border bg-white border-white/40 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  {area?.image && (
                    <Image
                      src={area.image}
                      alt={area?.title}
                      effect="blur"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                <div className="relative top-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-black drop-shadow-lg">
                    {area.title}
                  </h3>
                </div>
                {/* Content Section */}
                <div className="p-6 h-fit">
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                    {area.description}
                  </p>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute -inset-1 bg-linear-to-r from-purple-200/0 via-blue-200/0 to-indigo-200/0 group-hover:from-purple-200/20 group-hover:via-blue-200/20 group-hover:to-indigo-200/20 rounded-2xl blur-sm -z-10 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 relative z-50 bg-gray-100">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Recent Publications
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Explore our latest research contributions and scientific discoveries
            in organic synthesis, catalysis, and materials science.
          </p>
        </div>

        {/* Sliding Publications Container */}
        <div className="w-full max-w-6xl overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Move by 100% of container width
            }}
          >
            {publications.map((publication, index) => (
              <PublicationCard
                key={publication.$id || publication.id || index}
                publication={publication}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center mt-8 space-x-3">
          {publications.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* View All Publications Button */}
        <div className="mt-12">
          <button className="px-8 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
            View All Publications
          </button>
        </div>
      </div>

      {/* Team Section with Swiper Slider */}
      <div className="relative z-50  py-16 lg:py-24 ">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
              Meet our dedicated team of researchers and students working on
              cutting-edge projects in organic synthesis and catalysis.
            </p>
          </div>
        </div>

        {/* Swiper Slider with fade edges */}
        <div className="relative  w-full py-12">
          {/* Left fade overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 xl:w-40 bg-linear-to-r from-white/90 via-white/50 to-transparent z-10 pointer-events-none"></div>
          {/* Right fade overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 xl:w-40 bg-linear-to-l from-white/90 via-white/50 to-transparent z-10 pointer-events-none"></div>

          <div className="px-4 md:px-8 lg:px-12 ">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView="auto"
              centeredSlides={false}
              loop={true}
              speed={6000}
              allowTouchMove={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              breakpoints={{
                640: {
                  spaceBetween: 40,
                },
                1024: {
                  spaceBetween: 50,
                },
                1400: {
                  spaceBetween: 60,
                },
              }}
              className="team-swiper py-24 "
            >
              {[...arr, ...arr, ...arr, ...arr].map((student, index) =>
                student.id === 1 ? null : (
                  <SwiperSlide
                    key={`${student.$id || student.id}-${index}`}
                    style={{ width: "auto" }}
                    className="flex items-center justify-center  my-12"
                  >
                    <StudentCard member={student} />
                  </SwiperSlide>
                ),
              )}
            </Swiper>
          </div>
        </div>
      </div>

      <div
        id="trigger"
        className="w-full  flex flex-col items-center  py-16 px-4 relative z-50 bg-gray-100"
      >
        {/* Header Section */}
        <div className="text-center mb-12 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            All Facilities
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Explore our state-of-the-art facilities at IIT Bhilai and resources
            for research and collaboration.
          </p>
        </div>
        {/* Facilities Card */}
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col items-center">
          {(() => {
            // Extract facility names from fetched data
            const facilityNames = facilities.map(
              (f) => f.name || f.title || "Unknown Facility",
            );

            // Split into 3 columns
            const colLength = Math.ceil(facilityNames.length / 3);
            const columns = [
              facilityNames.slice(0, colLength),
              facilityNames.slice(colLength, colLength * 2),
              facilityNames.slice(colLength * 2),
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full">
                {columns.map((col, colIdx) => (
                  <ul key={colIdx} className="space-y-4">
                    {col.map((facility, idx) => (
                      <li
                        key={facility + idx}
                        className="text-lg md:text-xl text-gray-800 font-medium flex items-start"
                      >
                        <span className="mr-3 text-purple-900 text-2xl leading-none mt-1">
                          &bull;
                        </span>
                        <span className="text-gray-800">
                          {facility}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
