"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badges";
import { adminChallengePaths, adminChallenges } from "@/lib/mock-data";

const LEVELS = ["Level 1", "Level 2", "Master"] as const;

export default function AdminChallengesPage() {
  return (
    <>
      <PageHeader
        title="Challenge Paths"
        description="Manage skill challenges by level. Create, edit, reorder and archive from each challenge."
        action={
          <Link href="/admin/challenges/new">
            <Button><Plus className="h-4 w-4" /> Create Challenge</Button>
          </Link>
        }
      />
      <div className="space-y-8">
        {adminChallengePaths.map((path) => (
          <Card key={path.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h3">{path.skill}</h2>
                <Badge variant="teal">{path.enrolled} enrolled</Badge>
              </div>
              {LEVELS.filter((level) => path.levels.includes(level)).map((level) => (
                <div key={level} className="mb-4">
                  <p className="text-label mb-2">{level}</p>
                  <ul className="space-y-2">
                    {adminChallenges.filter((c) => c.skill === path.skill && c.level === level).map((c) => (
                      <li key={c.id} className="flex items-center justify-between gap-3 rounded-[8px] border border-border px-3 py-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{c.name}</p>
                          <StatusBadge status={c.status} />
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/admin/challenges/${c.id}`}><Button variant="ghost" size="sm">View</Button></Link>
                          <Link href={`/admin/challenges/${c.id}`}><Button variant="ghost" size="sm">Edit</Button></Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
