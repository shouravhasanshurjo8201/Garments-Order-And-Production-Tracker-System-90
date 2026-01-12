import { motion } from "framer-motion";
import { ShieldCheck, Clock, ThumbsUp, Users, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Trusted by Thousands",
    desc: "Join our community of 10k+ happy plant lovers worldwide.",
    icon: <Users size={26} />,
    borderColor: "hover:border-blue-400",
    iconBg: "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100"
  },
  {
    title: "Premium Quality",
    desc: "Each plant is nursery-raised and carefully checked for health.",
    icon: <ShieldCheck size={26} />,
    borderColor: "hover:border-lime-400",
    iconBg: "bg-lime-50 text-lime-600 shadow-sm shadow-lime-100"
  },
  {
    title: "Eco-Safe Delivery",
    desc: "Sustainable packaging that keeps your plants safe and fresh.",
    icon: <Clock size={26} />,
    borderColor: "hover:border-orange-400",
    iconBg: "bg-orange-50 text-orange-600 shadow-sm shadow-orange-100"
  },
  {
    title: "Customer Support",
    desc: "Our experts are available 24/7 for your guidance and care.",
    icon: <ThumbsUp size={26} />,
    borderColor: "hover:border-purple-400",
    iconBg: "bg-purple-50 text-purple-600 shadow-sm shadow-purple-100"
  },
];

const WhyChooseUs = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className=" overflow-hidden">
      <div className="container mx-auto px-6">
        <header className="mb-14 text-center space-y-5">
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
            Growing Trust, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-500">One Leaf at a Time.</span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed  font-medium">
            We don’t just deliver plants; we provide the foundation for a healthier, greener lifestyle right in your living room.
          </p>
        </header>
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >

            <div className="relative group">
              <img
                src="https://i.postimg.cc/x8NxdnJ7/why-choose-flat-questions-concept-260nw-2301728081-removebg-preview.png"
                alt="Plant nursery expert service illustration"
                className="w-full rounded-[2.5rem] drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 md:-right-8  backdrop-blur-md px-7 py-5 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-white/20 flex gap-5 items-center"
              >
                <div className="bg-gradient-to-br from-lime-400 to-lime-600 p-3.5 rounded-2xl text-white shadow-lg shadow-lime-500/20">
                  <ThumbsUp size={24} />
                </div>
                <div>
                  <p className="text-3xl font-black tracking-tight">99%</p>
                  <p className="text-[13px] text-gray-500 font-bold uppercase tracking-wider">Satisfaction</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`p-8  border border-slate-200/10 ${f.borderColor} rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-500 group`}
                >
                  <div className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[360deg]`}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold  mb-3 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-[14px] leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;