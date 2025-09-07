"use client"
import styles from "./root.module.css"
import Image from "next/image"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Github,
  Linkedin,
  Mail,
  Moon,
  Rss,
  Sun,
  Briefcase,
  Award,
} from "lucide-react"
import { Marquee } from "@/components/magicui/marquee"
import { useTheme } from "next-themes"
import ProjectCard from "@/components/projectCard/projectCard"
import type { BlogType, ProjectType } from "@/lib/types"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import DefaultBlogCard from "@/components/blogs/blogCards"
import Link from "next/link"
import { useState, useEffect } from "react"
import cn from "classnames"
import ExperienceSection from "@/components/experience-section"

export default function RotPage() {
  const projectsList: ProjectType[] = [
    {
      name: "Pilot Agent",
      imageUrl: "/Agentic-browser-color.jpg",
      imageUrlDark: "/Agentic-browser-bnw.jpg",
      description:
        "AI-powered browser automation agent built with TypeScript, Puppeteer, and OpenAI. Automates web tasks like searching, navigating, filling forms, and end-to-end job applications via natural language.",
      githubRepo: "https://github.com/ganeshsarakadam/pilot-agent",
      // liveLink: "https://github.com/ganeshsarakadam/pilot-agent",
      techStack: ["TypeScript", "Node.js", "Puppeteer", "OpenAI"],
      work: "Solo Work",
      status: "Active",
    },
    {
      name: "HRRR Weather Scheduler (LAWN)",
      imageUrl: "/lawn-weather-color.jpg",
      imageUrlDark: "/lawn-weather-bnw.jpg",
      description:
        "Scheduler that pulls NOAA HRRR weather data, chunks it into smaller efficient tiles, and feeds downstream services for LAWN. Built in association with Ohio University.",
      githubRepo: "https://github.com/ganeshsarakadam/hrrrPythonScheduler",
      liveLink: "https://www.ohio.edu/news/2022/09/ohio-team-soft-launches-first-sensor-low-altitude-weather-network",
      techStack: ["Python", "Docker", "Cron", "NOAA HRRR"],
      work: "Solo Work",
      status: "Completed",
    },
    {
      name: "Nesh UI",
      imageUrl: "/Neshui-color.jpg",
      imageUrlDark: "/Neshui-bnw.jpg",
      description:
        "Futuristic component library and design system for AI-powered web applications. Built with React, TypeScript, and Storybook in a monorepo structure to create modern, consistent interfaces for agentic AI experiences.",
      githubRepo: "https://github.com/ganeshsarakadam/neshiness-ui",
      // liveLink: "https://github.com/ganeshsarakadam/neshiness-ui",
      techStack: ["React", "TypeScript", "Storybook", "pnpm", "CSS"],
      work: "Solo Work",
      status: "In-Progress",
    },
    
    {
      name: "Health Care System",
      imageUrl: "https://res.cloudinary.com/dtunq8gr3/image/upload/t_fractal1/fractal1_uutyyu",
      description:
        "React-based learning project to build a simple healthcare management interface and streamline basic workflows.",
      githubRepo: "https://github.com/ganeshsarakadam/health-care",
      // liveLink: "https://github.com/ganeshsarakadam/health-care",
      techStack: ["React", "Create React App", "CSS"],
      work: "Solo Work",
      status: "In-Progress",
    },
    {
      name: "Web Components",
      imageUrl: "https://res.cloudinary.com/dtunq8gr3/image/upload/t_fractal1/fractal1_uutyyu",
      description:
        "Vanilla JavaScript web components experiment. Built reusable custom elements (e.g., OG loader) to understand native component architecture without frameworks.",
      githubRepo: "https://github.com/ganeshsarakadam/web-components",
      // liveLink: "https://github.com/ganeshsarakadam/web-components",
      techStack: ["JavaScript", "Web Components", "HTML", "CSS"],
      work: "Solo Work",
      status: "In-Progress",
    },
  ]

  const [projectDisplayList, setProjectDisplayList] = useState(projectsList.slice(0, 3))
  const [showMoreProject, setShowMoreProject] = useState("less")

  const techStack1 = [
    {
      name: "React",
      iconUrl: "https://res.cloudinary.com/dbb7pkwdv/image/upload/v1749763871/react_fxopt7.png",
    },
    {
      name: "Next.js",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Angular",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    },
    {
      name: "JavaScript",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Node.js",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
  ]
  const techStack2 = [
    {
      name: "Python",
      iconUrl: "https://res.cloudinary.com/dbb7pkwdv/image/upload/v1749763871/python_gtxoax.webp",
    },
    {
      name: "MongoDB",
      iconUrl: "https://res.cloudinary.com/dbb7pkwdv/image/upload/v1749763870/mongodb_msjbae.svg",
    },
    {
      name: "Express.js",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg",
    },
    {
      name: "Vite",
      iconUrl: "https://vitejs.dev/logo.svg",
    },
    {
      name: "Storybook",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg",
    },
    {
      name: "Playwright",
      iconUrl: "https://playwright.dev/img/playwright-logo.svg",
    },
    {
      name: "Jest",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    },
    {
      name: "Git",
      iconUrl: "https://res.cloudinary.com/dbb7pkwdv/image/upload/v1749764943/gitlogo_ozinof.png",
    },
  ]

  const { theme: currentTheme, setTheme: setCurrentTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 140)
  })

  const [displayTab, setDisplayTab] = useState("info")

  const [blogsArray, setBlogsArray] = useState<BlogType[] | null>(null)
  useEffect(() => {
    const a = async () => {
      const res = await fetch("/api/getBlogs")
      if (res.ok) {
        const blogsArray = await res.json()
        setBlogsArray(blogsArray)
        console.log("blogs: ", blogsArray)
      }
    }
    a()
  }, [])


  return (
    <div className={styles.main}>
      <div
        className={cn(
          "z-[-1]",
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(var(--fgColor)_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(var(--fgColor)_1px,transparent_1px)]",
          "[opacity:0.25]",
          "transition-colors duration-400",
        )}
      />
      <div className="z-[-1] pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--bgColor)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[var(--bgColor)] transition-colors duration-400"></div>

      <div className={styles.detailsHolder}>
        <div className={styles.heroSection}>
          <motion.div
            style={{
              transition: "all 0.1s ease",
              zIndex: 10,
              maxWidth: 650,
              width: "100%",
              borderRadius: "0px 0px 10px 10px",
            }}
            animate={isScrolled ? "scrolled" : "normal"}
            variants={{
              normal: { position: "static" },
              scrolled: { top: 0, position: "fixed", height: 60, backdropFilter: "blur(10px)" },
            }}
          >
            <motion.div className="relative h-[100%] w-[100%] flex items-center justify-end px-[15px]">
              <motion.img
                src={currentTheme === "dark" ? "/ganesh-bnw.jpeg" : "/ganesh-color.jpeg"}
                alt="Profile photo of Ganesh Sarakadam"
                initial={{ height: 200, width: 200, borderRadius: 9999, margin: "0px auto", position: "static" }}
                animate={isScrolled ? "scrolled" : "normal"}
                variants={{
                  normal: { height: 200, width: 200, borderRadius: 9999 },
                  scrolled: { height: 40, width: 40, borderRadius: 9999, position: "absolute", top: 10, left: 10 },
                }}
                whileHover={{ boxShadow: "0 0 30px 2px rgba(255, 255, 255, 0.5)" }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                style={{ objectFit: "cover", transition: "box-shadow 0.1s" }}
              />
            </motion.div>
          </motion.div>

          <div className="flex flex-col items-center gap-[2px]">
            <h1 className="font-mono font-semibold leading-10 text-3xl">Ganesh Sarakadam</h1>
            <p className={styles.SWEpara}>Software Engineer</p>
          </div>

          <div className={styles.socialsDiv}>
            <Link href="https://x.com/srv_ganesh" target="_blank">
              <div className={styles.socialsItem}>
                <Image height={15} width={15} alt="" src="/x-social-media-white-icon.svg" unoptimized />
                <p>X app</p>
              </div>
            </Link>

            <Link href="https://github.com/ganeshsarakadam" target="_blank">
              <div className={styles.socialsItem}>
                <Github size={15} color="white" />
                <p>Github</p>
              </div>
            </Link>


            <Link href="mailto:ganesh.sarakadam@outlook.com" target="_blank">
              <div className={styles.socialsItem}>
                <Mail size={15} color="white" />
                <p>Mail</p>
              </div>
            </Link>

            <Link href="https://www.linkedin.com/in/ganesh-sarakadam/" target="_blank">
              <div className={styles.socialsItem}>
                <Linkedin size={15} color="white" />
                <p>LinkedIn</p>
              </div>
            </Link>

            <button
              type="button"
              className={styles.socialsItem}
              onClick={() => setCurrentTheme(currentTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle color theme"
            >
              {currentTheme === "dark" ? <Sun size={15} /> : <Moon size={15} color="white" />}
              <p>Theme</p>
            </button>
          </div>
        </div>

        <div className={styles.bio}>
          <p className="font-mono tracking-tighter underline leading-7 font-light text-2xl">📍Columbus, Ohio</p>
        </div>

        <div className={styles.tabsHolder}>
          <div
            className={`${styles.tabItem} ${displayTab == "info" && styles.tabItemActive}`}
            onClick={() => {
              setDisplayTab("info")
            }}
          >
            Info
            <div className={styles.hoverThing} />
          </div>
          <div
            className={`${styles.tabItem} ${displayTab == "experience" && styles.tabItemActive}`}
            onClick={() => {
              setDisplayTab("experience")
            }}
          >
            Experience
            <div className={styles.hoverThing} />
          </div>
          <div
            className={`${styles.tabItem} ${displayTab == "articles" && styles.tabItemActive}`}
            onClick={() => {
              setDisplayTab("blogs")
            }}
          >
            Blogs
            <div className={styles.hoverThing} />
          </div>
        </div>

        {displayTab == "info" && (
          <>
            <div className="mt-6 mb-8 max-w-4xl mx-auto px-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="font-mono font-semibold text-xl mb-4">About Me</h2>
                <p className="font-mono text-base leading-relaxed opacity-90">
                  I'm a Software Engineer with 5+ years of experience building scalable web applications and design systems. 
                  I specialize in modern web technologies with expertise in reusable component libraries, accessibility, and micro-frontend architectures. 
                  My focus is on creating efficient, maintainable, and user-friendly applications.
                </p>
                <p className="font-mono text-base leading-relaxed opacity-90 mt-4">
                  I'm passionate about clean code, design system adoption, and continuous learning, while staying up-to-date with the latest tools and practices in front-end development.
                </p>
              </div>
            </div>

            <div className={styles.projectsSection}>
              <h1 className="font-mono font-semibold underline leading-10 text-3xl">Projects</h1>

              <div className={styles.projectsHolder}>
                {projectDisplayList.map((project, index) => (
                  <div key={index} className="flex flex-col gap-[10px]">
                    <ProjectCard projectDetails={project} />
                    {index < projectDisplayList.length - 1 && (
                      <div className="bg-[var(--fgColor)] w-[90%] opacity-[0.4] font-semibold h-0.5 mx-6 my-0"></div>
                    )}
                  </div>
                ))}
                <div
                  onClick={() => {
                    if (showMoreProject == "less") {
                      setProjectDisplayList(projectsList)
                      setShowMoreProject("more")
                    } else {
                      setProjectDisplayList(projectsList.slice(0, 3))
                      setShowMoreProject("less")
                    }
                  }}
                  className={styles.showMore}
                >
                  {showMoreProject == "less" && (
                    <>
                      Show More <ChevronRight size={20} />
                    </>
                  )}
                  {showMoreProject == "more" && (
                    <>
                      <ChevronLeft size={20} />
                      Show less
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.techStack}>
              <h1 className="font-mono font-semibold text-4xl">My Tech-Stack</h1>

              <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:35s]">
                  {techStack1.map((tech, index) => (
                    <div key={index} className={styles.techStackItem}>
                      <Image alt="" src={tech.iconUrl || "/placeholder.svg"} height={20} width={20} unoptimized />
                      <p>{tech.name}</p>
                    </div>
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:35s]">
                  {techStack2.map((tech, index) => (
                    <div key={index} className={styles.techStackItem}>
                      <Image alt="" src={tech.iconUrl || "/placeholder.svg"} height={20} width={20} unoptimized />
                      <p>{tech.name}</p>
                    </div>
                  ))}
                </Marquee>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bgColor)]"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bgColor)]"></div>
              </div>
            </div>
          </>
        )}

        {displayTab == "experience" && (
          <>
            <div className="mt-[30px] w-full mx-auto max-w-[1100px] px-4 sm:px-6">
              <ExperienceSection />
            </div>
          </>
        )}


        {displayTab == "blogs" && (
          <>
            <div className="flex flex-col mx-auto gap-[10px] w-[100%] max-w-[500px] mt-[50px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: [0, 1, 1, 0.8, 0.6, 0.4, 0.2, 0],
                  scale: [0.8, 1, 1, 0.98, 0.95, 0.9, 0.85, 0.8],
                  y: [20, 0, 0, -5, -10, -15, -20, -25]
                }}
                transition={{ 
                  duration: 3,
                  ease: "easeOut",
                  times: [0, 0.1, 0.3, 0.5, 0.7, 0.8, 0.9, 1],
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="text-center py-20"
              >
                <motion.h2 
                  className="font-mono text-4xl font-bold text-foreground mb-4"
                  animate={{
                    opacity: [0, 1, 1, 0.7, 0.3, 0],
                    scale: [0.9, 1, 1, 0.98, 0.95, 0.9]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  Coming Soon...
                </motion.h2>
              </motion.div>
            </div>
          </>
        )}

        <div className={styles.pageFooter}>
          <Link href="/Ganesh-Sarakadam-Resume.pdf" target="_blank">
            <p className={`flex items-center gap-[5px] underline font-mono font-bold text-2xl leading-[0.55rem] ${styles.resumeBtn}`}>
              Resume <ArrowUpRight className="w-auto h-[26px]" size={16} />
            </p>
          </Link>
          <p className="text-center opacity-[0.7] max-w-[580px] font-mono font-semibold text-base tracking-tight">
            Built by Ganesh Sarakadam | Last Updated: January 2025.
          </p>
        </div>
      </div>
    </div>
  )
}
