"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { getAccountDetails, UpdateAccountDetails } from "@/services/apicall";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ProfilePage({ session }: { session: any }) {
  const user = session?.user;
  const id = user?.id;
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    role: user?.role || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    pincode: "",
    district: "",
    state: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  //   useEffect(()=>{
  //     toast.info("Please update your personal details")
  // },[])
  //get user-details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response: any = await getAccountDetails(id);
        setData(response?.[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, []);
  // Handle Input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset message when user makes changes
    if (message) setMessage("");
  };

  // Handle pincode change to fetch district and state
  useEffect(() => {
    const fetchLocationData = async () => {
      // Only fetch if pincode is 6 digits
      if (formData?.pincode?.length === 6) {
        setIsLoading(true);
        try {
          // Using India Post API (example)
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${formData?.pincode}`
          );

          const data = await response.json();
          if (data[0].Status === "Success") {
            const locationData = data[0]?.PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              district: locationData?.District,
              state: locationData?.State,
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              district: "",
              state: "",
            }));
          }
        } catch (error) {
          console.error("Error fetching pincode data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLocationData();
  }, [formData?.pincode]);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate form
    if (
      !formData?.name ||
      !formData?.email ||
      !formData?.phone ||
      // !formData.address ||
      !formData?.pincode
    ) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      await UpdateAccountDetails({
        id,
        email: formData?.email,
        name: formData?.name,
        phoneNumber: formData?.phone,
        address: formData?.address,
        state: formData?.state,
        district: formData?.district,
        pincode: formData?.pincode,
        role: formData?.role,
      });
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/");
    }
    setMessage("Profile updated successfully!");

    // Reset form after successful submission (optional)
    // setFormData({
    //   name: '',
    //   email: '',
    //   phone: '',
    //   address: '',
    //   pincode: '',
    //   district: '',
    //   state: '',
    // });
  };

  return (
    <>
      <Head>
        <title>Profile Update</title>
        <meta name="description" content="Update your profile information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-lg sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-blue-500 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-bold">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "w"}
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Profile Details</h2>
                  <p className="text-sm text-gray-500 font-normal">
                    Update your personal information
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* Role Selection */}
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="">Select role</option>
                      <option value="Painter">Painter</option>
                      <option value="Dealer">Dealer</option>
                    </select>
                  </div>
                  {/* Name Field */}
                  <div className="flex flex-col">
                    <Label className="leading-loose">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col">
                    <Label className="leading-loose">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="flex flex-col">
                    <Label className="leading-loose">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  {/* Address Field */}
                  <div className="flex flex-col">
                    <Label className="leading-loose">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                      placeholder="Enter your complete address"
                    ></textarea>
                  </div>

                  {/* Pincode Field */}
                  <div className="flex flex-col">
                    <Label className="leading-loose">
                      Pincode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                      placeholder="Enter your 6-digit pincode"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      required
                    />
                  </div>

                  {/* District and State Fields (Auto-filled) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <Label className="leading-loose">District</Label>
                      <Input
                        type="text"
                        name="district"
                        value={formData.district}
                        readOnly
                        className="px-4 py-2 border bg-gray-50 text-gray-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                        placeholder={
                          isLoading ? "Loading..." : "Auto-filled from pincode"
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label className="leading-loose">State</Label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        readOnly
                        className="px-4 py-2 border bg-gray-50 text-gray-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                        placeholder={
                          isLoading ? "Loading..." : "Auto-filled from pincode"
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`py-4 text-center ${
                      message.includes("successfully")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4 flex items-center justify-between space-x-4">
                  <Button
                    type="button"
                    onClick={() =>
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        pincode: "",
                        district: "",
                        state: "",
                        role: "",
                      })
                    }
                    className="flex justify-center items-center"
                  >
                    <X className="w-5" /> Reset
                  </Button>
                  <Button
                    type="submit"
                    className="flex justify-center items-center"
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
