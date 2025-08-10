import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiHuggingface,
  SiOpenai,
  SiDocker,
  SiVercel,
  SiRender, 
  SiGit,
  SiOpencv
} from "react-icons/si";  
import { Database } from "lucide-react";

export function SkillsSection() {
  const skills = [

  

  // general-purpose language used heavily in ML
  { name: "Python",      icon: SiPython,     color: "text-green-400" },

  // deep learning frameworks
  { name: "PyTorch",     icon: SiPytorch,    color: "text-red-500" },
  { name: "TensorFlow",  icon: SiTensorflow, color: "text-orange-500" },
  { name: "Keras",       icon: SiKeras,      color: "text-pink-400" },
  { name: "OpenCV",      icon: SiOpencv,     color: "text-green-500" },


  // classic ML & scientific stack
  { name: "scikit-learn",icon: SiScikitlearn, color: "text-indigo-400" },
  { name: "NumPy",       icon: SiNumpy,      color: "text-blue-300" },
  { name: "Pandas",      icon: SiPandas,     color: "text-blue-400" },

  // model hubs / LLM ecosystem
  { name: "Hugging Face",icon: SiHuggingface, color: "text-purple-400" },
  { name: "OpenAI",  icon: SiOpenai,     color: "text-sky-400" },
  { name: "LLM Fine-tuning", icon: Database, color: "text-rose-400" },

  // infra / GPU / deployment
  { name: "Docker",      icon: SiDocker,     color: "text-blue-600" },
  { name: "Vercel",      icon: SiVercel,      color: "text-white" },
  { name: "Render",      icon: SiRender,      color: "text-purple-300" },

  // tooling & VCS
  { name: "Git",         icon: SiGit,        color: "text-orange-400" },

  // web development basics
  { name: "HTML",        icon: SiHtml5,      color: "text-orange-400" },
  { name: "CSS",         icon: SiCss3,       color: "text-blue-400" },
  { name: "JavaScript",  icon: SiJavascript, color: "text-yellow-400" },
];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="text-blue-400">Stack</span>
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-300"
              >
                <IconComponent className={`text-4xl ${skill.color} mb-4 mx-auto`} />
                <p className="font-semibold">{skill.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
