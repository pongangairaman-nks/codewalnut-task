import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { TimerList } from "./components/TimerList";
import { AddTimerModal } from "./components/AddTimerModal";
import { Toaster } from "sonner";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="container w-[400px] px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100 ">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h6 className="text-[24px] font-bold">Timer</h6>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[14px] flex items-center gap-2 px-4 py-0 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Timer
          </button>
        </div>

        <TimerList />

        <AddTimerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Home;
