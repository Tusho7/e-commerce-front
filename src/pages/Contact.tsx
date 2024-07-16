import React from "react";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl">Shoes E-Commerce</h1>
        </div>
      </header>
      <main className="my-8">
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
