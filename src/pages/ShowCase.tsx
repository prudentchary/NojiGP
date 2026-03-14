import { useState } from 'react';
import { Plus } from "lucide-react";
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import logo2 from "@/assets/logo2.png";

function ShowCase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
 
    <div className="p-10 space-y-12 bg-slate-50 min-h-screen">
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Modal Component</h2>
        <Button onClick={() => setIsModalOpen(true)} colorScheme="slate">Open Change Password Modal</Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          showCloseButton
        >
          <div className="flex flex-col items-center text-center">
            {/* Central Logo Container */}
            <div className="relative mb-8 mt-4">
              <div className="size-[140px] rounded-full bg-slate-100 flex items-center justify-center p-6 shadow-inner ring-8 ring-slate-50 relative overflow-hidden group">
                {/* Glass effect reflection */}
                <div className="absolute inset-x-0 -top-1/2 h-full bg-gradient-to-b from-white/10 to-transparent rotate-[30deg] pointer-events-none" />
                <img src={logo2} alt="Logo" className="w-20 h-auto relative z-10 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>

            <h2 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
              Change Password
            </h2>

            <p className="text-[15px] leading-relaxed text-slate-500 max-w-[360px] mb-10">
              Would you like to reset your password to something you can always remember?
            </p>

            <div className="w-full flex flex-col items-center gap-6">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-900 text-white hover:bg-slate-800 h-12 w-32 font-bold tracking-tight text-sm rounded-md"
              >
                Let's do it
              </Button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[15px] font-bold text-[#0D9488] hover:text-[#0C8075] transition-colors"
              >
                I will do this later
              </button>
            </div>
          </div>
        </Modal>
      </section>
      {/* Rounded */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Border Radius</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button rounded="none" colorScheme="slate">None</Button>
          <Button rounded="default" colorScheme="blue">Default</Button>
          <Button rounded="full" colorScheme="violet">Full</Button>
        </div>
      </section>

      {/* Disabled */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button colorScheme="slate" disabled>Solid</Button>
          <Button colorScheme="blue" variant="outline" disabled>Outline</Button>
          <Button colorScheme="violet" variant="ghost" disabled>Ghost</Button>
          <Button colorScheme="slate" variant="soft" rounded="none" >Soft</Button>
        </div>
      </section>



      {/* Full Width */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Full Width</h2>
        <div className="space-y-3 max-w-sm">
          <Button colorScheme="blue" fullWidth leftIcon={<Plus />}>Create Account</Button>
          <Button colorScheme="slate" variant="outline" fullWidth>Sign In</Button>
        </div>
      </section>
   </div>
  )
}

export default ShowCase;


