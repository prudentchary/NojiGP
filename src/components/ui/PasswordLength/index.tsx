import React from "react";
import { Check } from "lucide-react";

interface PasswordLengthProps {
    password?: string;
}

export const PasswordLength: React.FC<PasswordLengthProps> = ({ password = "" }) => {
    const rules = [
        { label: "Contains at least 8 characters", met: password.length >= 8 },
        { label: "1 upper case character", met: /[A-Z]/.test(password) },
        { label: "1 lower case character", met: /[a-z]/.test(password) },
        { label: "1 special character", met: /[^A-Za-z0-9]/.test(password) },
    ];

    const passedCount = rules.filter((rule) => rule.met).length;
    const isStrong = passedCount === rules.length;
    const isWeak = passedCount < 3;

    let strengthLabel = "Weak";
    let progressColor = "bg-[#FF3B5C]"; // Reddish pink
    let progressWidth = "w-[25%]";
    let hintText = "Try a longer, more unique password that's harder to guess.";

    if (passedCount === 0) {
        progressWidth = "w-[5%]";
    } else if (passedCount === 1) {
        progressWidth = "w-[25%]";
    } else if (passedCount === 2) {
        progressWidth = "w-[50%]";
        strengthLabel = "Fair";
        progressColor = "bg-yellow-400";
    } else if (passedCount === 3) {
        progressWidth = "w-[75%]";
        strengthLabel = "Good";
        progressColor = "bg-blue-400";
        hintText = "Almost there! Add one more element.";
    } else if (passedCount === 4) {
        progressWidth = "w-full";
        strengthLabel = "Strong";
        progressColor = "bg-[#0D9488]"; // Teal
        hintText = "Great job! 🔐 This password is strong and secure";
    }

    return (
        <div className="w-full space-y-4 pt-2">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] font-bold text-slate-900">{strengthLabel}</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-[#FCE7F3] rounded-full overflow-hidden mb-3">
                    <div
                        className={`h-full ${progressColor} transition-all duration-300 ease-out`}
                        style={{ width: progressWidth === 'w-[5%]' ? '5%' : progressWidth === 'w-[25%]' ? '25%' : progressWidth === 'w-[50%]' ? '50%' : progressWidth === 'w-[75%]' ? '75%' : '100%' }}
                    />
                </div>

                <p className="text-[14px] text-slate-500 leading-snug">
                    {hintText}
                </p>
            </div>

            <div className="space-y-3 pt-2">
                <p className="text-[14px] font-bold text-slate-900">Password must contain</p>
                <div className="space-y-2.5">
                    {rules.map((rule, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className={`flex items-center justify-center w-[18px] h-[18px] rounded-[4px] border transition-all ${rule.met
                                        ? "bg-gradient-to-r from-[#18cfd2] to-[#1b7a7c] border-transparent"
                                        : "bg-white border-slate-200"
                                    }`}
                            >
                                {rule.met && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                            </div>
                            <span className="text-[14px] text-slate-600">
                                {rule.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
