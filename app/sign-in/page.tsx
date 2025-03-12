"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader, Mail, Lock, Circle, CircleDot } from "lucide-react";
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
        redirect: false,
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
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-md p-6  shadow-lg rounded-xl bg-background">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <Loader className="animate-spin mx-auto" size={18} />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative flex items-center my-4">
            <div className="w-full border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <Button
            onClick={() => socialAction("google")}
            className="flex items-center gap-2 justify-center w-full bg-red-500 hover:bg-red-600 text-white"
            disabled={googleIsLoading}
          >
            {googleIsLoading ? (
              <Circle className="animate-spin" size={18} />
            ) : (
              <CircleDot size={18} />
            )}
            Sign In with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            <Link href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
