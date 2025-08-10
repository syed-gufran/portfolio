import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import photo from "@/components/photo.jpg";


export function AboutSection() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-blue-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <img
              src={photo}
              alt="Professional workspace"
              className="w-full h-64 object-cover rounded-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold">SYED GUFRAN HUSSAIN</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Based in Lucknow, India, I’m deeply passionate about artificial intelligence and machine learning, 
              constantly exploring innovative ways to harness their power to solve real-world problems.
              
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
               Skilled in tools like PyTorch, TensorFlow, OpenCV, and Hugging Face Transformers, 
              I specialize in computer vision, natural language processing, and integrating AI into 
              real-world products.
               I also have strong experience in Docker-based deployments, and cloud platforms like Vercel and Render.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2"
              >
                <MapPin className="text-blue-400" size={16} />
                <span>Lucknow , India</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2"
              >
                <GraduationCap className="text-blue-400" size={16} />
                <span>CS & AI Enthusiast</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
