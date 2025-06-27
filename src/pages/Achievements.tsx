import React, { useState } from 'react'; // Import useState
import Layout from '../components/Layout';

const studentAchievements = [
  {
    studentName: "Idukuda Venkatapathi Babu (23891A1225)",
    issuedBy: "Indian Institute of Technology, Madras (Specialized Training)",
    topic: "Foundation level in Programming and Data Science",
    date: "April 2025",
    academicYear: "2024-25",
    count: "1",
  },
  {
    studentName: "K. Sanjana (21891A1221)",
    issuedBy: "Covalense digital Solutions Private Limited",
    topic: "Internship",
    date: "January 2025",
    academicYear: "2024-25",
    count: "1",
  },
  {
    studentName: "Canjeevaram Raju Hrithik (22891A1211), Chiluveru Navya Sri (22891A1213), M Sai Rithika (22891A1232), Sai Rishika Madala (22891A1251)",
    issuedBy: "StartupIndia",
    topic: "Internship",
    date: "January 2025",
    academicYear: "2024-25",
    count: "4",
  },
  {
    studentName: "B. Pavan Babu (22891A1207)",
    issuedBy: "Rao Associates",
    topic: "Internship",
    date: "March 2025",
    academicYear: "2024-25",
    count: "1",
  },
  {
    studentName: "Bandigari Harichandana (22891A1208), Bobbala Rohith Reddy (22891A1209), Hapavath Nithin (22891A1221), Katukuri Vijitha (22891A1226), Komirishetty Keerthana (22891A1227), Dussa Greeshma (22891A1228), Peddi Sravani (22891A1239), Puralasetti Supriya (22891A1244), Rokandla Dhikshith Raj (22891A1250), Shaik Farha Begum (22891A1255), S Harshith Kumar Goud (22891A1257), Survi Aishwarya (22891A1258), Varakala Charvitha (22891A1260), Shaik Muskan (23895A1203), J Jagannath Preetham (23895A1205)",
    issuedBy: "Collaboration of Swecha & IIIT Hyderabad",
    topic: "Internship",
    date: "May 2025",
    academicYear: "2024-25",
    count: "14",
  },
  {
    studentName: "A Jahnavi Reddy (19891A1203), A Alekya (19891A1206), G Bhuvan Sai Teja (19891A1224), T Tejeswar (19891A1253), V Preethi (19891A1257) ",
    issuedBy: "OvalEdge (Stipend Rs. 25,000)",
    topic: "Internship",
    date: "August 2021",
    academicYear: "2021-22",
    count: "05",
  },
  {
    studentName: "A Jahnavi Reddy (19891A1203)",
    issuedBy: "Eunimart (Stipend Rs. 25,000)",
    topic: "Internship",
    date: "September 2021",
    academicYear: "2021-22",
    count: "01",
  },
  {
    studentName: "R Pravenn Kumar (19891A1244)",
    issuedBy: "Informatica  (Stipend Rs. 30,000)",
    topic: "Internship",
    date: "August 2022",
    academicYear: "2022-23",
    count: "01",
  },
  {
    studentName: "E Shiva Ram (19891A1223), P. Nischal (19891A1242)",
    issuedBy: "EnergyTech Global  (Stipend Rs. 15,000)",
    topic: "Internship",
    date: "August 2022",
    academicYear: "2022-23",
    count: "02",
  },
  {
    studentName: "B Sri vamshi Teja (20891A1223), B Srinivas Anmol (20891A1224), E Kavitha (20891A1230), K Sai Chandana (20891A1233), T Ajay Purushotham (20891A1235), T Ganesh (20891A1240), V Vennela (20891A1248), G Manjusha (20891A1251)",
    issuedBy: "unschool.in  (Stipend Rs. 30,000)",
    topic: "Internship",
    date: "November 2022",
    academicYear: "2022-23",
    count: "08",
  },
  {
    studentName:
        "B Sri vamshi Teja (20891A1223), B Srinivas Anmol (20891A1224), E Kavitha (20891A1230), K Sai Chandana (20891A1233), T Ajay Purushotham (20891A1235), T Ganesh (20891A1240), V Vennela (20891A1248), G Manjusha (20891A1251)",
    issuedBy: "unschool.in",
    topic: "Internship",
    date: "November 2023",
    academicYear: "2023-24",
    count: "09",
  },
];

