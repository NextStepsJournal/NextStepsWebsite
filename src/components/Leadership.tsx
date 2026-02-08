// src/data/leadership.ts
import landon from "@/assets/people/landon-mahler.jpg";
import ananya from "@/assets/people/ananya-suresh.png";
import mukil from "@/assets/people/mukil-siva.png";
import lucia from "@/assets/people/lucia-adams.png";
import adelaide from "@/assets/people/adelaide-tao.png";

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin?: string;
}

export const leadership: TeamMember[] = [
  {
    name: "Landon Mahler",
    role: "Founder",
    photo: landon,
    bio: "Hi Everyone! My name is Landon Mahler and I am the founder of NextSteps. I am a junior in Idaho and am passionate about business, specifically strategic business management. I’m actively involved in several non profits, and am the President of my school’s DECA club. I’m so excited to take my Next Step with all of you!",
  },
  {
    name: "Lucia Adams",
    role: "Associate Founder & Director of Technology",
    photo: lucia,
    bio: "Hi! I’m Lucia Adams, Associate Founder and Director of Technology at NextSteps. I build and maintain our website, manage technical systems, and support the platform’s growth. I also work as a strategist, lead projects, and handle project management across teams. I’m interested in computer science, logic, and creative technology, and I take on leadership roles to keep work organized, functional, and moving forward.",
  },
  {
    name: "Mukil Silva",
    role: "Director of Operations",
    photo: mukil,
    bio: "Hey! I’m Mukil, the Director of Operations at NextSteps. I’m passionate about making STEM education engaging and accessible for students worldwide, with a strong interest in biotechnology and emerging technologies like AI. At NextSteps, I focus on developing efficient systems and programs that expand access to mentorship, research opportunities, and career development, particularly for students looking to explore their passions.",
  },
  {
    name: "Adelaide Tao",
    role: "Director of Outreach",
    photo: adelaide,
    bio: "Hi! My name is Adelaide and I am an outreach director at Next Steps. I have a strong passion for creating meaningful connections between people while providing access to educationally related career and life changing opportunities to students around the world. Working at Next Steps, I develop partnerships, increase community engagement, and create more access to mentors, research opportunities, and career opportunities for students who are interested in pursuing careers in STEM or other fields.",
  },
  {
    name: "Ananya Suresh",
    role: "Director of Human Resources",
    photo: ananya,
    bio: "Hello! My name is Ananya Suresh, and I am the Director of Human Resources at NextSteps Journal! I love working with communities and love creating communities for students where they can continue to strive and thrive no matter the situation they are in. I am currently an active volunteer/staff at GoForGlass, a DECA member, and also apart of Speech and Debate. I was also the outreach lead for my robotics team. Hope you join our team and become apart of the 'next steps' in our journey!",
  },
];
