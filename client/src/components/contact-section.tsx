import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Construct mailto URL
    const mailtoLink = `mailto:tazeema07@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Clear form
    setFormData({ name: "", email: "", subject: "", message: "" });

    toast({
      title: "Email client opened",
      description: "Please complete and send your message via your email client.",
    });
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tazeem-abbas",
      label: "LinkedIn",
      color: "hover:bg-blue-600",
    },
    {
      icon: Github,
      href: "https://github.com/syed-gufran",
      label: "GitHub",
      color: "hover:bg-gray-600",
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-6">Let's Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-8">
                  I'm always interested in new opportunities and exciting projects.
                  Whether you want to discuss a potential collaboration or just say hello,
                  feel free to reach out!
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full p-3">
                      <Mail className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-300">tazeema07@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full p-3">
                      <MapPin className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-300">Lucknow, India</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 mt-8">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-full p-3 ${social.color} transition-colors duration-300`}
                      >
                        <IconComponent className="text-blue-400" size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-6">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                      placeholder="Project inquiry, collaboration, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition-colors duration-300 hover:scale-105 transform"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
