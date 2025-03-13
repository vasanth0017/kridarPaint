"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader, Mail, Lock, Circle, CircleDot } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleIsLoading, setGoogleIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true, 
        callbackUrl: "/create-account",
      });

      if (res?.error) throw new Error("Invalid credentials. Please try again.");

      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const socialAction = async (provider: string) => {
    if (provider === "google") {
      setGoogleIsLoading(true);
    }

    await signIn(provider, {
      callbackUrl: "/create-account",
      redirect: true,
    }).then((callback) => {
      if (callback?.error) {
        toast.error(
          "An error occurred while trying to login. Please try again."
        );
      }
      setGoogleIsLoading(false);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-2xl border border-gray-100">
        <CardHeader className="pb-2">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sign In
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium  mb-1">Email</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium  mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 shadow-sm"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-medium transition-all mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin mx-auto" size={18} />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="w-full border-t border-gray-200"></div>
            <span className="mx-4 px-2  text-gray-500 text-sm font-medium">
              OR
            </span>
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <Button
            onClick={() => socialAction("google")}
            disabled={googleIsLoading}
            variant="outline"
            className="flex items-center gap-2 w-full justify-center h-12 rounded-lg"
          >
            {googleIsLoading ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              <>
                <Image
                  src={"/google.svg"}
                  width={22}
                  height={22}
                  alt="Google"
                  priority
                />
                Sign In with Google
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
            <Link
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-4 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
