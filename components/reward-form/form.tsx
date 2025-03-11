"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getQr, redeemForm, updateQr } from "@/services/apicall";
import { Loader, Mail, Phone, Sparkles, User } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AllProduct } from "@/lib/productlist";
import LuxuryCoin from "../amount/display";
export default function BasicForm({ number, name, email, id }: any) {
  // State to manage form inputs
  const searchParams = useSearchParams();
  const code = searchParams?.get("code") || "";
  const items = searchParams?.get("item") || "";
  const productData = AllProduct.find((item: any) => items === item?.value);
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
    if (!formData?.name || !formData?.email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateQr(code);
      await redeemForm({
        userId: id,
        name: formData?.name,
        phoneNumber: formData?.phoneNumber,
        amount: productData?.amount,
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
  if (code?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[65vh] p-6">
        <div className="p-6 rounded-xl shadow-md max-w-md w-full text-center">
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
    <div className="max-w-md mx-auto p-6 my-8 bg-gradient-to-br  rounded-2xl shadow-lg border border-gray-100">
      {/* Header with glass effect */}
      <div className="mb-8 text-center p-4 bg-secondary bg-opacity-70 backdrop-blur-sm rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-1 text-gray-800">
          Claim Your Reward
        </h2>

        <div className="flex items-center flex-col justify-center gap-2 mt-4">
          <div className="text-xl font-medium ">{productData?.name}</div>
          <div className="bg-amber-50 p-1 items-center rounded-full border border-amber-100">
            <LuxuryCoin amount={productData?.amount} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="block text-sm font-medium">
            Name
          </Label>
          <div className="relative">
            <Input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              readOnly
              className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <User className="p-1" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="block text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              readOnly
              className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Mail className="p-1" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </Label>
          <div className="relative">
            <Input
              type="tel"
              id="phone"
              name="phoneNumber"
              value={formData?.phoneNumber}
              readOnly
              className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Phone className="p-1" />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-3.5 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader className="animate-spin w-5 h-5 mr-2" />
              Processing...
            </span>
          ) : (
            "Redeem Points"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs">
        By redeeming, you agree to our Terms & Conditions
      </div>
    </div>
  );
}
