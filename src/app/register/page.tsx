import type { Metadata } from "next";
import { RoleChoiceExperience } from "@/components/auth/role-choice-experience";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your WeConnect account as a developer or company.",
};

export default function RegisterPage() {
  return <RoleChoiceExperience />;
}
