"use client";import { useState } from "react";
import InputField from "@/components/share/InputField";
import SelectField from "@/components/share/SelectField";
import { Button } from "@/components/share/Button";
import {
  INDUSTRIES,
  EMPLOYEE_COUNTS,
} from "../../../constants/lead.constants";

export default function Step1Company({
  data,
  onChange,
  onNext,
}: {
  data: any;
  onChange: (value: any) => void;
  onNext: () => void;
}) {
  const [error, setError] = useState("");

  const submit = () => {
    if (!data.companyName?.trim()) {
      setError("Company name is required");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Company Info
      </h2>

      {/* ✅ Use space-y for form spacing */}
      <div className="space-y-4">
        
        {/* ✅ Company Name + Error grouped */}
        <div className="space-y-1">
          <InputField
            placeholder="Company Name *"
            value={data.companyName ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange({ ...data, companyName: e.target.value })
            }
          />
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Website */}
        <InputField
          placeholder="Website"
          value={data.website ?? ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...data, website: e.target.value })
          }
        />

        {/* City & Country */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            placeholder="City"
            value={data.city ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange({ ...data, city: e.target.value })
            }
          />
          <InputField
            placeholder="Country"
            value={data.country ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange({ ...data, country: e.target.value })
            }
          />
        </div>

        {/* Industry */}
        <SelectField
          options={INDUSTRIES}
          value={data.industry ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChange({ ...data, industry: e.target.value })
          }
        />

        {/* Employee Count */}
        <SelectField
          options={EMPLOYEE_COUNTS}
          value={data.employeeCount ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChange({ ...data, employeeCount: e.target.value })
          }
        />
      </div>

      {/* Next Button */}
      <Button className="mt-6" onClick={submit}>
        Next
      </Button>
    </>
  );
}
