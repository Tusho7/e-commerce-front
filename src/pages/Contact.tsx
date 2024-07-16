import React from "react";
import ContactUs from "../components/ContactUs";

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
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Shoes E-Commerce. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
