"use client";

import { useState } from "react";
import InputField from "@/components/share/InputField";
import { Button } from "@/components/share/Button";

interface Step2ContactProps {
  data: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Contact({
  data,
  onChange,
  onNext,
  onBack,
}: Step2ContactProps) {
  const [error, setError] = useState("");

  const submit = () => {
    if (!data.email?.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(data.email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    onNext();
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">
        Contact Info
      </h2>

  <div className="space-y-4">
        {/* First Name */}
      <InputField
        placeholder="First Name"
        value={data.firstName ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ ...data, firstName: e.target.value })
        }
      />

      {/* Last Name */}
      <InputField
        placeholder="Last Name"
        value={data.lastName ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ ...data, lastName: e.target.value })
        }
      />

      {/* Email */}
      <InputField
        type="email"
        placeholder="Email *"
        value={data.email ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ ...data, email: e.target.value })
        }
        />
        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}

      {/* Phone */}
      <InputField
        type="tel"
        placeholder="Phone"
        value={data.phone ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ ...data, phone: e.target.value })
        }
      />
  </div>


      {/* Actions */}
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>

        <Button onClick={submit}>
          Next
        </Button>
      </div>
    </>
  );
}
