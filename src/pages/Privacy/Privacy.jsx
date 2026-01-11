import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPrinter, FiDownload, FiInfo, FiShield, FiFileText, FiUserCheck, FiChevronDown } from "react-icons/fi";
import Container from "../../components/Shared/Container";

const content = {
  en: {
    title: "Privacy Policy &",
    subtitle: "Terms",
    updated: "Last updated",
    sections: [
      { id: "privacy", icon: <FiShield />, title: "Privacy Policy", text: "We respect your privacy and protect your personal data. We only collect necessary data to improve performance and security. Your information is never sold to third parties." },
      { id: "data", icon: <FiInfo />, title: "Data Usage", text: "Collected data is used only to improve user experience, system security, and performance tracking within the garments industry." },
      { id: "terms", icon: <FiFileText />, title: "Terms & Conditions", text: "By using this platform, you agree to follow ethical usage. Any misuse of system tools may result in account suspension." },
      { id: "responsibility", icon: <FiUserCheck />, title: "User Responsibilities", text: "Users are responsible for maintaining the confidentiality of their login credentials and all activities under their account." },
    ],
    helpTitle: "Need Help?",
    helpText: "Contact our support team anytime at",
  },
};

const PrivacyTerms = () => {
  const [lang, setLang] = useState("en");
  const [activeAccordion, setActiveAccordion] = useState("privacy");

  useEffect(() => {
    document.title = "Privacy & Terms | Garments Tracker";
  }, []);

  const handlePrint = () => window.print();
  const handleDownload = () => {
    const data = content[lang].sections.map(s => `${s.title}\n${s.text}`).join("\n\n");
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Privacy_Terms_${lang}.txt`;
    link.click();
  };

  return (
    <Container>
      <div className="px-4 -mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-gray-500/40 pb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-black  pb-6">
              {content[lang].title} <span className="text-lime-500">{content[lang].subtitle}</span>
            </h1>
            <p className="text-gray-500 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
              {content[lang].updated}: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <div className="flex  flex-wrap gap-3">
            <button onClick={handlePrint} className="p-2.5 border border-gray-500/40 rounded-xl hover:border-lime-500 transition shadow-sm group">
              <FiPrinter className="group-hover:text-lime-500" />
            </button>
            <button onClick={handleDownload} className="p-2.5 border border-gray-500/50  rounded-xl hover:border-lime-500 transition shadow-sm group">
              <FiDownload className="group-hover:text-lime-500" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-3 hidden md:block">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">Table of Contents</h3>
            {content[lang].sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveAccordion(sec.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${activeAccordion === sec.id ? 'bg-lime-50 dark:bg-lime-900/20 text-lime-600 border-l-4 border-lime-500 shadow-sm' : 'hover:text-white/70  hover:bg-gray-50 dark:hover:bg-lime-800'}`}
              >
                <span className="text-lg">{sec.icon}</span>
                <span className="font-semibold">{sec.title}</span>
              </button>
            ))}
          </div>

          <div className="md:col-span-8 space-y-4">
            {content[lang].sections.map((sec, index) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border border-gray-500/20 rounded-2xl overflow-hidden transition-all ${activeAccordion === sec.id ? 'ring-2 ring-lime-500/20 border-lime-200' : ''}`}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === sec.id ? null : sec.id)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${activeAccordion === sec.id ? 'bg-lime-500 text-white' : ' text-gray-500'}`}>
                      {sec.icon}
                    </div>
                    <span className="text-xl font-bold ">{sec.title}</span>
                  </div>
                  <FiChevronDown className={`transition-transform duration-300 ${activeAccordion === sec.id ? 'rotate-180 text-lime-500' : 'text-gray-400'}`} />
                </button>

                <AnimatePresence>
                  {activeAccordion === sec.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                          {sec.text}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyTerms;