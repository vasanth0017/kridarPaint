"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getQr, redeemForm, updateQr } from "@/services/apicall";
import { Loader, Sparkles } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function BasicForm({ number, name, email, id }: any) {
  // State to manage form inputs
  const searchParams = useSearchParams();
  const code = searchParams?.get("code") || "";
  const amount = 50;
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  interface DataType {
    id?: string;
    used?: boolean;
    [key: string]: any;
  }

  const [data, setData] = useState<DataType>({});
  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    phoneNumber: number || "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getQr(code);
        const validData = response?.id
          ? response
          : Object.values(response).find((obj: any) => obj.id);

        setData(validData);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch QR code data");
      } finally {
        setIsLoading(false);
      }
    };

    if (code) fetchData();
    else setIsLoading(false);
  }, [code]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateQr(code);
      await redeemForm({
        userId: id,
        name: formData.name,
        phoneNumber: formData?.phoneNumber,
        amount,
      });
      toast.success("Form submitted successfully!");
      // Reset form after successful submission
      // setFormData({
      //   name: "",
      //   email: "",
      //   phoneNumber:""
      // });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no code is provided in URL params
  if (code.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[65vh] p-6">
        <div className="bg-red-50 p-6 rounded-xl shadow-md max-w-md w-full text-center">
          <h1 className="text-xl md:text-2xl font-bold text-red-500 mb-2">
            Use QR code to get reward
          </h1>
          <p className="text-gray-600">Check the paint box for QR code</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] md:min-h-[65vh]">
        <Loader className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (data?.used) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[65vh] p-6">
        <div className="bg-red-50 p-6 rounded-xl shadow-md max-w-md w-full text-center">
          <h1 className="text-xl md:text-2xl font-bold text-red-500 mb-2">
            QR Code Already Used
          </h1>
          <p className="text-gray-600">
            This QR code has been claimed already.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 md:p-6 my-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
        Claim Your Reward
      </h2>
      <h3 className="mb-6 text-center">
        {" "}
       {amount}{" "}rupees
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            readOnly
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            PhoneNumber
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.phoneNumber}
            readOnly
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Enter your email address"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader className="animate-spin w-5 h-5 mr-2" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
