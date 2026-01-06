import { link } from "fs";
import { Briefcase, Code, GraduationCap } from "lucide-react";

export const LearningData = [
  {
    title: "Beginner",
    desc: "Start your journey with HTML, CSS, and JavaScript fundamentals.",
    icon: GraduationCap,
    color: "bg-blue-500/10 text-[#F9C505]",
    link: "/",
  },
  {
    title: "Intermediate",
    desc: "Master React, Next.js, and advanced system architecture.",
    icon: Code,
    color: "bg-primary/10 text-primary",
    link: "/",
  },
  {
    title: "Advanced",
    desc: "Deep dive into performance, security, and cloud scalability.",
    icon: Briefcase,
    color: "bg-green-500/10 text-green-500",
    link : "/",
  },
];
