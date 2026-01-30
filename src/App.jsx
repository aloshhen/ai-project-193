import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Heart, Award, Shield, Phone, Mail, MapPin, Instagram, Send, 
  ChevronRight, Menu, X, CheckCircle, XCircle, AlertCircle, Image as ImageIcon,
  Star, Zap, Target
} from 'lucide-react'

// Form handler hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        e.target.reset();
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Щось пішло не так');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Помилка мережі. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  };
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm };
};

// Scroll animation component
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler();

  const services = [
    {
      title: 'Перманентний макіяж',
      items: [
        { name: 'Брови', price: '3000' },
        { name: 'Губи', price: '3000' },
        { name: 'Розтушована міжвійка', price: '3000' }
      ],
      icon: Target,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Мікронідлінг',
      items: [
        { name: 'Живіт', price: '2000-4000' },
        { name: 'Ноги', price: '2000-4000' },
        { name: 'Руки', price: '2000-4000' }
      ],
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Ін\'єкційна косметологія',
      items: [
        { name: 'Мезотерапія голови', price: '1500' },
        { name: 'Ботокс всіх зон', price: 'За консультацією' }
      ],
      icon: Shield,
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  const gallery = [
    'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_546123314/edit-photo-1769798620.jpg?',
    'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_546123314/edit-photo-1769798704.jpg?',
    'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_546123314/user-photo-1.jpg?',
    'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_546123314/edit-photo-1769798620.jpg?',
    'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_546123314/edit-photo-1769798704.jpg?',
    'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_546123314/user-photo-1.jpg?'
  ];

  const indications = [
    'Бажання мати виразний макіяж 24/7',
    'Корекція форми та кольору брів, губ',
    'Візуальне збільшення об\'єму губ',
    'Розтяжки після вагітності',
    'Випадіння волосся',
    'Мімічні зморшки'
  ];

  const contraindications = [
    'Вагітність та годування груддю',
    'Онкологічні захворювання',
    'Цукровий діабет (декомпенсована форма)',
    'Епілепсія',
    'Гострі інфекційні захворювання',
    'Порушення згортання крові',
    'Келоїдні рубці',
    'Алергія на пігменти/препарати'
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-2xl z-50 border-b border-purple-500/20">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75" />
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Beauty Lab
                </div>
                <div className="text-xs text-purple-300 font-medium tracking-wider">PERMANENT MAKEUP</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Послуги</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Галерея</a>
              <a href="#info" onClick={(e) => scrollToSection(e, 'info')} className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Інформація</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold transition-all transform group-hover:scale-105">
                  Записатись
                </div>
              </a>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-purple-300 hover:text-purple-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pt-4 pb-2 border-t border-purple-500/20 mt-4"
              >
                <div className="flex flex-col space-y-3">
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2">Послуги</a>
                  <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2">Галерея</a>
                  <a href="#info" onClick={(e) => scrollToSection(e, 'info')} className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2">Інформація</a>
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-semibold text-center">
                    Записатись
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-purple-300 px-5 py-2.5 rounded-full text-sm font-bold mb-8">
                <Star className="w-4 h-4 text-purple-400" />
                Сертифікований майстер-косметолог
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter">
                Твоя краса —
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse">
                  назавжди
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Професійний перманентний макіяж, мікронідлінг та ін'єкційна косметологія. Сучасні техніки, натуральний результат, безпека та комфорт.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all transform group-hover:scale-105 flex items-center justify-center gap-2">
                    Безкоштовна консультація
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </a>
                <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-purple-500/30 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Мої роботи
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50" />
                <div className="relative rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80" 
                    alt="Permanent makeup" 
                    className="w-full h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/50 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white text-xl font-bold">500+ задоволених клієнток</p>
                    <p className="text-purple-300 text-sm mt-1">Перевірені результати</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl transform rotate-3 backdrop-blur-sm border border-white/10">
                <div className="text-4xl font-black">5+</div>
                <div className="text-sm font-bold">років досвіду</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 relative">
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                Послуги та <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ціни</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Професійні процедури для вашої краси та впевненості
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  <div className="relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all transform hover:scale-105 hover:shadow-2xl">
                    <div className={`bg-gradient-to-r ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-6">{service.title}</h3>
                    <div className="space-y-4">
                      {service.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center pb-4 border-b border-purple-500/20 last:border-0">
                          <span className="text-gray-300 font-medium">{item.name}</span>
                          <span className="text-purple-400 font-bold text-lg">{item.price} грн</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-6 relative">
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                Галерея <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">моїх робіт</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Результати, якими я пишаюсь
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="relative group overflow-hidden rounded-2xl aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <img 
                    src={image} 
                    alt={`Робота ${index + 1}`} 
                    className="relative w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 rounded-2xl border border-purple-500/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-white" />
                      <p className="text-white font-semibold">Переглянути</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all transform group-hover:scale-105">
                  <Instagram className="w-6 h-6 inline-block mr-2" />
                  Більше фото в Instagram
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INDICATIONS & CONTRAINDICATIONS */}
      <section id="info" className="py-20 px-6 relative">
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                Важлива <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">інформація</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">Покази</h3>
                  </div>
                  <ul className="space-y-3">
                    {indications.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-red-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-red-500 to-rose-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">Протипокази</h3>
                  </div>
                  <ul className="space-y-3">
                    {contraindications.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-white mb-2 text-lg">Важливо!</h4>
                  <p className="text-gray-300">
                    Перед процедурою обов'язкова консультація. Майстер оцінить стан шкіри, обговорить побажання та підбере оптимальну техніку виконання.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                Записатись на <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">консультацію</span>
              </h2>
              <p className="text-xl text-gray-300">
                Залиште заявку, і я зв'яжусь з вами найближчим часом
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-slate-900/50 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-purple-500/20">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={(e) => handleSubmit(e, 'YOUR_WEB3FORMS_ACCESS_KEY')}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-purple-300 mb-2">Ваше ім'я</label>
                          <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                            placeholder="Введіть ваше ім'я"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-purple-300 mb-2">Телефон</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                            placeholder="+380"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-purple-300 mb-2">Email (опціонально)</label>
                        <input
                          type="email"
                          name="email"
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-purple-300 mb-2">Яка послуга вас цікавить?</label>
                        <select
                          name="service"
                          required
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                        >
                          <option value="" className="bg-slate-900">Оберіть послугу</option>
                          <option value="brows" className="bg-slate-900">Перманент брів</option>
                          <option value="lips" className="bg-slate-900">Перманент губ</option>
                          <option value="eyeliner" className="bg-slate-900">Розтушована міжвійка</option>
                          <option value="microneedling" className="bg-slate-900">Мікронідлінг</option>
                          <option value="meso" className="bg-slate-900">Мезотерапія голови</option>
                          <option value="botox" className="bg-slate-900">Ботокс</option>
                          <option value="consultation" className="bg-slate-900">Консультація</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-purple-300 mb-2">Повідомлення</label>
                        <textarea
                          name="message"
                          rows="4"
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                          placeholder="Розкажіть детальніше про ваші побажання..."
                        ></textarea>
                      </div>
                      
                      {isError && (
                        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <span className="text-red-300 font-medium">{errorMessage}</span>
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-5 rounded-2xl font-black text-lg transition-all transform group-hover:scale-105 disabled:transform-none flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Відправка...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              Відправити заявку
                            </>
                          )}
                        </div>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="text-center py-12"
                    >
                      <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      </div>
                      <h3 className="text-3xl font-black text-white mb-4">
                        Дякую за заявку!
                      </h3>
                      <p className="text-gray-300 mb-8 max-w-md mx-auto text-lg">
                        Я зв'яжусь з вами найближчим часом для уточнення деталей та запису на зручний час.
                      </p>
                      <button
                        onClick={resetForm}
                        className="text-purple-400 hover:text-purple-300 font-bold transition-colors text-lg"
                      >
                        Відправити ще одну заявку
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <a href="tel:+380123456789" className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-center group hover:shadow-lg">
                <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div className="font-bold text-white mb-1">Телефон</div>
                <div className="text-purple-400">+380 (XX) XXX-XX-XX</div>
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-center group hover:shadow-lg">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                  <Instagram className="w-6 h-6 text-pink-400" />
                </div>
                <div className="font-bold text-white mb-1">Instagram</div>
                <div className="text-pink-400">@your_instagram</div>
              </a>

              <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-center group hover:shadow-lg">
                <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Send className="w-6 h-6 text-blue-400" />
                </div>
                <div className="font-bold text-white mb-1">Telegram</div>
                <div className="text-blue-400">@your_telegram</div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950/80 backdrop-blur-2xl py-12 px-6 border-t border-purple-500/20 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75" />
                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">Beauty Lab</div>
                <div className="text-sm text-purple-300">Перманентний макіяж та косметологія</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Send className="w-6 h-6" />
              </a>
              <a href="tel:+380123456789" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-purple-500/10">
            © 2024 Beauty Lab. Всі права захищені.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App