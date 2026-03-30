import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  number: string;
  name: string;
  category: string;
  tools: string;
  link: string;
  github?: string;
  invite?: string;
}

const projects: Project[] = [
  {
    number: "01",
    name: "TrazCloud",
    category: "Full Stack Web Application",
    tools: "Next.js, Cloudflare R2, Prisma, Tailwind CSS",
    link: "https://github.com/trazhub",
  },
  {
    number: "02",
    name: "LocalMiner",
    category: "Desktop Tool / P2P Network",
    tools: "Port Forwarding, P2P, Minecraft Server Hosting",
    link: "https://github.com/LocalMiner/Installer",
  },
  {
    number: "03",
    name: "Discord Attachment Viewer",
    category: "Security Tool",
    tools: "JavaScript, Discord API, Web Security",
    link: "https://github.com/trazhub/Discord-Attachment-Viewer-",
  },
  {
    number: "04",
    name: "Storefileswithjs",
    category: "File Storage Utility",
    tools: "Node.js, VPS Storage, File Transfer",
    link: "https://github.com/trazhub/Storefileswithjs",
  },
  {
    number: "05",
    name: "aRGe",
    category: "E-Commerce & Social Media",
    tools: "Shopify, Social Media, Online Graphics",
    link: "https://arge.in",
  },
  {
    number: "06",
    name: "Barcore Java",
    category: "Discord Bot & Status Website",
    tools: "Java, Discord API, Web",
    link: "https://github.com/trazhub/Barcore-java",
    github: "https://github.com/trazhub/Barcore-java",
    invite: "https://discord.com/oauth2/authorize?client_id=1262341877273989180",
  },
];

const Work = () => {
  useEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div
              className="work-box"
              key={project.number}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                {(project.github || project.invite) && (
                  <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", fontSize: "0.9rem" }}>
                        GitHub Repo
                      </a>
                    )}
                    {project.invite && (
                      <a href={project.invite} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", fontSize: "0.9rem" }}>
                        Add Bot to Server
                      </a>
                    )}
                  </div>
                )}
                <div style={{ marginTop: "30px" }}>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ 
                      textDecoration: "underline", 
                      fontWeight: "500",
                      color: "var(--accentColor)" 
                    }}
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
