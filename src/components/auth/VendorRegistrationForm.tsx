
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface VendorRegistrationFormData {
  vendorName: string;
  vendorType: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  serviceArea: string;
  description: string;
}

const VendorRegistrationForm = ({ onSubmit }: { onSubmit: (data: VendorRegistrationFormData) => void }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<VendorRegistrationFormData>();
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vendorName">Business Name *</Label>
          <Input
            id="vendorName"
            {...register("vendorName", { required: "Business name is required" })}
          />
          {errors.vendorName && (
            <p className="text-sm text-red-500">{errors.vendorName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendorType">Service Type *</Label>
          <Select 
            onValueChange={(value) => {
              // Handle select change
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="catering">Catering</SelectItem>
              <SelectItem value="decor">Decor</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="music">Music/DJ</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
              <SelectItem value="venue">Venue</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="serviceArea">Service Area *</Label>
          <Input
            id="serviceArea"
            {...register("serviceArea", { required: "Service area is required" })}
            placeholder="e.g., New York City, NY"
          />
          {errors.serviceArea && (
            <p className="text-sm text-red-500">{errors.serviceArea.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">About Your Services</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Tell us about your services..."
            className="h-24"
          />
        </div>
      </div>
    </form>
  );
};

export default VendorRegistrationForm;
