import { useState } from "react";

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. The product must be in its original condition with all tags attached.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order using the tracking link provided in your order confirmation email or by logging into your account on our website.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to many countries. Shipping fees and delivery times vary based on the destination.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team via email at support@shoestore.com or by phone at (123) 456-7890.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 1 hour of placing it. After this period, we cannot guarantee any changes.",
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 mb-4 cursor-pointer"
            onClick={() => toggleAnswer(index)}
          >
            <h2 className="text-lg font-medium">{faq.question}</h2>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
