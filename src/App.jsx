import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Star, Heart, Award, Phone, Mail, MapPin, Instagram, Send, 
  ChevronRight, Menu, X, CheckCircle, XCircle, AlertCircle, Image as ImageIcon
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
      icon: Star
    },
    {
      title: 'Мікронідлінг',
      items: [
        { name: 'Живіт', price: '2000-4000' },
        { name: 'Ноги', price: '2000-4000' },
        { name: 'Руки', price: '2000-4000' }
      ],
      icon: Heart
    },
    {
      title: 'Ін\'єкційна косметологія',
      items: [
        { name: 'Мезотерапія голови', price: '1500' },
        { name: 'Ботокс всіх зон', price: 'За консультацією' }
      ],
      icon: Award
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-rose-100 shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-10 h-10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">Beauty Studio</div>
                <div className="text-xs text-rose-600">Перманентний макіяж</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Послуги</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Галерея</a>
              <a href="#info" onClick={(e) => scrollToSection(e, 'info')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium">Інформація</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md">
                Записатись
              </a>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-rose-600 transition-colors"
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
                className="md:hidden pt-4 pb-2 border-t border-rose-100 mt-4"
              >
                <div className="flex flex-col space-y-3">
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium py-2">Послуги</a>
                  <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium py-2">Галерея</a>
                  <a href="#info" onClick={(e) => scrollToSection(e, 'info')} className="text-gray-700 hover:text-rose-600 transition-colors font-medium py-2">Інформація</a>
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-semibold text-center">
                    Записатись
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ✨ Професійна майстер-косметолог
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
                Підкресли свою
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                  природну красу
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Перманентний макіяж, мікронідлінг та ін'єкційна косметологія від сертифікованого майстра. Сучасні техніки, натуральний результат.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30">
                  Записатись на консультацію
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full text-lg font-bold transition-all border-2 border-gray-200 hover:border-rose-300 flex items-center justify-center gap-2">
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80" 
                  alt="Permanent makeup" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-lg font-semibold">500+ задоволених клієнток</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl transform rotate-3">
                <div className="text-3xl font-black">5+</div>
                <div className="text-sm">років досвіду</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Послуги та <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">ціни</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Професійні процедури для вашої краси та впевненості
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border-2 border-rose-100 hover:border-rose-300 transition-all transform hover:scale-105 hover:shadow-xl">
                  <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{service.title}</h3>
                  <div className="space-y-4">
                    {service.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-4 border-b border-rose-200 last:border-0">
                        <span className="text-gray-700 font-medium">{item.name}</span>
                        <span className="text-rose-600 font-bold text-lg">{item.price} грн</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-6 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Галерея <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">моїх робіт</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Результати, якими я пишаюсь
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="relative group overflow-hidden rounded-2xl aspect-square shadow-lg hover:shadow-2xl transition-all">
                  <img 
                    src={image} 
                    alt={`Робота ${index + 1}`} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-semibold">Перегляд</p>
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
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                <Instagram className="w-6 h-6" />
                Більше фото в Instagram
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INDICATIONS & CONTRAINDICATIONS */}
      <section id="info" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Важлива <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">інформація</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Покази</h3>
                </div>
                <ul className="space-y-3">
                  {indications.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border-2 border-red-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center">
                    <XCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Протипокази</h3>
                </div>
                <ul className="space-y-3">
                  {contraindications.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Важливо!</h4>
                  <p className="text-gray-700">
                    Перед процедурою обов'язкова консультація. Майстер оцінить стан шкіри, обговорить побажання та підбере оптимальну техніку виконання.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Записатись на <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">консультацію</span>
              </h2>
              <p className="text-xl text-gray-600">
                Залиште заявку, і я зв'яжусь з вами найближчим часом
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-rose-100">
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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ваше ім'я</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors"
                          placeholder="Введіть ваше ім'я"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors"
                          placeholder="+380"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email (опціонально)</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Яка послуга вас цікавить?</label>
                      <select
                        name="service"
                        required
                        className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-100 rounded-xl text-gray-900 focus:outline-none focus:border-rose-500 transition-colors"
                      >
                        <option value="">Оберіть послугу</option>
                        <option value="brows">Перманент брів</option>
                        <option value="lips">Перманент губ</option>
                        <option value="eyeliner">Розтушована міжвійка</option>
                        <option value="microneedling">Мікронідлінг</option>
                        <option value="meso">Мезотерапія голови</option>
                        <option value="botox">Ботокс</option>
                        <option value="consultation">Консультація</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Повідомлення</label>
                      <textarea
                        name="message"
                        rows="4"
                        className="w-full px-4 py-3 bg-rose-50 border-2 border-rose-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                        placeholder="Розкажіть детальніше про ваші побажання..."
                      ></textarea>
                    </div>
                    
                    {isError && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <span className="text-red-700 font-medium">{errorMessage}</span>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30"
                    >
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
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Дякую за заявку!
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                      Я зв'яжусь з вами найближчим часом для уточнення деталей та запису на зручний час.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-rose-600 hover:text-rose-700 font-semibold transition-colors text-lg"
                    >
                      Відправити ще одну заявку
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <a href="tel:+380123456789" className="bg-white p-6 rounded-2xl border-2 border-rose-100 hover:border-rose-300 transition-all text-center group hover:shadow-lg">
                <div className="bg-rose-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                  <Phone className="w-6 h-6 text-rose-600" />
                </div>
                <div className="font-semibold text-gray-900 mb-1">Телефон</div>
                <div className="text-rose-600">+380 (XX) XXX-XX-XX</div>
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl border-2 border-rose-100 hover:border-rose-300 transition-all text-center group hover:shadow-lg">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                  <Instagram className="w-6 h-6 text-purple-600" />
                </div>
                <div className="font-semibold text-gray-900 mb-1">Instagram</div>
                <div className="text-purple-600">@your_instagram</div>
              </a>

              <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl border-2 border-rose-100 hover:border-rose-300 transition-all text-center group hover:shadow-lg">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-semibold text-gray-900 mb-1">Telegram</div>
                <div className="text-blue-600">@your_telegram</div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black py-12 px-6 border-t border-rose-900/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-10 h-10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Beauty Studio</div>
                <div className="text-sm text-rose-400">Перманентний макіяж та косметологія</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Send className="w-6 h-6" />
              </a>
              <a href="tel:+380123456789" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-gray-800">
            © 2024 Beauty Studio. Всі права захищені.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App