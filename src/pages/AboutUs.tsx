import { Link } from "react-router-dom";
import DropDown from "../components/DropDown";
import { useState } from "react";
import UserIcon from "../assets/user.png";
import Footer from "../components/Footer";
const AboutUs = () => {
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

      <div className="max-w-4xl mx-auto px-4 py-6 text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">About Us</h1>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
          <p>
            Welcome to our e-commerce website, your go-to destination for the
            latest and greatest in footwear. Our mission is to provide
            top-quality shoes that combine style, comfort, and affordability.
            With a wide range of options for every occasion, we are committed to
            helping you find the perfect pair to match your needs and
            personality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p>
            Our e-commerce journey began with a simple vision: to revolutionize
            the way people shop for shoes. What started as a small venture has
            grown into a thriving online platform with a global reach. Along the
            way, we have celebrated many milestones and achievements, all thanks
            to the support of our loyal customers and dedicated team.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            Have questions or need support? Feel free to reach out to us at:
          </p>
          <p>Email: support@example.com</p>
          <p>Phone: (123) 456-7890</p>
          <Link to="/contact" className="text-indigo-600 hover:underline">
            Contact Page
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
