"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MatchScore } from "@/components/ui/progress";
import { LevelBadge, SkillBadge } from "@/components/ui/status-badges";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allDevelopers } from "@/lib/mock-data";
import { Search } from "lucide-react";

export default function CompanyTalentPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = allDevelopers.filter((dev) => {
    const matchesSearch = dev.name.toLowerCase().includes(search.toLowerCase()) ||
      dev.skills.some((s) => s.name.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === "all" || dev.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <PageHeader
        title="Talent Explorer"
        description="Discover verified developers by skills, level, and availability."
      />

      <div className="flex flex-col gap-3 sm:flex-row mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            className="pl-9"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-11 rounded-[6px] border border-border bg-card px-3 text-sm"
        >
          <option value="all">All roles</option>
          <option value="Full-Stack Developer">Full-Stack</option>
          <option value="Frontend Developer">Frontend</option>
          <option value="Backend Developer">Backend</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((dev) => (
          <Card key={dev.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar name={dev.name} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-h4 text-foreground">{dev.name}</h3>
                        {dev.weconnectVerified && <VerifiedBadge type="weconnect" />}
                      </div>
                      <p className="text-caption">{dev.role} · {dev.location}</p>
                    </div>
                    {dev.matchScore && <MatchScore score={dev.matchScore} size="sm" />}
                  </div>
                  <LevelBadge level={dev.overallLevel} className="mt-2" />
                  <p className="text-caption mt-2">{dev.availability}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dev.skills.slice(0, 4).map((s) => (
                      <SkillBadge key={s.name} name={s.name} level={s.level} verified={s.verified} />
                    ))}
                  </div>
                  <Link href={`/company/talent/${dev.id}`} className="inline-block mt-4">
                    <Button size="sm">View profile</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
