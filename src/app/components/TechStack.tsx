export default function TechStack() {
  const techStack = {
    "Video Editing & Production": [
      "Adobe Premiere Pro", "DaVinci Resolve", "Adobe After Effects", 
      
    ],
    "Design & 3D Modeling": [
      "Adobe Photoshop", "Figma", "Adobe Illustrator", 
     , "Adobe InDesign", "Canva", 
    ],
    "Languages": [
      "JavaScript", "HTML", "CSS", "Java", "C++"
    ],
    "Frameworks & Libraries": [
      "React", "Next.js", "Bootstrap"
    ],
    "Databases & Cloud": [
      "MS SQL", "Firebase"
    ],
    "Tools & DevOps": [
      "Git", "GitHub", "Figma"
    ]
  };

  const colorMap = {
    // Video Editing & Production
    "Adobe Premiere Pro": "hover:bg-purple-300 hover:text-white",
    "DaVinci Resolve": "hover:bg-yellow-600 hover:text-white",
    "Adobe After Effects": "hover:bg-purple-400 hover:text-white",
    
  

    // Design & 3D Modeling
    "Adobe Photoshop": "hover:bg-blue-400 hover:text-white",
    Figma: "hover:bg-pink-200",
    "Adobe Illustrator": "hover:bg-orange-400 hover:text-white",
    Blender: "hover:bg-orange-300",
    "Adobe InDesign": "hover:bg-pink-400 hover:text-white",
    Canva: "hover:bg-teal-300",


    // Languages
    "C++": "hover:bg-gray-300",
    Java: "hover:bg-red-200",
    JavaScript: "hover:bg-yellow-100",
    HTML: "hover:bg-orange-200",
    CSS: "hover:bg-blue-100",

    // Frameworks & Libraries
    React: "hover:bg-blue-200",
    "Next.js": "hover:bg-black hover:text-white",
    Bootstrap: "hover:bg-purple-200",

    // Databases & Cloud
    "MS SQL": "hover:bg-blue-100",
    Firebase: "hover:bg-yellow-300",

    // Tools & DevOps
    Git: "hover:bg-orange-300",
    GitHub: "hover:bg-gray-800 hover:text-white",
  };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold">Creative & Technical Stack</h2>
      <div className="mt-4 space-y-6">
        {Object.entries(techStack).map(([category, items], idx) => (
          <div key={idx}>
            <h3 className="text-sm font-semibold text-gray-700">{category}</h3>
            <div className="text-sm mt-2 flex flex-wrap gap-2">
              {items.map((tech, index) => (
                <span
                  key={index}
                  className={`bg-gray-100 text-xs text-gray-800 px-3 py-1 rounded-full cursor-pointer transition duration-300 ease-in-out ${colorMap[tech as keyof typeof colorMap] || "hover:bg-gray-200"}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}