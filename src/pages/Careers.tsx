import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
import DropDown from "../components/DropDown";
import { getCareerData } from "../services/careers";
import { CareerProps } from "../types/careerProps";

const Careers = () => {
  const [careerData, setCareerData] = useState<CareerProps[]>([]);
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await getCareerData();
        setCareerData(response.data);
      } catch (error) {
        console.error("Error fetching Careers:", error);
      }
    };
    fetchCareers();
  }, []);

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

      <div className="max-w-4xl mx-auto my-10 px-4 text-white min-h-screen">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Careers</h2>
          {careerData.length > 0 ? (
            careerData.map((career) => (
              <div key={career.id}>
                <h3 className="text-xl font-bold">{career.title}</h3>
                {career.id === 2 ? (
                  career.content.split("- ").map((sentence, index) => (
                    <p key={index} className="mb-2">
                      {index === 0 ? sentence.trim() : `- ${sentence.trim()}`}
                    </p>
                  ))
                ) : (
                  <p className="mb-4">{career.content}</p>
                )}
              </div>
            ))
          ) : (
            <p>No current openings available.</p>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
