import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, User, Lock, Mail, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Form Data:', formData);
    setIsLoading(true);
  
    try {
      const res = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
  
      // Secure token storage should be handled properly (e.g., HTTP-only cookies)
      localStorage.setItem('token', data.token);
      window.location.href = '/check-form';
    } catch (err) {
      console.error('Error:', err); // Log error for debugging
      setError(err.message); // Display error message to the user
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="bg-white/10 rounded-full p-4 mx-auto w-fit">
              <Stethoscope size={40} />
            </motion.div>
            <h2 className="text-2xl font-bold mt-4">Join Our Healthcare Platform</h2>
            <p className="text-cyan-100 mt-2">Create your professional medical account</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSignup} className="space-y-4">
              {[['username', 'Username', User], ['email', 'Email Address', Mail], ['password', 'Password', Lock], ['confirmPassword', 'Confirm Password', ShieldCheck]].map(([name, label, Icon]) => (
                <div key={name} className="relative">
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={name.includes('password') ? 'password' : 'text'}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all"
                    required
                  />
                </div>
              ))}

              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg py-3 flex justify-center items-center space-x-2 font-medium transition-all ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-cyan-700 hover:to-blue-700'}`}
              >
                {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account? <a href="/" className="text-cyan-600 hover:text-cyan-800 font-medium">Sign in here</a>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              <Lock className="w-4 h-4 inline-block mr-2" /> Secure, encrypted registration
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
