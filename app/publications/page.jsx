"use client"
import React,{useState,useEffect} from 'react'
import Image from 'next/image';
import Papa from "papaparse";

const PublicationCard = ({ publication, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition-all duration-200 ${isHovered ? 'shadow-lg' : 'shadow-md'}`}
      style={{ fontFamily: 'Georgia, serif' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card with clean academic design */}
      <a href={publication.doi}>
        <div className=" border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
          {/* Publication Header */}
          <style>{`.georgia-font * { font-family: Georgia, serif !important; }`}</style>
          <div className="bg-blue-50 border-b border-blue-100 p-4">
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📄</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-blue-600 font-medium text-lg">{publication.journal || 'Journal information not available'}</p>
              </div>
              <div className="text-right"></div>
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
                      {index + 1}. <span className="underline text-blue-900 hover:text-blue-700">{publication.title}</span>
                    </>
                  ) : (
                    <>{index + 1}. {publication.title}</>
                  )}
                </h3>
                {/* Authors */}
                <div className="mb-4">
                  <p className="text-gray-700 text-sm">
                    {publication.sideAuthor && Array.isArray(publication.sideAuthor) ? (
                      publication.sideAuthor.map((author, idx) => (
                        <span key={idx}>
                          <span >
                            {author}
                          </span>
                          {idx < publication.sideAuthor.length - 1 && ', '}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">Authors not available</span>
                    )}
                    {publication.starAuthors && Array.isArray(publication.starAuthors) ? (
                      publication.starAuthors.map((author, idx) => (
                        <span key={idx} className='font-bold'>
                          <span >
                            {author}*
                          </span>
                          {idx < publication.starAuthors.length - 1 && ', '}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">Authors not available</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Images stacked vertically in mobile */}
              <div className="space-y-4 ">
                {/* Main image - fixed size for consistency */}
                {publication.image && (
                  <div className="w-full flex justify-center ">
                    <Image
                      src={publication.image}
                      alt={publication.title || 'Publication'}
                      width={800}  // Fixed width
                      height={500}  // Fixed height for 16:10 ratio
                      className="object-cover bg-red-500 rounded"
                    />
                  </div>
                )}
                {/* Research image below - centered and fixed size */}
                {publication.researchImage && (
                  <div className="w-full flex justify-center">
                    <Image
                      src={publication.researchImage}
                      alt={publication.title || 'Research'}
                      width={300}  // Smaller fixed width
                      height={200}  // Fixed height for consistency
                      className="object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Layout: Side-by-side with consistent sizing */}
            <div className="hidden md:flex">
              <div className="flex w-full georgia-font" style={{ minHeight: '200px' }}>
                {/* Left 75%: Main content at top, image below */}
                <div className="flex flex-col w-3/4 pr-4">
                  {/* Main content at top left */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-blue-800 leading-tight mb-3">
                      {index === 0 ? (
                        <>
                          {index + 1}. <span className="underline text-blue-900 hover:text-blue-700">{publication.title}</span>
                        </>
                      ) : (
                        <>{index + 1}. {publication.title}</>
                      )}
                    </h3>
                    {/* Authors */}
                    <div className="mb-3">
                      <p className="text-gray-700 text-sm">
                        {publication.mainAuthor} , 
                        {publication.sideAuthor && Array.isArray(publication.sideAuthor) ? (
                          publication.sideAuthor.map((author, idx) => (
                            <span key={idx}>
                              <span >
                                {author} 
                              </span>
                              {', '}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 italic">Authors not available</span>
                        )}
                        {publication.starAuthors && Array.isArray(publication.starAuthors) ? (
                          publication.starAuthors.map((author, idx) => (
                            <span key={idx} className='font-bold'>
                              <span >
                                {author}* 
                              </span>
                              {idx < publication.starAuthors.length - 1 && ', '}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 italic">Authors not available</span>
                        )}
                      </p>
                    </div>
                  </div>
                  {/* Image below main content - fixed size */}
                  {publication.image && (
                    <div className="w-full flex justify-center mt-4">
                      <Image
                        src={publication.image}
                        alt={publication.title || 'Publication'}
                        width={800}  // Fixed width
                        height={400}  // Fixed height
                        className="object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                {/* Right 25%: Research image - fixed size and centered */}
                {publication.researchImage && (
                  <div className="w-1/4 flex items-center justify-center">
                    <div className="bg-gray-100 rounded border p-2 flex justify-center">
                      <Image
                        src={publication.researchImage}
                        alt={publication.title || 'Research'}
                        width={200}  // Fixed width
                        height={150}  // Fixed height
                        className="object-cover rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
const page = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch publications from Google Sheets
  useEffect(() => {
    const fetchFromGoogleSheets = async () => {
      setLoading(true);
      try {
        // Update this URL to point to your publications CSV
        const GOOGLE_SHEETS_CSV_URL =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPnZVsvsP1Ecgv-iVWKs_rTGgOCMp68gFDzFBmDE-3SpJZE6UINUrwVZbIjOVoR5SWOublOe1cP1Ui/pub?output=csv";

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
                journal: row.journal?.trim() || "",
                doi: row.doi?.trim() || "#",
                mainAuthor: row.mainAuthor?.trim() || "",
                sideAuthor: row.sideAuthor
                  ? row.sideAuthor
                      .replace(/^\[|\]$/g, '')
                      .split(",")
                      .map((a) => a.replace(/^["'\s]+|["'\s]+$/g, ''))
                      .filter(Boolean)
                  : [],
                starAuthors: row.starAuthors
                  ? row.starAuthors
                      .replace(/^\[|\]$/g, '')
                      .split(",")
                      .map((a) => a.replace(/^["'\s]+|["'\s]+$/g, ''))
                      .filter(Boolean)
                  : [],
                image: typeof row.image === "string" && (row.image.trim().startsWith("http") || row.image.trim().startsWith("/")) ? row.image.trim() : "",
                researchImage: typeof row.researchImage === "string" && (row.researchImage.trim().startsWith("http") || row.researchImage.trim().startsWith("/")) ? row.researchImage.trim() : "",
              }));
            setPublications(parsedData);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setPublications([]);
          },
        });
      } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFromGoogleSheets();
  }, []);


  // Choose which data to display
  const displayPublications = publications || [];
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          
          {/* Header Section - Academic Style */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-linear-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mt-[20vh]">
              Publications
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Research contributions to the scientific community in organic synthesis, computational chemistry, and materials science.
            </p>
          </div>

          {/* Year Section */}
          <div className="mb-8">
            <div className="border-b-2 border-blue-500 inline-block">
              <h2 className="text-2xl font-bold text-gray-800 pb-2">2025</h2>
            </div>
          </div>

          {/* Publications List - Academic Format */}
          <div className="space-y-6">
            {displayPublications.map((publication, index) => (
              <PublicationCard
                key={publication.$id || publication.id || index}
                publication={publication}
                index={index}
              />
            ))}
          </div>

          {/* Contact Section - Simplified */}
          <div className="text-center bg-white border border-gray-200 rounded-lg p-8 shadow-sm mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Research Collaboration
            </h2>
            <p className="text-gray-600 mb-4">
              Interested in collaboration or have questions about our research?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors duration-200">
                Contact Us
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:border-blue-500 hover:text-blue-600 transition-colors duration-200">
                Request Reprints
              </button>
            </div>
          </div>
        </div>
  )
}

export default page