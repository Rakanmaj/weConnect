"use client";

import { useState } from "react";
import { PageHeader, FormField } from "@/components/ui/common";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { companyTeamMembers } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TeamRow = (typeof companyTeamMembers)[0];

const roleColors: Record<string, "primary" | "teal" | "navy"> = {
  Admin: "navy",
  Evaluator: "primary",
  Recruiter: "teal",
};

export default function CompanyTeamPage() {
  const [members, setMembers] = useState(companyTeamMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Evaluator");
  const [editing, setEditing] = useState<TeamRow | null>(null);

  const columns: Column<TeamRow>[] = [
    { key: "name", header: "Name", cell: (row) => row.name },
    { key: "email", header: "Email", cell: (row) => row.email },
    {
      key: "role",
      header: "Role",
      cell: (row) => <Badge variant={roleColors[row.role] || "default"}>{row.role}</Badge>,
    },
    { key: "lastActive", header: "Last active", cell: (row) => row.lastActive },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <Button variant="ghost" size="sm" onClick={() => setEditing(row)}>Edit</Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Team Management"
        description="Manage team members with Admin, Evaluator, and Recruiter roles. Evaluators can be assigned to projects."
        action={<Button onClick={() => setInviteOpen(true)}>Invite member</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {(["Admin", "Evaluator", "Recruiter"] as const).map((roleLabel) => (
          <div key={roleLabel} className="rounded-[10px] border border-border p-4">
            <Badge variant={roleColors[roleLabel]}>{roleLabel}</Badge>
            <p className="text-caption mt-2">
              {roleLabel === "Admin" && "Full access to projects, billing, and team settings."}
              {roleLabel === "Evaluator" && "Assigned to projects for kickoff, weekly review and final evaluation."}
              {roleLabel === "Recruiter" && "Manage hiring pipeline, interviews, and offers."}
            </p>
          </div>
        ))}
      </div>

      <DataTable
        data={members}
        columns={columns}
        searchKeys={["name", "email", "role"]}
        searchPlaceholder="Search team members..."
      />

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite team member</DialogTitle>
          </DialogHeader>
          <FormField label="Name" required><Input value={name} onChange={(e) => setName(e.target.value)} /></FormField>
          <FormField label="Email" required><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></FormField>
          <FormField label="Role">
            <select value={role} onChange={(e) => setRole(e.target.value)} className="flex h-11 w-full rounded-[6px] border border-border bg-card px-3 text-sm">
              <option>Admin</option>
              <option>Evaluator</option>
              <option>Recruiter</option>
            </select>
          </FormField>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button
              disabled={!name.trim() || !email.trim()}
              onClick={() => {
                setMembers((prev) => [
                  ...prev,
                  { id: `tm-${prev.length + 1}`, name, email, role, lastActive: "Just now" },
                ]);
                setName("");
                setEmail("");
                setInviteOpen(false);
              }}
            >
              Send invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(editing)}
        onOpenChange={() => setEditing(null)}
        title={editing ? `Update ${editing.name}?` : "Edit member"}
        description="Role changes take effect immediately in this workspace."
        confirmLabel="Save"
        onConfirm={() => setEditing(null)}
      />
    </>
  );
}
