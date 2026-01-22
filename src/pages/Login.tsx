import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import '../styles/Login.css';

export default function App() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      console.log('Login attempt:', { employeeId, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-page__background">
        {/* Decorative Background Elements */}
          <div className="login-page__blob login-page__blob--bottom-right" />
        <div className="login-page__circle login-page__circle--large" />
        <div className="login-page__circle login-page__circle--medium" />
      </div>

      {/* Main Container */}
      <div className="login-page__container">
        {/* Left Side - Branding */}
        <div className="login-page__branding">
          <div className="login-page__branding-content">
            {/* Logo Badge */}
            <div className="login-page__logo-badge">
              <div className="login-page__logo-icon">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  CP ALL
                </h1>
                <p className="text-xs text-gray-600">Employee System</p>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h2 className="login-page__heading">
                ยินดีต้อนรับ<br />
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
                  พนักงาน CP ALL
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                เข้าสู่ระบบเพื่อเริ่มต้นการทำงานและเข้าถึงเครื่องมือต่างๆ ของคุณ
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 pt-4">
              <div className="bg-white/60 backdrop-blur-sm px-5 py-3 rounded-xl border border-orange-100">
                <div className="text-2xl font-bold text-orange-600">12,000+</div>
                <div className="text-xs text-gray-600">พนักงานทั่วประเทศ</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm px-5 py-3 rounded-xl border border-green-100">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-xs text-gray-600">ระบบพร้อมใช้งาน</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-page__form-container">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-1">
              CP ALL
            </h1>
            <p className="text-sm text-gray-600">Employee System</p>
          </div>

          {/* Login Card with Glassmorphism */}
          <div className="relative">
            {/* Decorative Corner Elements */}
            <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl opacity-20 -z-10" />
            <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-tr from-green-400 to-green-500 rounded-2xl opacity-20 -z-10" />

            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 relative">
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-green-500 rounded-t-3xl" />

              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  เข้าสู่ระบบ
                </h3>
                <p className="text-base text-gray-600">
                  กรอกข้อมูลเพื่อเข้าใช้งานระบบ
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-7">
                {/* Employee ID */}
                <div className="space-y-3">
                  <Label htmlFor="employeeId" className="text-base text-gray-700 font-medium">
                    รหัสพนักงาน
                  </Label>
                  <div className="relative group">
                    <Input
                      id="employeeId"
                      type="text"
                      placeholder="กรอกรหัสพนักงาน"
                      value={employeeId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployeeId(e.target.value)}
                      className="h-14 text-lg bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl border-2 border-orange-400 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base text-gray-700 font-medium">
                    รหัสผ่าน
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="กรอกรหัสผ่าน"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      className="h-14 text-lg bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl pr-12"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl border-2 border-green-400 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right mt-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('กรุณาติดต่อแผนก IT Support เพื่อรีเซ็ตรหัสผ่าน');
                    }}
                    className="text-base text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-1 group"
                  >
                    ลืมรหัสผ่าน?
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 hover:from-orange-600 hover:via-orange-700 hover:to-green-700 text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      กำลังเข้าสู่ระบบ...
                    </div>
                  ) : (
                    <span>เข้าสู่ระบบ</span>
                  )}
                </Button>
              </form>

              {/* Help Link */}
              <div className="mt-6 pt-6 border-t border-gray-200/50 text-center">
                <p className="text-sm text-gray-600">
                  ต้องการความช่วยเหลือ?{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                    ติดต่อ IT Support
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>ระบบปลอดภัย เข้ารหัสข้อมูล SSL</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="login-page__footer">
        © 2026 CP ALL Public Company Limited. All rights reserved.
      </div>
    </div>
  );
}
