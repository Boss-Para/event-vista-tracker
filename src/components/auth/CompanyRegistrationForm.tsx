
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface CompanyRegistrationFormData {
  companyName: string;
  website: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  description: string;
  location: string;
  gstNumber: string;
}

const CompanyRegistrationForm = ({ onSubmit }: { onSubmit: (data: CompanyRegistrationFormData) => void }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CompanyRegistrationFormData>();
  const toast = useToast();
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            {...register("companyName", { required: "Company name is required" })}
          />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            {...register("website")}
            placeholder="https://www.example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              validate: value => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gstNumber">GST Number</Label>
          <Input
            id="gstNumber"
            {...register("gstNumber")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Office Location *</Label>
          <Input
            id="location"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">About Company</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Tell us about your company..."
          className="h-24"
        />
      </div>
    </form>
  );
};

export default CompanyRegistrationForm;
