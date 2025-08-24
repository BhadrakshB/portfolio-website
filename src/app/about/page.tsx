"use client";

import { useState, useEffect } from "react";
import JaegerConfigurator from "@/components/JaegerConfigurator/JaegerConfigurator";
import AboutMePanel from "@/components/AboutMePanel/AboutMePanel";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setAboutData(data.about);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch about page content:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="bg-black min-h-screen text-white flex items-center justify-center"><p>Loading Mission Logs...</p></div>;
  }

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-10">
      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <JaegerConfigurator />
        {aboutData && <AboutMePanel content={aboutData} />}
      </main>
    </div>
  );
};

export default AboutPage;
