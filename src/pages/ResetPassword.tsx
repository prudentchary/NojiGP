import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNavigate, Link } from "react-router";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import backgroundImage from "@/assets/login_bg.png";
import { PasswordLength } from "@/components/ui/PasswordLength";

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5 12.5C5 12.5 8 8.5 12 8.5C16 8.5 19 12.5 19 12.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <circle cx="12" cy="12.5" r="2" fill="currentColor" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5 12.5C5 12.5 8 8.5 12 8.5C16 8.5 19 12.5 19 12.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-40"
        />
        <circle cx="12" cy="12.5" r="2" fill="currentColor" />
        <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const resetPasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(1, "New password is required"),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const { success, error: toastError } = useToast();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const oldPasswordValue = watch("oldPassword");
    const newPasswordValue = watch("newPassword");

    // Check if new password meets all criteria
    const isNewPasswordStrong =
        newPasswordValue.length >= 8 &&
        /[A-Z]/.test(newPasswordValue) &&
        /[a-z]/.test(newPasswordValue) &&
        /[^A-Za-z0-9]/.test(newPasswordValue);

    const isFormFilled = oldPasswordValue.length > 0 && isNewPasswordStrong;

    const onSubmit = async (data: ResetPasswordFormValues) => {
        setLoading(true);

        // Simulated API delay
        setTimeout(() => {
            setLoading(false);
            success("Password changed successfully!");
            navigate("/login");
        }, 1500);
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="relative w-full max-w-[620px] bg-white rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                {/* Header */}
                <div className="flex justify-between items-start pt-8 px-8 pb-5">
                    <div>
                        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none mb-3">
                            Reset Password
                        </h2>
                        <p className="text-[#94A3B8] text-[15px]">
                            Reset password by providing your current password and entering the new one.
                        </p>
                    </div>
                    <Link to="/login" className="text-slate-400 hover:text-slate-600 transition-colors p-1 mt-1">
                        <X className="size-5" />
                    </Link>
                </div>

                <div className="h-[1px] bg-slate-50 w-full" />

                {/* Content */}
                <div className="p-8 pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-5">
                            {/* Old Password Field */}
                            <div className="space-y-2 text-left w-full">
                                <Input
                                    id="oldPassword"
                                    label="Old password"
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="............"
                                    variant="filled"
                                    {...register("oldPassword")}
                                    error={errors.oldPassword?.message}
                                    className="h-11 rounded-md text-2xl font-mono"
                                    containerClassName="gap-1 w-full"
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                            className="text-slate-600 hover:text-slate-900 transition-all duration-200 outline-none focus:ring-0 py-2 mr-2"
                                        >
                                            {showOldPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    }
                                />
                            </div>

                            {/* New Password Field */}
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
                                            className="text-slate-600 hover:text-slate-900 transition-all duration-200 outline-none focus:ring-0 py-2 mr-2"
                                        >
                                            {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
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
                                "h-12 mt-6 font-semibold tracking-wide border-none transition-all duration-300 rounded-md",
                                isFormFilled
                                    ? "bg-slate-900 text-white hover:bg-slate-800 active:bg-black cursor-pointer"
                                    : "bg-[#E2E8F0] text-slate-400 cursor-not-allowed pointer-events-none"
                            )}
                        >
                            RESET
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
