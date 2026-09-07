"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { internalProjects } from "@/lib/mock-data";
import { InternalProjectForm } from "../../new/page";

export default function EditInternalProjectPage({ params }: PageProps<"/admin/internal-projects/[id]/edit">) {
  const { id } = use(params);
  const project = internalProjects.find((p) => p.id === id);
  if (!project) notFound();
  return <InternalProjectForm title={`Edit ${project.title}`} initial={project} submitLabel="Save changes" />;
}
