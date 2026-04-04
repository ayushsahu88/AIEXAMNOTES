import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { getCurrentUser } from "../../services/api";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ update user credits
    getCurrentUser(dispatch);

    const t = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(t);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <FiCheckCircle className="text-green-500 text-6xl" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-green-600"
        >
          Payment Successful 🎉
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mt-2"
        >
          Credits have been added to your account
        </motion.p>

        {/* Redirect text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-400 mt-4"
        >
          Redirecting to home in 5 seconds...
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/")}
          className="mt-5 px-5 py-2 bg-green-600 text-white rounded-lg"
        >
          Go Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
