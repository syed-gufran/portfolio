import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { useGitHubRepos } from "@/hooks/use-github-repos"; // Make sure this fetches repos sorted by recent update
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsSection() {
  // Change username here:
  const { data: repos, isLoading, error } = useGitHubRepos("syed-gufran");

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-500 bg-opacity-20 text-yellow-400",
      Python: "bg-green-500 bg-opacity-20 text-green-400",
      TypeScript: "bg-blue-500 bg-opacity-20 text-blue-400",
      HTML: "bg-orange-500 bg-opacity-20 text-orange-400",
      CSS: "bg-blue-500 bg-opacity-20 text-blue-400",
      "Jupyter Notebook": "bg-orange-500 bg-opacity-20 text-orange-400",
    };
    return colors[language || ""] || "bg-gray-500 bg-opacity-20 text-gray-400";
  };

  const projectImages = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  ];

  // Map each repo ID to a unique random image
  const repoImageMap = React.useMemo(() => {
    if (!repos) return {};
    const usedIndices = new Set<number>();
    const map: Record<string, string> = {};

    for (const repo of repos) {
      let idx: number;
      if (usedIndices.size < projectImages.length) {
        do {
          idx = Math.floor(Math.random() * projectImages.length);
        } while (usedIndices.has(idx));
        usedIndices.add(idx);
      } else {
        idx = Math.floor(Math.random() * projectImages.length);
      }
      map[repo.id] = projectImages[idx];
    }
    return map;
  }, [repos, projectImages]);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto" />
        </motion.div>

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="backdrop-blur-md bg-white/5 border-white/10">
                <CardHeader>
                  <Skeleton className="h-48 w-full bg-white/10" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-3/4 mb-2 bg-white/10" />
                  <Skeleton className="h-4 w-full mb-4 bg-white/10" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 bg-white/10" />
                    <Skeleton className="h-6 w-16 bg-white/10" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 p-8">
            <p>Failed to load projects. Please check your internet connection.</p>
          </div>
        )}

        {repos && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="backdrop-blur-md bg-white/5 border-white/10 h-full overflow-hidden hover:border-blue-400/30 transition-all duration-300">
                    <CardHeader className="p-0">
                      <img
                        src={repoImageMap[repo.id]}
                        alt={repo.name}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl font-bold mb-3 text-white">
                        {repo.name.charAt(0).toUpperCase() + repo.name.slice(1)}
                      </CardTitle>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {repo.description || "No description available"}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.language && (
                          <Badge className={`${getLanguageColor(repo.language)} border-0`}>
                            {repo.language}
                          </Badge>
                        )}
                        {repo.topics.slice(0, 2).map((topic) => (
                          <Badge
                            key={topic}
                            className="bg-blue-500 bg-opacity-20 text-blue-400 border-0"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star size={14} />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork size={14} />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                          onClick={() => window.open(repo.html_url, "_blank")}
                        >
                          <Github className="mr-2" size={16} />
                          View Code
                        </Button>
                        {repo.homepage && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                            onClick={() => window.open(repo.homepage!, "_blank")}
                          >
                            <ExternalLink className="mr-2" size={16} />
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                onClick={() => window.open("https://github.com/syed-gufran", "_blank")}
              >
                <Github className="mr-2" size={20} />
                View All Projects on GitHub
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
