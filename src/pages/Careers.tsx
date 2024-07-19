import { useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
import DropDown from "../components/DropDown";

const Careers = () => {
  const [dropdown, setDropdown] = useState(false);

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

      <div className="max-w-4xl mx-auto my-10 px-4 text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Careers</h1>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
          <p>
            We are always looking for talented individuals to join our team. If
            you are passionate about footwear and have a drive to succeed, we
            would love to hear from you. Check out our current job openings
            below and apply today!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Openings</h2>
          <p>
            - <strong>Customer Service Representative</strong>: Provide
            excellent service to our customers and resolve their inquiries.
            <br />- <strong>Product Curator</strong>: Select and manage our
            product offerings.
            <br />- <strong>Marketing Specialist</strong>: Develop and execute
            marketing campaigns to drive sales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
          <p>
            Interested candidates should send their resume and cover letter to{" "}
            <a
              href="mailto:careers@example.com"
              className="text-indigo-600 hover:underline"
            >
              careers@example.com
            </a>
            . We look forward to hearing from you!
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
