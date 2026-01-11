// import { motion } from "framer-motion";

// const steps = [
//   { step: 1, title: "Select Product", desc: "Choose your favorite plant" },
//   { step: 2, title: "Place Order", desc: "Book easily with minimum quantity" },
//   { step: 3, title: "Make Payment", desc: "Cash or online payment" },
//   { step: 4, title: "Delivery", desc: "Receive your plant at home" },
// ];

// const HowItWorks = () => {
//   return (
//     <motion.section className="py-16 bg-white">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-5">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, }}
//           className="w-full md:w-8/12   flex justify-center items-center">
//           <img src="https://i.postimg.cc/8PJ28vFh/download-11-removebg-preview.png" className="w-full h-80 rounded-xl shadow bg-green-50" alt="" />
//         </motion.div>
//         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
//           {steps.map((s) => (
//             <motion.div
//               key={s.step}
//               className="bg-green-50 p-6 rounded-xl shadow text-center"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 1 }}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <div className="text-2xl font-bold mb-2">Step {s.step}</div>
//               <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
//               <p className="text-neutral-700">{s.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default HowItWorks;



import { motion } from "framer-motion";
import { 
  HiOutlineSearchCircle, 
  HiOutlineShoppingBag, 
  HiOutlineCreditCard, 
  HiOutlineTruck 
} from "react-icons/hi";
import Container from "../../components/Shared/Container";

const steps = [
  { 
    step: 1, 
    title: "Select Product", 
    desc: "Browse our premium inventory and choose your favorite items.",
    icon: <HiOutlineSearchCircle className="text-4xl text-lime-600" />
  },
  { 
    step: 2, 
    title: "Place Order", 
    desc: "Confirm your booking with our wholesale minimum quantities.",
    icon: <HiOutlineShoppingBag className="text-4xl text-lime-600" />
  },
  { 
    step: 3, 
    title: "Make Payment", 
    desc: "Complete your transaction securely via cash or online methods.",
    icon: <HiOutlineCreditCard className="text-4xl text-lime-600" />
  },
  { 
    step: 4, 
    title: "Delivery", 
    desc: "Get your products delivered quickly at your doorstep.",
    icon: <HiOutlineTruck className="text-4xl text-lime-600" />
  },
];

const HowItWorks = () => {
  // Parent container animation for children stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-10 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black  mb-4"
          >
            How It <span className="text-lime-500">Works</span>
          </motion.h2>
          <p className="text-gray-400 font-medium max-w-xl mx-auto">
            Our streamlined process makes wholesale ordering simple and efficient for your business.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-white/50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src="https://i.postimg.cc/8PJ28vFh/download-11-removebg-preview.png" 
              className="relative w-full h-auto max-h-[450px] object-contain drop-shadow-2xl" 
              alt="Workflow illustration" 
            />
          </motion.div>

          {/* Right Side: Step Timeline */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {steps.map((s, index) => (
              <motion.div
                key={s.step}
                variants={itemVariants}
                className="group flex items-start gap-6 p-6 rounded-3xl hover:shadow hover:shadow-lime-500/10 border border-transparent hover:border-lime-100/50 transition-all duration-300"
              >
                {/* Step Number & Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl shadow flex items-center justify-center group-hover:bg-lime-500 group-hover:text-white transition-colors duration-300">
                    {s.icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 bg-lime-500 text-white/60 text-xs font-black flex items-center justify-center rounded-full border-2 border-white/50">
                    {s.step}
                  </span>
                  
                  {/* Connecting Line (for desktop) */}
                  {index !== steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-1/2 w-0.5 h-12 bg-gradient-to-b from-lime-200 to-transparent"></div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-black mb-2 group-hover:text-lime-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;