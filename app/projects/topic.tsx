"use client";

import Link from "next/link";
import React, { Key } from "react";
import { allProjects } from "contentlayer/generated";
import { Card } from "../components/card";
import { Article } from "./article";
import { Eye } from "lucide-react";
import {Tabs, Tab} from "@nextui-org/react"

const featured_lists: Record<string, { featured: string; top2: string; top3: string; }> = {
    "competition": {
        featured: "CEC2023",
        top2: "EngGames2024",
        top3: "CEC2024",
    },
    "personal": {
        featured: "smartess",
        top2: "redtok",
        top3: "eriberdy.me",
    },
    "school": {
        featured: "COMP551",
        top2: "COMP424",
        top3: "ECSE415",
    },
}

type Props = {
    views: Record<string, number>;
};

export default function Topic({ views }: Props) {

    const [topic, setTopic] = React.useState("competition");

    const handleSelectionChange = (key: Key) => {
        setTopic(key as string);
    }

    const featured = allProjects.find((project) => project.slug === featured_lists[topic].featured)!;
    const top2 = allProjects.find((project) => project.slug === featured_lists[topic].top2)!;
    const top3 = allProjects.find((project) => project.slug === featured_lists[topic].top3)!;
    const sorted = allProjects
        .filter((p) => p.published)
        .filter(
            (project) =>
                project.slug !== featured.slug &&
                project.slug !== top2.slug &&
                project.slug !== top3.slug,
        )
        .filter((project) => project.topic === topic)
        .sort(
            (a, b) =>
                new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
        );

    return (
        
        <div className="mt-0">
            {/* TODO: Add tabs for a tailwind ui library */}
            <Tabs className="mb-4" selectedKey={topic} onSelectionChange={handleSelectionChange}>
                <Tab key="competition" title="Competitions"></Tab>
                <Tab key="personal" title="Personal"></Tab>
                <Tab key="school" title="School"></Tab>
            </Tabs>
            <div className="hidden w-full h-px md:block bg-zinc-800 mb-16" />

            <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
                <Card>
                    <Link href={`/projects/${featured.slug}`}>
                    <article className="relative w-full h-full p-4 md:p-8">
                        <div className="flex items-center justify-between gap-2">
                        <div className="text-xs text-zinc-100">
                            {featured.date ? (
                            <time dateTime={new Date(featured.date).toISOString()}>
                                {Intl.DateTimeFormat(undefined, {
                                dateStyle: "medium",
                                }).format(new Date(featured.date))}
                            </time>
                            ) : (
                            <span>SOON</span>
                            )}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                            <Eye className="w-4 h-4" />{" "}
                            {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                            views[featured.slug] ?? 0,
                            )}
                        </span>
                        </div>

                        <h2
                        id="featured-post"
                        className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                        >
                        {featured.title}
                        </h2>
                        <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                        {featured.description}
                        </p>
                        <div className="absolute bottom-4 md:bottom-8">
                        <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                            Read more <span aria-hidden="true">&rarr;</span>
                        </p>
                        </div>
                    </article>
                    </Link>
                </Card>

                <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
                    {[top2, top3].map((project) => (
                    <Card key={project.slug}>
                        <Article project={project} views={views[project.slug] ?? 0} />
                    </Card>
                    ))}
                </div>
            </div>

            <div className="hidden w-full h-px md:block bg-zinc-800 my-16" />

            <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
                <div className="grid grid-cols-1 gap-4">
                    {sorted
                    .filter((_, i) => i % 3 === 0)
                    .map((project) => (
                        <Card key={project.slug}>
                        <Article project={project} views={views[project.slug] ?? 0} />
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {sorted
                    .filter((_, i) => i % 3 === 1)
                    .map((project) => (
                        <Card key={project.slug}>
                        <Article project={project} views={views[project.slug] ?? 0} />
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {sorted
                    .filter((_, i) => i % 3 === 2)
                    .map((project) => (
                        <Card key={project.slug}>
                        <Article project={project} views={views[project.slug] ?? 0} />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )};