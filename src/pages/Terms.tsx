import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
import DropDown from "../components/DropDown";
import { getTermsData } from "../services/terms";
import { TermsProps } from "../types/terms";

const TermsConditions = () => {
  const [termsData, setTermsData] = useState<TermsProps[]>([]);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getTermsData();
        setTermsData(response.data);
      } catch (error) {
        console.error("Error fetching Careers:", error);
      }
    };
    fetchTerms();
  }, []);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };
  return (
    <div>
      <div className="text-white p-4 flex justify-between items-center">
        <div className="flex justify-between items-center gap-10 text-sm">
          <Link to="/home">Home</Link>
        </div>

        <div onClick={handleDropdown}>
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}

      <div className="max-w-4xl mx-auto my-10 px-4 text-white flex flex-col gap-8 min-h-screen">
        {termsData.length > 0 ? (
          termsData.map((section) => (
            <section key={section.id} className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold ">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))
        ) : (
          <div>No content available</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
