import { motion } from "framer-motion";

const steps = [
  { step: 1, title: "Select Product", desc: "Choose your favorite plant" },
  { step: 2, title: "Place Order", desc: "Book easily with minimum quantity" },
  { step: 3, title: "Make Payment", desc: "Cash or online payment" },
  { step: 4, title: "Delivery", desc: "Receive your plant at home" },
];

const HowItWorks = () => {
  return (
    <motion.section className="py-16 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, }}
          className="w-full md:w-8/12   flex justify-center items-center">
          <img src="https://i.postimg.cc/8PJ28vFh/download-11-removebg-preview.png" className="w-full h-80 rounded-xl shadow bg-green-50" alt="" />
        </motion.div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s) => (
            <motion.div
              key={s.step}
              className="bg-green-50 p-6 rounded-xl shadow text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-2xl font-bold mb-2">Step {s.step}</div>
              <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
              <p className="text-neutral-700">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
