import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              © SYED GUFRAN HUSSAIN. Built with passion and ☕
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/syed-gufran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tazeem-abbas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
