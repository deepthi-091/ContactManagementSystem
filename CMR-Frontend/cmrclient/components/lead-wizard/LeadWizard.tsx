"use client";

import { useState } from "react";
import StepCompany from "./StepCompany";
import StepContact from "./StepContact";
import StepSource from "./StepSource";
import type { ContactFormData } from "@/types/contact";

const initialFormData: ContactFormData = {
  companyName: "",
  website: "",
  city: "",
  country: "",
  industry: "",
  employeeCount: "",
  firstName: "",
  lastName: "",
  email: "",
  jobTitle: "",
  phone: "",
  leadSource: "",
  notes: "",
};

export default function LeadWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const nextFromCompany = () => {
    if (!formData.companyName.trim()) {
      setError("Company name is required");
      return;
    }
    setError("");
    setStep(2);
  };

  const nextFromContact = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    setError("");
    setStep(3);
  };

  const saveLead = () => {
    setError("");
    setSuccess(true);

    setTimeout(() => {
      setFormData(initialFormData);
      setStep(1);
      setSuccess(false);
    }, 1200);
  };

  const steps = ["Company", "Contact", "Source"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-lg p-6 md:p-8 transition-all">
        
        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-between">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div key={label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`mt-2 text-xs ${
                      isActive
                        ? "text-blue-600 font-medium"
                        : isCompleted
                        ? "text-green-600"
                        : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-slate-200 mx-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center animate-fade-in">
            <div className="text-3xl mb-3">✅</div>
            <div className="font-semibold text-slate-900 text-lg">
              Lead saved successfully
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Ready for the next one
            </p>
          </div>
        ) : (
          <div className="transition-all duration-200">
            {step === 1 && (
              <StepCompany
                data={formData}
                onChange={setFormData}
                onNext={nextFromCompany}
              />
            )}

            {step === 2 && (
              <StepContact
                data={formData}
                onChange={setFormData}
                onBack={() => setStep(1)}
                onNext={nextFromContact}
              />
            )}

            {step === 3 && (
              <StepSource
                data={formData}
                onChange={setFormData}
                onBack={() => setStep(2)}
                onSave={saveLead}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}