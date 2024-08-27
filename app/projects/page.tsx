
import React from "react";
import { Navigation } from "../components/nav";
import Topic from "./topic";
import { Redis } from "@upstash/redis";
import { allProjects } from "contentlayer/generated";


const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {

  const views = (
    await redis.mget<number[]>(
        ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
      )
  ).reduce((acc, v, i) => {
      acc[allProjects[i].slug] = v ?? 0;
      return acc;
  }, {} as Record<string, number>);
  

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-8 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Here you can browse various coding projects I worked on from various sources
          </p>
        </div>

        <Topic views={views}/>
      </div>
    </div>
  );
}
