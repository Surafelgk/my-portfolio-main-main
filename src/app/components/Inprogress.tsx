import { FaGlobe, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

interface InprogressItem {
  title: string;
  tags: string[];
  website?: string;
  source?: string;
  status?: "completed" | "inprogress";
}

const inprogress: InprogressItem[] = [
  {
    title: "Video Motion",
    tags: ["Blender", "Cinema 4D", "Adobe After Effects (75%)"],
    website: "",
    source: "",
    status: "inprogress",
  },
  {
    title: "React/Next.js",
    tags: [
      "React",
      "next.js",
      "Typescript",
      "TailwindCSS",
      "Java",
      
    ],
    source: "",
    status: "inprogress",
  
  },
];

export default function Inprogress() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-2">In Progress</h2>
      <ul className="divide-y text-sm">
        {inprogress.map((item, index) => (
          <li
            key={index}
            className="py-3 border-gray-300 flex flex-col gap-1 ease-in-out hover:bg-gray-100  hover:opacity-90"
          >
            <div className="flex items-center gap-2">
              <span className=" ml-2 font-medium">{item.title}</span>
              {item.status && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status === "completed" ? "Completed" : "In Progress"}
                </span>
              )}
            </div>

            <div className="flex ml-2 mt-1 flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Progress motion: show percent if tag contains (NN%) or an indeterminate pulse when in progress */}
            {(() => {
              const percentTag = item.tags.find((t) => /\d+%/.test(t));
              const percent = percentTag ? parseInt((percentTag.match(/\d+/) || ["0"])[0], 10) : null;
              if (percent !== null && !Number.isNaN(percent)) {
                return (
                  <div className="w-full px-2 mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-blue-600"
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${item.title} progress`}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{percent}%</div>
                  </div>
                );
              }

              if (item.status === "inprogress") {
                return (
                  <div className="w-full px-2 mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 5 }}
                        animate={{ width: [, "100%", ] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-blue-500/80"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            <div className="flex ml-2 gap-3 mt-1 text-xs text-blue-500">
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  <FaGlobe className="text-[12px]" /> Website
                </a>
              )}
              {item.source && (
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  <FaGithub className="text-[12px]" /> Source
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

