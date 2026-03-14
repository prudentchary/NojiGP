import React from "react";
import logo from "@/assets/logo2.png"; // Using logo2.png, you can change to Logo1.png if needed

interface ForgotPasswordTemplateProps {
    resetLink?: string;
    supportEmail?: string;
}

const ForgotPasswordTemplate: React.FC<ForgotPasswordTemplateProps> = ({
    resetLink = "https://noji.com/reset-password?token=example",
    supportEmail = "support@nojiguardianprotocol.com",
}) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4 font-sans">
            <div className="w-full max-w-[640px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 px-2">
                    <img src={logo} alt="Noji Guardian Protocol" className="h-10 object-contain" />
                    <div className="flex space-x-3 opacity-20">
                        {/* Placeholder social icons from mockup - Twitter, Facebook, LinkedIn */}
                        <div className="w-5 h-5 bg-black rounded-sm"></div>
                        <div className="w-5 h-5 bg-black rounded-sm"></div>
                        <div className="w-5 h-5 bg-black rounded-sm"></div>
                    </div>
                </div>

                {/* Main Content Box */}
                <div className="bg-white rounded-[10px] w-full px-10 py-12 shadow-sm mb-12">
                    <h1 className="text-[22px] font-bold text-slate-900 mb-6 tracking-tight">
                        Reset Password
                    </h1>

                    <p className="text-[#475569] text-[15px] leading-[1.6] mb-12 max-w-md">
                        You are attempting to reset your password.
                        Please use the verification link below to confirm
                        your identity and set a new password.
                    </p>

                    <div className="flex flex-col items-center justify-center mb-10 w-full">
                        <p className="text-[15px] font-bold text-slate-700 mb-6 text-center">
                            Verification link:
                        </p>

                        <a
                            href={resetLink}
                            className="inline-flex justify-center items-center h-12 px-8 bg-[#EEF2FF] text-[#4F46E5] rounded-[6px] font-semibold text-[15px] hover:bg-[#E0E7FF] transition-colors"
                        >
                            Reset Password
                        </a>
                    </div>

                    <p className="text-[13px] text-center text-slate-500 mt-12">
                        If this was not you, please <a href="#" className="font-semibold text-blue-600 hover:underline">change your password</a> to protect your account.
                    </p>
                </div>

                {/* Footer */}
                <div className="px-2 text-[13px] text-[#94A3B8] leading-[1.6]">
                    <div className="mb-6">
                        <p>
                            For any questions or enquiry regarding this email. Kindly contact support
                        </p>
                        <p>
                            <a href={`mailto:${supportEmail}`} className="text-[#0D9488] font-bold hover:underline">
                                {supportEmail}
                            </a>
                        </p>
                        <p>
                            We are always here to serve and protect your organization.
                        </p>
                    </div>

                    <div className="text-[#94A3B8]">
                        <p>915 Wilshire BLVD #1600, Los Angeles, CA 90017-6410, USA</p>
                        <p>© 2024 Noji Guardian Protocol</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordTemplate;
