import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNavigate, Link, useSearchParams } from "react-router"; 
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import backgroundImage from "@/assets/login_bg.png";
import { PasswordLength } from "@/components/ui/PasswordLength";
import api from "@/lib/api"; 

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12.5C5 12.5 8 8.5 12 8.5C16 8.5 19 12.5 19 12.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="12.5" r="2" fill="currentColor" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12.5C5 12.5 8 8.5 12 8.5C16 8.5 19 12.5 19 12.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="opacity-40" />
        <circle cx="12" cy="12.5" r="2" fill="currentColor" />
        <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// UPDATED SCHEMA: Removed oldPassword, added confirmPassword check
const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    
    const { success, error: toastError } = useToast();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPasswordValue = watch("newPassword");
    const confirmPasswordValue = watch("confirmPassword");

    const isNewPasswordStrong =
        newPasswordValue.length >= 8 &&
        /[A-Z]/.test(newPasswordValue) &&
        /[a-z]/.test(newPasswordValue) &&
        /[^A-Za-z0-9]/.test(newPasswordValue);

    const isFormValid = isNewPasswordStrong && newPasswordValue === confirmPasswordValue;

 const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
        toastError("Invalid or missing reset token. Please request a new link.");
        return;
    }

    setLoading(true);

    try {
        // This sends the token from the URL and the new password to your server
        const response = await api.post("/auth/reset-password", {
            token: token,
            password: data.newPassword,
        });

        if (response.status === 200) {
            success("Password updated successfully!");
            navigate("/login");
        }
    } catch (err: any) {
        // If the token is expired or the server is down, show the error
        toastError(err.response?.data?.message || "Failed to update password. Please try again.");
    } finally {
        setLoading(false);
    }
};

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="relative w-full max-w-[620px] bg-white rounded-[10px] shadow-2xl overflow-hidden">
                <div className="flex justify-between items-start pt-8 px-8 pb-5">
                    <div>
                        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none mb-3">
                            Set New Password
                        </h2>
                        <p className="text-[#94A3B8] text-[15px]">
                            Enter your new password below. Make sure it matches the requirements.
                        </p>
                    </div>
                    <Link to="/login" className="text-slate-400 hover:text-slate-600 transition-colors p-1 mt-1">
                        <X className="size-5" />
                    </Link>
                </div>

                <div className="h-[1px] bg-slate-50 w-full" />

                <div className="p-8 pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-5">
                            {/* NEW PASSWORD */}
                            <div className="space-y-2 text-left w-full">
                                <Input
                                    id="newPassword"
                                    label="New password"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="............"
                                    variant="filled"
                                    {...register("newPassword")}
                                    error={errors.newPassword?.message}
                                    className="h-11 rounded-md text-2xl font-mono"
                                    containerClassName="gap-1 w-full"
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="text-slate-600 outline-none mr-2"
                                        >
                                            {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    }
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="space-y-2 text-left w-full">
                                <Input
                                    id="confirmPassword"
                                    label="Confirm new password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="............"
                                    variant="filled"
                                    {...register("confirmPassword")}
                                    error={errors.confirmPassword?.message}
                                    className="h-11 rounded-md text-2xl font-mono"
                                    containerClassName="gap-1 w-full"
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="text-slate-600 outline-none mr-2"
                                        >
                                            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    }
                                />
                            </div>

                            {newPasswordValue.length > 0 && (
                                <div className="pt-2">
                                    <PasswordLength password={newPasswordValue} />
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            colorScheme="slate"
                            size="lg"
                            fullWidth
                            isLoading={loading}
                            className={cn(
                                "h-12 mt-6 font-semibold rounded-md",
                                isFormValid
                                    ? "bg-slate-900 text-white hover:bg-slate-800"
                                    : "bg-[#E2E8F0] text-slate-400 cursor-not-allowed"
                            )}
                        >
                            UPDATE PASSWORD
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;