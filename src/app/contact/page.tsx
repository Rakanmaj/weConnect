"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/public/page-header";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <PublicLayout>
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <PageHeader
            eyebrow="Contact"
            title="Get in touch"
            description="Have questions about WeConnect? Our team is here to help developers and companies get started."
          />
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-h3 text-navy mb-4">Contact information</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-label text-navy">Email</p>
                      <a
                        href="mailto:hello@weconnect.io"
                        className="text-body-sm text-muted hover:text-primary"
                      >
                        hello@weconnect.io
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-label text-navy">Phone</p>
                      <p className="text-body-sm text-muted">+962 6 123 4567</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-label text-navy">Office</p>
                      <p className="text-body-sm text-muted">
                        Amman, Jordan
                        <br />
                        Sunday – Thursday, 9am – 6pm
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="public-card p-5">
                <p className="text-label text-navy">Enterprise inquiries</p>
                <p className="mt-2 text-body-sm text-muted">
                  For custom plans, integrations, or volume hiring, mention
                  &ldquo;Enterprise&rdquo; in your message and we&apos;ll connect you with
                  our sales team.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <div className="public-card public-card--teal public-card--static p-8 text-center">
                  <div className="h-12 w-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="text-h3 text-navy">Message sent</h3>
                  <p className="mt-2 text-body-sm text-muted">
                    Thanks for reaching out. We&apos;ll get back to you within 1–2 business
                    days.
                  </p>
                  <Link href="/">
                    <Button variant="secondary" className="mt-6">Back to home</Button>
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="public-card public-card--static p-6 lg:p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" required>
                        First name
                      </Label>
                      <Input id="firstName" name="firstName" required placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" required>
                        Last name
                      </Label>
                      <Input id="lastName" name="lastName" required placeholder="Smith" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" required>
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" required>
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" required>
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us about your needs..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
