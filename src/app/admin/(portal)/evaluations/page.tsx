"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/common";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePlatformSettings } from "@/lib/platform-settings";
import type { CompanyEvaluationCriterion } from "@/types";

export default function AdminEvaluationsPage() {
  const { settings, updateSettings } = usePlatformSettings();
  const [rubric, setRubric] = useState<CompanyEvaluationCriterion[]>(settings.companyEvaluationRubric);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateSettings({ companyEvaluationRubric: rubric });
    setEditing(false);
    setSaved(true);
  };

  return (
    <>
      <PageHeader
        title="Evaluation Patterns"
        description="Company project evaluation rubric. This is not the AI initial-assessment scoring system."
        action={
          editing ? (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => { setRubric(settings.companyEvaluationRubric); setEditing(false); }}>Cancel</Button>
              <Button onClick={save}>Save rubric</Button>
            </div>
          ) : (
            <Button onClick={() => setEditing(true)}>Edit Evaluation Rubric</Button>
          )
        }
      />
      {saved && <p className="text-caption text-teal mb-4">Rubric updated. Company evaluation forms now use these categories.</p>}
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="px-4 py-3 text-left text-table-header">Category</th>
              <th className="px-4 py-3 text-left text-table-header">Weight</th>
              <th className="px-4 py-3 text-left text-table-header">Description</th>
            </tr>
          </thead>
          <tbody>
            {rubric.map((row, i) => (
              <tr key={row.key} className="border-b border-border">
                <td className="px-4 py-3 text-body-sm font-medium">
                  {editing ? <Input value={row.label} onChange={(e) => setRubric((prev) => prev.map((r, idx) => idx === i ? { ...r, label: e.target.value } : r))} /> : row.label}
                </td>
                <td className="px-4 py-3 text-body-sm">
                  {editing ? (
                    <Input
                      type="number"
                      className="w-20"
                      value={row.weight}
                      onChange={(e) => setRubric((prev) => prev.map((r, idx) => idx === i ? { ...r, weight: Number(e.target.value) } : r))}
                    />
                  ) : `${row.weight}%`}
                </td>
                <td className="px-4 py-3 text-body-sm text-muted">
                  {editing ? <Textarea rows={2} value={row.description} onChange={(e) => setRubric((prev) => prev.map((r, idx) => idx === i ? { ...r, description: e.target.value } : r))} /> : row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="mt-6">
        <CardContent className="pt-6">
          <p className="text-body-sm text-muted">
            Companies score each category for an individual developer submission, then mark that developer Completed or Not Completed. Do not reuse this rubric for initial AI assessments.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
