import React, { useState } from 'react';
import { School, Shield, Users, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (!result.success) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
    
    setLoading(false);
  };

  const features = [
    {
      icon: Calendar,
      title: 'Ders Programı',
      description: 'Otomatik program oluşturma'
    },
    {
      icon: Users,
      title: 'Öğretmen Yönetimi',
      description: 'Branş bazlı organizasyon'
    },
    {
      icon: Shield,
      title: 'Güvenli Sistem',
      description: 'Firebase altyapısı'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
          <div className="flex justify-center lg:justify-start">
            <div className="professional-card p-8 bg-gradient-to-br from-white to-blue-50">
              <img 
                src="https://cv.ide.k12.tr/images/ideokullari_logo.png" 
                alt="İDE Okulları Logo"
                className="w-24 h-24 object-contain mx-auto lg:mx-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center mx-auto lg:mx-0"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>';
                  }
                }}
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-professional-heading text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              İDE Okulları
            </h1>
            <h2 className="text-professional-subheading text-2xl text-blue-700 mb-4">
              Ders Programı Yönetim Sistemi
            </h2>
            <p className="text-professional-body text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Modern, güvenli ve kullanıcı dostu ders programı yönetim sistemi ile 
              eğitim kurumunuzun program organizasyonunu profesyonel seviyeye taşıyın.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="animate-scale-in">
          <div className="professional-card max-w-md mx-auto">
            <div className="professional-card-header text-center">
              <h3 className="text-professional-subheading text-2xl text-gray-900 mb-2">
                Yönetici Girişi
              </h3>
              <p className="text-professional-body">
                Sisteme erişim için giriş yapın
              </p>
            </div>

            <div className="professional-card-content">
              <form onSubmit={handleSubmit} className="space-professional">
                <Input
                  label="E-posta Adresi"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="email@ide.k12.tr"
                  required
                />
                
                <Input
                  label="Şifre"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  required
                />

                {error && (
                  <div className="notification-error">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Giriş Hatası</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="ide-primary"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="loading-spinner-professional mr-3"></div>
                      Giriş yapılıyor...
                    </div>
                  ) : (
                    <>
                      <School className="w-5 h-5 mr-2" />
                      Sisteme Giriş Yap
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <div className="notification-info">
                  <div className="flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-xs text-blue-800 font-medium">
                      Firebase Authentication ile güvenli giriş
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;