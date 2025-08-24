"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

const ProjectsPage = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setProjectsData(data.projects);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch projects:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="bg-black min-h-screen text-white flex items-center justify-center"><p>Loading Project Logs...</p></div>;
  }

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <header className="text-center my-12">
        <h1 className="text-5xl font-bold text-cyan-300">PROJECT COMBAT LOGS</h1>
        <p className="text-xl text-cyan-200 mt-2">Analysis of Engagements & Victories</p>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
