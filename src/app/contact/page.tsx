'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SpeakerWaveIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'

const contactInfo = [
  {
    icon: MapPinIcon,
    title: 'Ünvan',
    details: [
      'TETYM Technology Center',
      'Bakı, Azərbaycan',
      'AZ1000, Nəsimi rayonu'
    ],
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: PhoneIcon,
    title: 'Telefon',
    details: [
      '+994 12 123 45 67',
      '+994 50 123 45 67',
      'Faks: +994 12 123 45 68'
    ],
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: EnvelopeIcon,
    title: 'Email',
    details: [
      'info@tetym.az',
      'support@tetym.az',
      'contact@tetym.az'
    ],
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    icon: ClockIcon,
    title: 'İş Saatları',
    details: [
      'Bazar ertəsi - Cümə: 09:00 - 18:00',
      'Şənbə: 10:00 - 14:00',
      'Bazar: Bağlı'
    ],
    gradient: 'from-orange-500 to-red-600'
  }
]

const departments = [
  {
    icon: AcademicCapIcon,
    name: 'Təhsil Şöbəsi',
    email: 'education@tetym.az',
    phone: '+994 12 123 45 67',
    description: 'Kurs proqramları, təlim materialları və sertifikatlaşdırma'
  },
  {
    icon: UserGroupIcon,
    name: 'Tələbə İşləri',
    email: 'students@tetym.az',
    phone: '+994 12 123 45 68',
    description: 'Tələbə qəbulu, akademik dəstək və karyera məsləhətləri'
  },
  {
    icon: BuildingOfficeIcon,
    name: 'Korporativ Əlaqələr',
    email: 'corporate@tetym.az',
    phone: '+994 12 123 45 69',
    description: 'Şirkət əməkdaşlığı, layihə təklifləri və sponsorluq'
  },
  {
    icon: ComputerDesktopIcon,
    name: 'Texniki Dəstək',
    email: 'support@tetym.az',
    phone: '+994 12 123 45 70',
    description: 'Platform istifadəsi, texniki problemlər və sistem dəstəyi'
  }
]

const socialMedia = [
  { name: 'LinkedIn', url: 'https://linkedin.com/company/tetym', followers: '5.2K' },
  { name: 'Instagram', url: 'https://instagram.com/tetym_az', followers: '8.1K' },
  { name: 'Facebook', url: 'https://facebook.com/tetym', followers: '3.7K' },
  { name: 'Twitter', url: 'https://twitter.com/tetym_az', followers: '2.9K' },
  { name: 'YouTube', url: 'https://youtube.com/tetym', followers: '12.5K' },
  { name: 'Telegram', url: 'https://t.me/tetym_channel', followers: '6.8K' }
]

const faqItems = [
  {
    question: 'TETYM-ə necə qoşula bilərəm?',
    answer: 'Bizim veb saytımızda qeydiyyatdan keçərək TETYM icmasına qoşula bilərsiniz. Qeydiyyat prosesi sadə və pulsuzdu.'
  },
  {
    question: 'Hansı kurslar mövcuddur?',
    answer: 'Biz AI/ML, IoT, Blockchain, Web Development, Mobile Development və digər müasir texnologiyalar üzrə kurslar təklif edirik.'
  },
  {
    question: 'Sertifikat ala bilərəmmi?',
    answer: 'Bəli, kursları müvəffəqiyyətlə başa vuran iştirakçılar sertifikat alırlar. Sertifikatlarımız sənayedə tanınır.'
  },
  {
    question: 'Kursların qiyməti necədir?',
    answer: 'Əksər kurslarımız pulsuzdu. Bəzi xüsusi və peşəkar kurslar üçün nominal ödəniş tələb olunur.'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: '',
    priority: 'medium'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState('contact')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        department: '',
        message: '',
        priority: 'medium'
      })
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-80 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <motion.div 
            className="relative z-10 h-full flex items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl">
                    <ChatBubbleLeftRightIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4 sm:text-5xl">
                  Bizimlə Əlaqə
                </h1>
                <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                  Suallarınız, təklifləriniz və ya layihə ideyalarınız var? Bizim komanda sizinlə əlaqə saxlamaq üçün həmişə hazırdır.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center text-sm text-white/80">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    24/7 Online Dəstək
                  </div>
                  <div className="flex items-center">
                    <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
                    Sürətli Cavab
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    Peşəkar Komanda
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Navigation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            {[
              { value: 'contact', label: 'Əlaqə Formu', icon: PaperAirplaneIcon },
              { value: 'info', label: 'Əlaqə Məlumatları', icon: InformationCircleIcon },
              { value: 'departments', label: 'Şöbələr', icon: BuildingOfficeIcon },
              { value: 'faq', label: 'FAQ', icon: ExclamationTriangleIcon }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.value
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contact Form Tab */}
          {activeTab === 'contact' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PaperAirplaneIcon className="h-5 w-5" />
                        Mesaj Göndərin
                      </CardTitle>
                      <CardDescription>
                        Formu dolduraraq bizimlə əlaqə saxlayın. Ən qısa müddətdə sizə cavab verəcəyik.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Ad Soyad *
                            </label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Adınızı daxil edin"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email *
                            </label>
                            <Input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="email@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Telefon
                            </label>
                            <Input
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+994 XX XXX XX XX"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Şöbə
                            </label>
                            <select
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Şöbə seçin</option>
                              <option value="education">Təhsil Şöbəsi</option>
                              <option value="students">Tələbə İşləri</option>
                              <option value="corporate">Korporativ Əlaqələr</option>
                              <option value="support">Texniki Dəstək</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mövzu *
                          </label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Mesajınızın mövzusu"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prioritet
                          </label>
                          <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="low">Aşağı</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksək</option>
                            <option value="urgent">Təcili</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mesaj *
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Mesajınızı burada yazın..."
                            rows={6}
                            required
                          />
                        </div>

                        {submitStatus === 'success' && (
                          <div className="flex items-center p-4 rounded-lg bg-green-50 border border-green-200">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
                            <p className="text-green-800">Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.</p>
                          </div>
                        )}

                        {submitStatus === 'error' && (
                          <div className="flex items-center p-4 rounded-lg bg-red-50 border border-red-200">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-3" />
                            <p className="text-red-800">Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.</p>
                          </div>
                        )}

                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? 'Göndərilir...' : 'Mesaj Göndər'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Quick Contact */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <SpeakerWaveIcon className="h-5 w-5" />
                        Sürətli Əlaqə
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full" variant="outline">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          İndi Zəng Edin
                        </Button>
                        <Button className="w-full" variant="outline">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                          Canlı Chat
                        </Button>
                        <Button className="w-full" variant="outline">
                          <CalendarDaysIcon className="h-4 w-4 mr-2" />
                          Görüş Planla
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Sosial Media</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {socialMedia.map((social, index) => (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center"
                          >
                            <span className="font-medium text-gray-900 text-sm">{social.name}</span>
                            <span className="text-xs text-gray-500">{social.followers}</span>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}

          {/* Contact Info Tab */}
          {activeTab === 'info' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <info.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-3">{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <dept.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <EnvelopeIcon className="h-4 w-4 mr-2" />
                              <a href={`mailto:${dept.email}`} className="hover:text-blue-600">
                                {dept.email}
                              </a>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <PhoneIcon className="h-4 w-4 mr-2" />
                              <a href={`tel:${dept.phone}`} className="hover:text-blue-600">
                                {dept.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">{item.question}</h3>
                        <p className="text-gray-600">{item.answer}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
