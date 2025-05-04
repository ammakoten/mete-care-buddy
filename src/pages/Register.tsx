
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      toast.error('Kata sandi tidak cocok');
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(name, email, password);
      
      if (success) {
        toast.success('Pendaftaran berhasil!');
        navigate('/');
      } else {
        toast.error('Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cashew-50 to-cashew-100 p-4">
      <Card className="w-full max-w-md animate-fade-in border-cashew-200 shadow-lg">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-cashew-500 to-cashew-700 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-2xl">PM</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-cashew-800">
            Buat Akun Baru
          </CardTitle>
          <CardDescription className="text-cashew-600 text-base">
            Aplikasi Pemeliharaan Jambu Mete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-cashew-700 block">
                Nama Lengkap
              </label>
              <Input 
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-cashew-200 h-11"
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-cashew-700 block">
                Email
              </label>
              <Input 
                id="email"
                type="email"
                placeholder="nama@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-cashew-200 h-11"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-cashew-700 block">
                Kata Sandi
              </label>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-cashew-200 h-11 pr-10"
                  required
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cashew-500 hover:text-cashew-700"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium text-cashew-700 block">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <Input 
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-cashew-200 h-11 pr-10"
                  required
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cashew-500 hover:text-cashew-700"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={showConfirmPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 mt-2 bg-cashew-600 hover:bg-cashew-700 text-white font-medium text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memuat...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Daftar
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pb-6 pt-2">
          <div className="text-sm text-center text-cashew-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-medium text-cashew-700 hover:text-cashew-800 hover:underline transition-colors">
              Masuk
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
