import { useState } from "react";
import CustomSlider from "./CustomSlider";
import { motion } from "framer-motion";
import { fadeInUp } from "./animations";
import { 
  LogOut, 
  Clipboard, 
  Brain, 
  Smile, 
  Meh, 
  Frown,
  Activity,
  MessageSquare
} from "lucide-react";

function CheckInForm() {
  const [mood, setMood] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [feelings, setFeelings] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log({ mood, stressLevel, feelings });
    setIsLoading(false);
    setSubmitted(true);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const getMoodIcon = (value) => {
    if (value <= 3) return <Frown className="w-6 h-6 text-red-500" />;
    if (value <= 7) return <Meh className="w-6 h-6 text-yellow-500" />;
    return <Smile className="w-6 h-6 text-green-500" />;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 py-6 flex flex-col justify-center sm:py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-xl mx-auto w-full px-4"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="bg-white/10 rounded-full p-3"
                >
                  <Brain className="w-8 h-8" />
                </motion.div>
                <h2 className="ml-4 text-2xl font-bold">Daily Health Check-in</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="text-white/90 hover:text-white flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </motion.button>
            </div>
            <p className="mt-2 text-cyan-100 ml-16">Track your mental well-being daily</p>
          </div>

          <div className="p-8">
            {submitted ? (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                className="py-8"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Clipboard className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank you for checking in!</h3>
                  <p className="text-gray-600 mb-6">Your health check-in has been recorded.</p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <p className="text-gray-500">Remember, taking care of your mental health is just as important as physical health.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-cyan-600 hover:text-cyan-700 font-medium"
                    >
                      Submit another check-in
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="mood" className="text-sm font-medium text-gray-700 flex items-center">
                      <Smile className="w-5 h-5 mr-2 text-cyan-600" />
                      Mood Rating
                    </label>
                    {getMoodIcon(mood)}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CustomSlider value={mood} onChange={setMood} min={1} max={10} />
                      <span className="text-lg font-semibold text-gray-700 w-8">{mood}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Not Great</span>
                      <span>Amazing</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="stress" className="text-sm font-medium text-gray-700 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-cyan-600" />
                      Stress Level
                    </label>
                    <span className="text-sm font-medium text-gray-500">{stressLevel}/10</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CustomSlider value={stressLevel} onChange={setStressLevel} min={1} max={10} />
                      <span className="text-lg font-semibold text-gray-700 w-8">{stressLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="feelings" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                    <MessageSquare className="w-5 h-5 mr-2 text-cyan-600" />
                    How are you feeling today?
                  </label>
                  <textarea
                    id="feelings"
                    rows="4"
                    value={feelings}
                    onChange={(e) => setFeelings(e.target.value)}
                    className="w-full rounded-lg border-gray-300 bg-gray-50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                    placeholder="Express your thoughts and feelings..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 font-medium transition-all duration-200 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-cyan-700 hover:to-blue-700'
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Clipboard className="w-5 h-5" />
                      <span>Submit Check-in</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CheckInForm;