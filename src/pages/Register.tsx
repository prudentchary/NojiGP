import React from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import backgroundImage from "@/assets/login_bg.png";

const Register: React.FC = () => {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="relative w-full max-w-[520px] bg-white rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                <div className="flex justify-between items-center px-8 pt-8 pb-4">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Create Account
                    </h1>
                    <Link to="/login" className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                        <X className="size-5" />
                    </Link>
                </div>

                <div className="px-8 pb-10">
                    <form className="space-y-4">
                        <Input label="Full Name" placeholder="John Doe" variant="filled" className="h-11" />
                        <Input label="Email address" type="email" placeholder="john@example.com" variant="filled" className="h-11" />
                        <Input label="Password" type="password" placeholder="************" variant="filled" className="h-11" />

                        <Button
                            type="submit"
                            colorScheme="slate"
                            size="lg"
                            fullWidth
                            className="h-12 mt-4 bg-[#E2E8F0] text-slate-400 font-bold tracking-widest uppercase hover:bg-slate-200 hover:text-slate-500 border-none transition-all duration-300 rounded-[4px]"
                        >
                            REGISTER
                        </Button>
                    </form>

                    <p className="text-center mt-6 text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#0D9488] font-bold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
