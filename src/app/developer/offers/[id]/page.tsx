"use client";

import { useState, use } from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, MapPin, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/ui/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/developer/card";
import { StatusBadge } from "@/components/ui/status-badges";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { developerOffer } from "@/lib/mock-data";

export default function OfferDetailPage({
  params,
}: PageProps<"/developer/offers/[id]">) {
  const { id } = use(params);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const offer = { ...developerOffer, id };

  if (accepted) {
    return (
      <div className="max-w-lg mx-auto min-w-0">
        <Card className="text-center">
          <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
          <p className="text-h3 text-foreground">Offer Accepted</p>
          <p className="text-body-sm text-muted mt-2">
            You accepted the {offer.role} offer at {offer.company.name}. Start date: {offer.startDate}.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/developer/career">Back to Career</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto min-w-0">
      <PageHeader
        breadcrumb={
          <Link href="/developer/career" className="text-caption text-primary hover:underline">
            ← Back to Career
          </Link>
        }
        title="Job Offer"
        description={`${offer.role} at ${offer.company.name}`}
      />

      <Card className="mb-6">
        <StatusBadge status="Pending" className="mb-4" />
        <p className="text-body-sm text-muted mb-6">{offer.message}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <DollarSign className="h-4 w-4 text-muted shrink-0 mt-0.5" />
            <div>
              <p className="text-caption">Compensation</p>
              <p className="font-medium">{offer.salary}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted shrink-0 mt-0.5" />
            <div>
              <p className="text-caption">Start Date</p>
              <p className="font-medium">{offer.startDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted shrink-0 mt-0.5" />
            <div>
              <p className="text-caption">Location</p>
              <p className="font-medium">{offer.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-muted shrink-0 mt-0.5" />
            <div>
              <p className="text-caption">Expires</p>
              <p className="font-medium">{offer.expiresAt}</p>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-medium text-foreground mt-6 mb-2">Benefits</h3>
        <ul className="space-y-1">
          {offer.benefits.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1" onClick={() => setAcceptOpen(true)}>Accept Offer</Button>
        <Button variant="secondary" className="flex-1">Negotiate</Button>
        <Button variant="ghost" className="flex-1">Decline</Button>
      </div>

      <Dialog open={acceptOpen} onOpenChange={setAcceptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept Offer?</DialogTitle>
            <DialogDescription>
              You are accepting the {offer.role} position at {offer.company.name} with a start date of {offer.startDate}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAcceptOpen(false)}>Cancel</Button>
            <Button onClick={() => { setAcceptOpen(false); setAccepted(true); }}>Confirm Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
