import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiXCircle } from "react-icons/fi";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center"
      >
        {/* ❌ Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <FiXCircle className="text-red-500 text-6xl" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-red-600"
        >
          Payment Failed ❌
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mt-2"
        >
          Something went wrong during the payment process.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-400 mt-2"
        >
          Please try again or use a different payment method.
        </motion.p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/pricing")}
            className="px-5 py-2 bg-red-600 text-white rounded-lg"
          >
            Try Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-gray-800 text-white rounded-lg"
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