const Achievements = () => {
  // State to manage which achievement's student list is expanded
  // We'll store the index of the expanded achievement.
  const [expandedStudentsIndex, setExpandedStudentsIndex] = useState(null);

  // Group by academic year summary
  const summaryByAcademicYear = studentAchievements.reduce((acc, achievement) => {
    const year = achievement.academicYear || 'Unknown'; // Use academicYear for consistency
    if (!acc[year]) {
      acc[year] = {
        internships: 0,
        others: 0,
      };
    }
    const count = Number(achievement.count) || 0;
    if (achievement.topic.toLowerCase().includes('internship')) { // Use .includes for flexibility
      acc[year].internships += count;
    } else {
      acc[year].others += count;
    }
    return acc;
  }, {});

  // Sort academic years (e.g., "2021-22" then "2022-23")
  const academicYears = Object.keys(summaryByAcademicYear).sort();

  // Group achievements by date
  const groupedByDate = studentAchievements.reduce((acc, achievement) => {
    const date = achievement.date || 'Unknown';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(achievement);
    return acc;
  }, {});

  // Sort dates DESCENDING (newest first)
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    const parseMonthYear = (str) => {
      const monthMap = {
        "January": 0, "February": 1, "March": 2, "April": 3,
        "May": 4, "June": 5, "July": 6, "August": 7,
        "September": 8, "October": 9, "November": 10, "December": 11
      };
      const [monthName, yearStr] = str.split(' ');
      const monthIndex = monthMap[monthName];
      const year = parseInt(yearStr, 10);
      return new Date(year, monthIndex, 1);
    };

    const dateA = parseMonthYear(a);
    const dateB = parseMonthYear(b);
    return dateB.getTime() - dateA.getTime(); // Sort descending
  });

  return (
      <Layout>
        <section className="py-12 px-4 md:px-8 lg:px-16 flex flex-col items-center bg-gray-50 min-h-screen">
          <h1 className="text-4xl font-extrabold mb-12 text-center text-indigo-800 tracking-wide leading-tight">
            Our Students' Brilliant Accomplishments
          </h1>

          {/* --- Academic Year Summary --- */}
          <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-6 mb-12 border border-blue-100 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-700">
              Glance at Student Success
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200 text-center">
                <thead className="bg-department-blue text-white text-center">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-wider rounded-tl-lg">
                    Academic Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                    Internships
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                    Specialized Training
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium uppercase tracking-wider rounded-tr-lg">
                    Total Students
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-200">
                {academicYears.map((year) => {
                  const { internships, others } = summaryByAcademicYear[year];
                  const total = internships + others;
                  return (
                      <tr key={year} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 ">
                          {internships}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {others}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-department-purple">
                          {total}
                        </td>
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Detailed Achievements Timeline --- */}
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-department-blue">
              Timeline of Success
            </h2>
            {sortedDates.map((date) => (
                <div key={date} className="mb-12 relative">
                  <h3 className="text-2xl font-bold text-teal-600 mb-6 sticky top-0 bg-gray-50 py-2 z-10 px-4 md:px-0 w-full border-b-2 border-teal-200 shadow-sm">
                    {date}
                  </h3>
                  <div className="border-l-4 border-teal-400 pl-8 space-y-8">
                    {groupedByDate[date].map((achievement, index) => {
                      // --- Start of Read More/Show Less Logic ---
                      const studentNamesArray = achievement.studentName.split(',').map(name => name.trim());
                      const maxNamesToShow = 6; // Display up to 6 names initially

                      // Check if this specific achievement's student list is expanded
                      const isExpanded = expandedStudentsIndex === `${date}-${index}`;

                      const displayedNames = isExpanded
                          ? studentNamesArray
                          : studentNamesArray.slice(0, maxNamesToShow);

                      return (
                          <div key={index} className="relative group">
                            <span className="absolute w-5 h-5 bg-teal-500 rounded-full -left-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 border-4 border-white z-10 transition-transform duration-300 group-hover:scale-125"></span>
                            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                              <h4 className="text-xl font-bold text-teal-700 mb-2">
                                {achievement.topic} ({achievement.count} student{Number(achievement.count) > 1 ? 's' : ''})
                              </h4>
                              <p className="text-md text-gray-700 mb-2">
                                <span className="font-semibold">Issued By:</span> {achievement.issuedBy}
                              </p>
                              <p className="text-md text-gray-600 mb-1">
                                <span className="font-semibold text-justify">Student Achievers:</span>{' '}
                                {displayedNames.map((name, i) => (
                                    <span key={i}>{name}{i < displayedNames.length - 1 ? ', ' : ''}</span>
                                ))}
                                {/* Only show button if there are more names than initially displayed */}
                                {studentNamesArray.length > maxNamesToShow && (
                                    <button
                                        onClick={() =>
                                            setExpandedStudentsIndex(isExpanded ? null : `${date}-${index}`)
                                        }
                                        className="text-department-blue hover:underline ml-1 focus:outline-none"
                                    >
                                      {isExpanded ? ' (Show Less)' : ' (Full List of Student Details...)'}
                                    </button>
                                )}
                              </p>
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </div>
            ))}
          </div>
        </section>
      </Layout>
  );
};

export default Achievements;