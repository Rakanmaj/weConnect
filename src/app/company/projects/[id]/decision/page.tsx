"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { Briefcase, ShoppingCart, UserPlus, XCircle } from "lucide-react";
import { ProjectTabs } from "@/components/company/project-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badges";
import { companyProjects } from "@/lib/mock-data";
import { getAcceptedAssignments, getPurchasableAssignments } from "@/lib/assignments";
import { useProjectFinancials } from "@/lib/platform-settings";
import { formatCurrency, isPaidProjectType } from "@/lib/platform-config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const decisions = [
  {
    id: "buy",
    title: "Buy Project",
    description: "Purchase a successfully completed submission. Source-code ownership transfers according to the project agreement after payment is completed.",
    icon: ShoppingCart,
    color: "border-primary bg-blue-50",
  },
  {
    id: "hire",
    title: "Hire Developer",
    description: "Extend an offer to a developer based on their project performance.",
    icon: UserPlus,
    color: "border-teal bg-teal/5",
  },
  {
    id: "close",
    title: "Close Without Purchase",
    description: "End the project without purchasing or hiring. Developers retain their work. Reviewing a submission does not transfer ownership.",
    icon: XCircle,
    color: "border-border",
  },
];

export default function ProjectDecisionPage({ params }: PageProps<"/company/projects/[id]/decision">) {
  const { id } = use(params);
  const project = companyProjects.find((p) => p.id === id);
  if (!project) notFound();

  const [selected, setSelected] = useState<string | null>(null);
  const [developerId, setDeveloperId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [purchased, setPurchased] = useState(Boolean(project.purchasedAssignmentId));

  const accepted = getAcceptedAssignments(project);
  const purchasable = getPurchasableAssignments(project);
  const financials = useProjectFinancials(project.budget ?? 0);
  const selectedDecision = decisions.find((d) => d.id === selected);

  const confirmDecision = () => {
    if (selected === "buy") {
      setConfirmOpen(false);
      setBuyOpen(true);
      return;
    }
    setConfirmOpen(false);
  };

  return (
    <>
      <ProjectTabs projectId={project.id} projectTitle={project.title} />

      <div className="grid gap-4 lg:grid-cols-3 mb-8">
        {decisions.map((dec) => {
          const Icon = dec.icon;
          return (
            <button
              key={dec.id}
              type="button"
              onClick={() => setSelected(dec.id)}
              className={`rounded-[10px] border p-6 text-left transition-all ${
                selected === dec.id ? dec.color + " ring-2 ring-primary/20" : "border-border hover:bg-surface"
              }`}
            >
              <Icon className="h-6 w-6 text-foreground mb-3" />
              <p className="text-h4 text-foreground">{dec.title}</p>
              <p className="text-body-sm text-muted mt-2">{dec.description}</p>
            </button>
          );
        })}
      </div>

      {selected === "hire" && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-label text-foreground mb-4">Select a developer who accepted and worked on this project</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {accepted.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setDeveloperId(a.developerId)}
                  className={`flex items-center gap-3 rounded-[8px] border p-3 text-left ${
                    developerId === a.developerId ? "border-primary bg-blue-50" : "border-border"
                  }`}
                >
                  <Avatar name={a.developer.name} />
                  <div>
                    <p className="text-label text-foreground">{a.developer.name}</p>
                    <p className="text-caption">{a.matchScore}% match · {a.workStatus}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selected === "buy" && isPaidProjectType(project.type) && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-label text-foreground mb-4">Select a successfully completed submission to purchase</p>
            {purchasable.length === 0 ? (
              <p className="text-body-sm text-muted">
                No developer has been marked Completed yet. Evaluate a submitted developer first. Reviewing a demo does not transfer ownership.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {purchasable.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setDeveloperId(a.developerId)}
                    className={`flex items-center gap-3 rounded-[8px] border p-3 text-left ${
                      developerId === a.developerId ? "border-primary bg-blue-50" : "border-border"
                    }`}
                  >
                    <Avatar name={a.developer.name} />
                    <div>
                      <p className="text-label">{a.developer.name}</p>
                      <StatusBadge status="Completed" />
                    </div>
                  </button>
                ))}
              </div>
            )}
            {purchased && <p className="text-body-sm text-teal mt-4">Purchase recorded. Source-code access is now available for the selected submission.</p>}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Button disabled={!selected} onClick={() => setConfirmOpen(true)}>
          <Briefcase className="h-4 w-4" />
          Confirm decision
        </Button>
        <Link href={`/company/projects/${project.id}`}>
          <Button variant="secondary">Back to project</Button>
        </Link>
      </div>

      <ConfirmDialog
        open={confirmOpen && selected !== "buy"}
        onOpenChange={setConfirmOpen}
        title={`Confirm: ${selectedDecision?.title}`}
        description={selectedDecision?.description ?? ""}
        confirmLabel="Confirm"
        onConfirm={confirmDecision}
      />

      <Dialog open={buyOpen} onOpenChange={setBuyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project Purchase</DialogTitle>
            <DialogDescription>
              Payment is processed if the company purchases the selected successfully completed submission. Clicking confirm starts payment — ownership transfers according to the project agreement after payment is completed.
            </DialogDescription>
          </DialogHeader>
          <dl className="space-y-2 text-body-sm">
            <div className="flex justify-between"><dt className="text-muted">Project Purchase</dt><dd className="font-medium">{formatCurrency(financials.budget)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Developer Payout</dt><dd className="font-medium">{formatCurrency(financials.developerPayout)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">WeConnect Commission</dt><dd className="font-medium">{formatCurrency(financials.commissionAmount)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Commission Rate</dt><dd className="font-medium">{financials.commissionPercentage}%</dd></div>
          </dl>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setBuyOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setPurchased(true);
                setBuyOpen(false);
              }}
            >
              Confirm payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
