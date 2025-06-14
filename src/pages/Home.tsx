import React from 'react';
import { 
  Users, 
  Building, 
  BookOpen, 
  Calendar, 
  FileText, 
  Eye,
  ArrowRight,
  Zap,
  GraduationCap,
  CheckCircle,
  Shield,
  Clock,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'Dersler',
      description: 'Dersleri branş ve seviyelerine göre organize edin',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      path: '/subjects',
      stats: 'Branş bazlı organizasyon'
    },
    {
      icon: Users,
      title: 'Öğretmenler',
      description: 'Öğretmenleri ekleyin ve branşlarına göre yönetin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/teachers',
      stats: 'Seviye bazlı atama'
    },
    {
      icon: Building,
      title: 'Sınıflar',
      description: 'Sınıfları seviyelerine göre kategorize edin',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      path: '/classes',
      stats: 'Otomatik sınıflandırma'
    },
    {
      icon: Calendar,
      title: 'Program Oluştur',
      description: 'Öğretmen veya sınıf bazlı ders programları oluşturun',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      path: '/schedules',
      stats: 'Çakışma kontrolü'
    },
    {
      icon: Zap,
      title: 'Otomatik Program',
      description: 'Yapay zeka ile otomatik program oluşturma',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      path: '/auto-schedule',
      stats: 'AI destekli'
    },
    {
      icon: GraduationCap,
      title: 'Sınıf Programları',
      description: 'Sınıf bazında programları görüntüleyin',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      path: '/class-schedules',
      stats: 'Detaylı görünüm'
    },
    {
      icon: Eye,
      title: 'Öğretmen Programları',
      description: 'Öğretmen bazında programları inceleyin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/all-schedules',
      stats: 'Toplu görüntüleme'
    },
    {
      icon: FileText,
      title: 'PDF İndir',
      description: 'Programları profesyonel PDF formatında indirin',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      path: '/pdf',
      stats: 'Yüksek kalite'
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Çakışma Kontrolü',
      description: 'Otomatik çakışma tespiti ve uyarı sistemi'
    },
    {
      icon: Shield,
      title: 'Güvenli Saklama',
      description: 'Firebase altyapısı ile güvenli veri saklama'
    },
    {
      icon: Clock,
      title: 'Otomatik Saatler',
      description: 'Yemek ve mola saatleri otomatik eklenir'
    },
    {
      icon: Download,
      title: 'PDF Çıktı',
      description: 'Profesyonel görünümlü PDF raporları'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container-professional py-12">
        <div className="text-center animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <div className="professional-card p-6 bg-gradient-to-br from-white to-blue-50">
              <img 
                src="https://cv.ide.k12.tr/images/ideokullari_logo.png" 
                alt="İDE Okulları Logo"
                className="w-20 h-20 object-contain mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center mx-auto"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>';
                  }
                }}
              />
            </div>
          </div>
          
          <h1 className="text-professional-heading text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            İDE Okulları
          </h1>
          <h2 className="text-professional-subheading text-2xl md:text-3xl text-blue-700 mb-4">
            Ders Programı Yönetim Sistemi
          </h2>
          <p className="text-professional-body text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Modern, kullanıcı dostu ve güvenilir ders programı yönetim sistemi. 
            Okul ders programlarını kolayca oluşturun, yönetin ve PDF olarak indirin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/schedules')}
              className="btn-professional-primary text-lg px-8 py-4"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Program Oluşturmaya Başla
            </button>
            <button
              onClick={() => navigate('/all-schedules')}
              className="btn-professional-secondary text-lg px-8 py-4"
            >
              <Eye className="w-6 h-6 mr-2" />
              Mevcut Programları Görüntüle
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container-professional py-16">
        <div className="text-center mb-12">
          <h3 className="text-professional-heading text-3xl mb-4">Sistem Özellikleri</h3>
          <p className="text-professional-body text-lg max-w-2xl mx-auto">
            Kapsamlı ders programı yönetimi için ihtiyacınız olan tüm araçlar
          </p>
        </div>
        
        <div className="grid-professional-4 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="professional-card group cursor-pointer hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="professional-card-content text-center">
                <div className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h4 className="text-professional-subheading mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-professional-body mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="badge-info mb-4">
                  {feature.stats}
                </div>
                <div className="flex items-center justify-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Başla <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container-professional">
          <div className="text-center mb-12">
            <h3 className="text-professional-heading text-3xl mb-4">Neden İDE Ders Programı Sistemi?</h3>
            <p className="text-professional-body text-lg max-w-2xl mx-auto">
              Eğitim kurumları için özel olarak tasarlanmış gelişmiş özellikler
            </p>
          </div>
          
          <div className="grid-professional-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-professional-subheading mb-3">{benefit.title}</h4>
                <p className="text-professional-body">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="container-professional">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Sistem Avantajları</h3>
            <p className="text-xl text-blue-100">Güçlü altyapı ve kullanıcı dostu arayüz</p>
          </div>
          
          <div className="grid-professional-4 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Çakışma Kontrolü</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Erişilebilirlik</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl font-bold mb-2">PDF</div>
              <div className="text-blue-100">Profesyonel Çıktı</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="text-4xl font-bold mb-2">AI</div>
              <div className="text-blue-100">Otomatik Oluşturma</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container-professional py-16 text-center">
        <div className="professional-card max-w-4xl mx-auto">
          <div className="professional-card-content">
            <h3 className="text-professional-heading text-3xl mb-4">Hemen Başlayın</h3>
            <p className="text-professional-body text-lg mb-8 max-w-2xl mx-auto">
              İDE Okulları Ders Programı Sistemi ile eğitim kurumunuzun program yönetimini 
              profesyonel seviyeye taşıyın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/subjects')}
                className="btn-professional-primary text-lg px-8 py-4"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                Derslerle Başla
              </button>
              <button
                onClick={() => navigate('/teachers')}
                className="btn-professional-secondary text-lg px-8 py-4"
              >
                <Users className="w-6 h-6 mr-2" />
                Öğretmenlerle Başla
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="container-professional text-center">
          <p className="text-gray-300">
            © 2024 İDE Okulları - Ders Programı Yönetim Sistemi
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Modern, güvenli ve kullanıcı dostu eğitim teknolojisi çözümleri
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;