
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - in a real app, this would be an API call
    setTimeout(() => {
      if (email && password) {
        // Demo credentials (in a real app, this would be authenticated against a backend)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ email: email }));
        toast.success('Login berhasil!');
        navigate('/');
      } else {
        toast.error('Email dan password diperlukan');
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-cashew-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-cashew-100">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-cashew-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">PM</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-cashew-800">
            Masuk ke Aplikasi
          </CardTitle>
          <CardDescription className="text-cashew-600">
            Aplikasi Pemeliharaan Jambu Mete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-cashew-700">
                Email
              </label>
              <Input 
                id="email"
                type="email"
                placeholder="nama@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-cashew-200"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-cashew-700">
                Kata Sandi
              </label>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-cashew-200 pr-10"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cashew-500 hover:text-cashew-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-cashew-600 hover:bg-cashew-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Memuat..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-cashew-600">
            Belum punya akun?{' '}
            <Link to="/register" className="font-medium text-cashew-700 hover:underline">
              Daftar
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
