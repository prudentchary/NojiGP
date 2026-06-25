import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface AddServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = React.useState({
        type: 'Identity provider (IDP)',
        provider: 'Azure Active Directory',
        apiKey: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add API service" className="dark:bg-[#1F262E]">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 mt-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-slate-500">Integration type</label>
                    <div className="relative">
                        <select 
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] appearance-none focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        >
                            <option>Identity provider (IDP)</option>
                            <option>SIEM</option>
                            <option>Cloud Storage</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-0.5">Service category</span>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-slate-500">Service provider</label>
                    <div className="relative">
                        <select 
                            value={formData.provider}
                            onChange={(e) => setFormData({...formData, provider: e.target.value})}
                            className="w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-[14px] appearance-none focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all cursor-pointer"
                        >
                            <option>Azure Active Directory</option>
                            <option>Microsoft Sentinel</option>
                            <option>Google Cloud</option>
                            <option>AWS</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-slate-500 uppercase tracking-wider">API KEY</label>
                    <input 
                        type="text"
                        placeholder="Enter API KEY"
                        value={formData.apiKey}
                        onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                        className="w-full h-11 px-4 bg-slate-50 border border-transparent rounded-lg text-[14px] focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full h-12 mt-4 bg-[#0F172A] text-white rounded-lg text-[14px] font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                    disabled={!formData.apiKey}
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};
