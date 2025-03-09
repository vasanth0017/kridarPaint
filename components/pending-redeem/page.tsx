"use client";

import { deleteRedeem } from "@/services/apicall";
import { Delete, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function PendingRedeems({ userDetails }: { userDetails: any }) {
  const [users, setUsers] = useState(userDetails || []);
  const handleDelete = async (id: string) => {
    try {
      await deleteRedeem(id);
      setUsers(users.filter((user: any) => user.id !== id));
      toast.message("data cleared successfully")
    } catch (error) {
        console.error(error)
    }
  };

  if (!users.length) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">
          No pending redeems available
        </h2>
        <p className="mt-2 text-gray-500">All redeems have been processed</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Pending Redeems</h1>

      <div className="space-y-4">
        {users.map((user: any) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="p-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-indigo-600">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <div className="flex flex-wrap items-center text-sm text-gray-600">
                        <Phone className="w-6 p-1 "/>
                        <span>{user.phonenumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="px-4 py-2 bg-green-50 rounded-full mr-4">
                    <span className="text-lg font-bold text-green-600">
                      ${user.amount?.toLocaleString() || 0}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleDelete(user?.id)}
                    variant="destructive"
                    className="p-2"
                    aria-label="Delete redeem request"
                  >
                   <Delete />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
