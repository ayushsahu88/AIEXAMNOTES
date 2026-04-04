import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// 👉 apna backend URL
const serverUrl = "http://localhost:5000";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount);
      setPaying(true);

      console.log("Sending amount:", amount);

      const res = await axios.post(
        `${serverUrl}/api/credit/order`,
        {
          amount: Number(amount), // ✅ important fix
        },
        {
          withCredentials: true,
        },
      );

      console.log("Response:", res.data);

      // ✅ Stripe redirect
      if (res.data.url) {
        window.location.href = res.data.url;
        return;
      }

      setPaying(false);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="mb-4 px-4 py-2 bg-black text-white rounded"
        onClick={() => navigate("/")}
      >
        Back
      </motion.button>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold">Buy Credits</h1>
        <p className="text-gray-600">
          Choose a plan that fits your study needs
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits="50 Credits"
          description="Basic plan for beginners"
          features={[
            "Basic notes generation",
            "Limited credits",
            "Standard AI speed",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          popular
          title="Popular"
          price="₹200"
          amount={200}
          credits="120 Credits"
          description="Best value for students"
          features={[
            "All Starter features",
            "More credits",
            "Revision mode",
            "Priority AI response",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits="300 Credits"
          description="For serious exam preparation"
          features={[
            "Maximum credit value",
            "Unlimited revision",
            "Charts & diagrams",
            "Full syllabus support",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  );
};

function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features = [],
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount,
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setSelectedPrice(amount)}
      className={`p-5 rounded-2xl shadow-lg cursor-pointer bg-white border ${
        isSelected ? "border-black" : "border-gray-200"
      }`}
    >
      {/* Tags */}
      <div className="flex gap-2">
        {popular && (
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
            Popular
          </span>
        )}
        {isSelected && (
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
            Selected
          </span>
        )}
      </div>

      {/* Content */}
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-500">{description}</p>

      <div className="mt-4">
        <p className="text-2xl font-bold">{price}</p>
        <p className="text-gray-600">{credits}</p>

        {/* Motion Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 w-full py-2 bg-black text-white rounded"
          onClick={(e) => {
            e.stopPropagation();
            onBuy(amount);
          }}
        >
          {isPayingThisCard ? "Processing..." : "Buy Now"}
        </motion.button>

        {/* Features */}
        <ul className="mt-4 space-y-2">
          {features.map((f, i) => (
            <li key={i} className="text-sm text-gray-700">
              ✔ {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default Pricing;
