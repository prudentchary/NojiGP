import React, { useState } from "react";
import { X, MailCheck } from "lucide-react"; // Added MailCheck for a nice icon
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNavigate, Link } from "react-router";
import backgroundImage from "@/assets/login_bg.png";
import { useToast } from "@/components/ui/Toast";
import api from "@/lib/api";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
    const { success, error: toastError } = useToast();
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const emailValue = watch("email");
    const isFormFilled = emailValue.length > 0;

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setLoading(true);
        try {
            await api.post("/auth/forgot-password", {
                email: data.email,
            });
            success("Reset link sent successfully!");
            setIsSuccess(true);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to initiate password reset.";
            toastError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="relative w-full max-w-[540px] bg-white rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                {/* Header */}
                <div className="flex justify-between items-start pt-8 px-8 pb-5">
                    <div>
                        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none mb-3">
                            {isSuccess ? "Check your email" : "Forgot Password"}
                        </h2>
                        <p className="text-[#94A3B8] text-[15px] max-w-sm">
                            {isSuccess 
                                ? "We've sent a password reset link to your inbox." 
                                : "Enter your email address and we'll send you a link to reset your password."
                            }
                        </p>
                    </div>
                    <Link to="/login" className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                        <X className="size-6" />
                    </Link>
                </div>

                <div className="h-[1px] bg-slate-100 w-full" />

                <div className="p-8 pt-6">
                    {!isSuccess ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <Input
                                id="forgot-email"
                                label="Email address"
                                type="email"
                                placeholder="Enter your official email"
                                variant="filled"
                                {...register("email")}
                                error={errors.email?.message}
                                className="h-11 rounded-md bg-[#F8FAFC]"
                            />

                            <Button
                                type="submit"
                                colorScheme="slate"
                                size="lg"
                                fullWidth
                                isLoading={loading}
                                disabled={!isFormFilled}
                                className={`h-[46px] font-medium transition-all duration-300 rounded-md ${
                                    isFormFilled ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-400"
                                }`}
                            >
                                Send Reset Link
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-6 text-center py-4 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MailCheck className="size-8" />
                            </div>
                            <div className="text-slate-600 text-[15px] leading-relaxed">
                                <p>
                                    A verification link has been sent to: <br/>
                                    <span className="font-bold text-slate-900">{emailValue}</span>
                                </p>
                                <p className="mt-2">Please click the link in the email to set your new password.</p>
                            </div>

                            <div className="pt-4 border-t border-slate-50">
                                <p className="text-sm text-slate-400">
                                    Didn't receive the email?{" "}
                                    <button 
                                        onClick={() => setIsSuccess(false)}
                                        className="text-[#0D9488] font-semibold hover:underline"
                                    >
                                        Try again
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;