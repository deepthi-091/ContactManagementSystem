"use client";

import { useEffect, useState } from "react";
import Step1Company from "./Step1Company";
import Step2Contact from "./Step2Contact";
import Step3Source from "./Step3Source";
import { createLead, updateLead } from "@/services/contactService";
import { Lead } from "@/types/lead.types";
import { useSnackbar } from "@/components/core/Snackbar";
const steps = ["Company", "Contact", "Source"];

const StepIndicator = ({ step }: { step: number }) => (
  <div className="flex items-center justify-between mb-8 px-6">
    {steps.map((label, index) => {
      const stepNumber = index + 1;
      const active = step === stepNumber;
      const completed = step > stepNumber;

      return (
        <div key={label} className="flex-1 flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              completed
                ? "bg-green-500 text-white"
                : active
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600"
            }`}
          >
            {completed ? "✓" : stepNumber}
          </div>

          <span
            className={`ml-2 text-xs font-medium ${
              active || completed ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {label}
          </span>

          {index !== steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-3 bg-white/40" />
          )}
        </div>
      );
    })}
  </div>
);

interface Props {
  initialData?: Lead;
  leadId?: string;
  mode?: "create" | "edit";
  onComplete: () => void;
}

export default function LeadWizard({
  initialData,
  leadId,
  mode = "create",
  onComplete,
}: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [lead, setLead] = useState<Lead>({
    companyName: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setLead(initialData);
    }
  }, [initialData]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    setLoading(true);
    try {
      if (mode === "edit" && leadId) {
        await updateLead(leadId, lead);
        showSnackbar('Lead updated successfully', 'success');
      } else {
        await createLead(lead);
        showSnackbar('Lead created successfully', 'success');
      }
      onComplete();
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="w-full max-w-xl space-y-6">
    {/* ✅ STEP INDICATOR – NO BACKGROUND */}
    <div className="px-6">
      <StepIndicator step={step} />
    </div>

    {/* ✅ GRADIENT APPLIED TO FORM CONTAINER */}
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-2xl p-1 shadow-2xl transition-all duration-300">
      {/* ✅ WHITE FORM CARD */}
      <div className="bg-white rounded-2xl p-8">
        {step === 1 && (
          <Step1Company data={lead} onChange={setLead} onNext={next} />
        )}

        {step === 2 && (
          <Step2Contact
            data={lead}
            onChange={setLead}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 3 && (
          <Step3Source
            data={lead}
            onChange={setLead}
            onBack={back}
            onSubmit={submit}
            loading={loading}
            submitLabel={mode === "edit" ? "Update Lead" : "Save Lead"}
          />
        )}
      </div>
    </div>
  </div>
);
}