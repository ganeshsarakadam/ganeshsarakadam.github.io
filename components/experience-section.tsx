// Renders three groups with clean spacing, left logo, center text, right-aligned dates.
// Mobile stacks date under title; desktop keeps right alignment.

type Item = {
  logoAlt: string
  logoSrc?: string
  title: string
  subtitle: string
  dates: string
}

function Row({ item }: { item: Item }) {
  return (
    <div className="grid grid-cols-[48px_1fr_auto] items-center gap-4 py-4 border-b border-white/5 last:border-b-0 md:py-5">
      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
        {item.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logoSrc || "/placeholder.svg"}
            alt={item.logoAlt}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="sr-only">{item.logoAlt}</span>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-foreground text-pretty font-mono text-lg">{item.title}</div>
        <div className="text-muted-foreground font-mono text-base">{item.subtitle}</div>
        <div className="mt-1 text-sm text-muted-foreground md:hidden">{item.dates}</div>
      </div>
      <div className="hidden md:block text-muted-foreground whitespace-nowrap font-semibold font-sans text-base">{item.dates}</div>
    </div>
  )
}

function Group({
  title,
  items,
}: {
  title: string
  items: Item[]
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-foreground font-mono font-extrabold text-2xl">{title}</h3>
      <div className="rounded-xl bg-white/5 p-3 md:p-4">
        {items.map((it, i) => (
          <Row key={i} item={it} />
        ))}
      </div>
    </section>
  )
}

export default function ExperienceSection() {
  const building: Item[] = [
    {
      logoAlt: "Prepwise logo",
      logoSrc: "/prepwise.png",
      title: "Prepwise",
      subtitle: "AI Voice Agents for Interview Preparation",
      dates: "July 2025 - Present",
    },
    {
      logoAlt: "HackTracker logo",
      logoSrc: "/hacktracker.png",
      title: "HackTracker",
      subtitle: "Track Hackathons for Efficient Participation",
      dates: "June 2025 - Present",
    },
  ]

  const work: Item[] = [
    {
      logoAlt: "Citi Bank logo",
      logoSrc: "/citi-main.jpg ",
      title: "Citi Bank",
      subtitle: "Software Engineer",
      dates: "August 2024 - August 2025",
    },
    {
      logoAlt: "Berkadia logo",
      logoSrc: "/berkadia-main.jpg",
      title: "Berkadia",
      subtitle: "Software Engineer",
      dates: "Mar 2018 - July 2022"
    },
  ]

  const education: Item[] = [
    {
      logoAlt: "Ohio University logo",
      logoSrc: "/Ohio-University-logo.jpg",
      title: "Ohio University",
      subtitle: "Masters in Computer Science",
      dates: "Aug 2022 - May 2024",
    },
    {
      logoAlt: "JNTUH logo",
      logoSrc: "/JNTU_Hyderabad_logo.png",
      title: "JNTUH",
      subtitle: "B.Tech in Computer Science and Engineering",
      dates: "Aug 2014 - May 2018",
    },
  ]

  return (
    <div className="space-y-8 md:space-y-10">
      {/* <Group title={"I'm Currently Building"} items={building} /> */}
      <Group title="Work Experiences" items={work} />
      <Group title="Education" items={education} />
    </div>
  )
}
