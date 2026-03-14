import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNavigate, Link } from "react-router";
import backgroundImage from "@/assets/login_bg.png";
import { useToast } from "@/components/ui/Toast";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
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
        defaultValues: {
            email: "",
        },
    });

    const emailValue = watch("email");
    const isFormFilled = emailValue.length > 0;

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            success("Password Reset Initiated!");
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="relative w-full max-w-[540px] bg-white rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                {/* Header */}
                <div className="flex justify-between items-start pt-8 px-8 pb-5">
                    <div>
                        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none mb-3">
                            Forgot Password
                        </h2>
                        {!isSuccess && (
                            <p className="text-[#94A3B8] text-[15px] max-w-sm">
                                Stay informed about our progress and be the first to get on board
                            </p>
                        )}
                    </div>
                    <Link to="/login" className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                        <X className="size-6" />
                    </Link>
                </div>

                <div className="h-[1px] bg-slate-100 w-full" />

                {/* Content */}
                <div className="p-8 pt-6">
                    {!isSuccess ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2 w-full">
                                <Input
                                    id="forgot-email"
                                    label="Email address"
                                    type="email"
                                    placeholder="Enter email"
                                    variant="filled"
                                    {...register("email")}
                                    error={errors.email?.message}
                                    helperText="Only official email address"
                                    className="h-11 rounded-md bg-[#F8FAFC]"
                                    containerClassName="gap-1 w-full"
                                />
                            </div>

                            <Button
                                type="submit"
                                colorScheme="slate"
                                size="lg"
                                fullWidth
                                isLoading={loading}
                                className={
                                    "h-[46px] font-medium tracking-wide border-none transition-all duration-300 rounded-md " +
                                    (isFormFilled
                                        ? "bg-slate-900 text-white hover:bg-slate-800 active:bg-black cursor-pointer"
                                        : "bg-[#E2E8F0] text-slate-400 cursor-not-allowed pointer-events-none")
                                }
                            >
                                Submit
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="space-y-1 text-slate-500 text-[15px]">
                                <p>
                                    A 6 digit OTP has been sent to <span className="font-semibold">{emailValue || "john@organisation1.com"}</span>
                                </p>
                                <p>Kindly enter the code to continue.</p>
                            </div>

                            <button
                                type="button"
                                className="text-[#0D9488] font-semibold text-[15px] hover:text-[#0C8075] transition-colors"
                            >
                                Resend OTP
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
