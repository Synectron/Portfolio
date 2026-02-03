import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/synectron/",
    color: "hover:text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Synectron",
    color: "hover:text-white",
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32 bg-void overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Signal waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 animate-ping"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              animationDuration: `${3 + i}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-mono mb-4">
            Get in Touch
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Let's Build Something <span className="text-gradient">Great</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to
            bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          {/* <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl glass border border-cyan-500/20"
          >
            <h3 className="font-heading text-xl font-bold text-white mb-6">
              Send a Message
            </h3>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-white placeholder:text-muted-foreground focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-white placeholder:text-muted-foreground focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-white placeholder:text-muted-foreground focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  submitted
                    ? "bg-green-500 text-white"
                    : "bg-cyan-500 text-void hover:bg-cyan-400 hover:shadow-glow"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                ) : submitted ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form> */}

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-heading text-xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out through any of these channels. I'm always
                open to discussing new projects, creative ideas, or
                opportunities.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href="mailto:shubhammishrax@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-xl glass border border-transparent hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-white group-hover:text-cyan-400 transition-colors">
                    shubhammishrax@gmail.com
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </a>

              <a
                href="tel:+917985307697"
                className="group flex items-center gap-4 p-4 rounded-xl glass border border-transparent hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-white group-hover:text-cyan-400 transition-colors">
                    +91-7985307697
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl glass">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-white">India</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect on social media
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground ${social.color} hover:bg-cyan-500/10 transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-white font-medium">
                    Available for opportunities
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Open to full-time roles and consulting projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
