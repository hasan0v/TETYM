'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  RocketLaunchIcon,
  LightBulbIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  GlobeAltIcon,
  HeartIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  UsersIcon,
  BookOpenIcon,
  CpuChipIcon,
  CodeBracketIcon,
  BeakerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  EyeIcon,
  FlagIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    icon: UsersIcon,
    value: '2,500+',
    label: 'Aktiv Tələbə',
    description: 'Müxtəlif sahələrdə təhsil alan'
  },
  {
    icon: AcademicCapIcon,
    value: '150+',
    label: 'Kurs Proqramı',
    description: 'Müasir texnologiyalar üzrə'
  },
  {
    icon: TrophyIcon,
    value: '89%',
    label: 'İşə Yerləşmə',
    description: 'Məzunlarımızın uğur nisbəti'
  },
  {
    icon: GlobeAltIcon,
    value: '25+',
    label: 'Şəriklik',
    description: 'Yerli və beynəlxalq şirkətlərlə'
  }
]

const values = [
  {
    icon: LightBulbIcon,
    title: 'İnnovasiya',
    description: 'Ən son texnologiyalar və yenilikçi həllərlə gələcəyi formalaşdırırıq.',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    icon: UserGroupIcon,
    title: 'Komanda İşi',
    description: 'Birgə işləyərək daha böyük nailiyyətlərə nail oluruq.',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: BookOpenIcon,
    title: 'Öyrənmə',
    description: 'Daimi öyrənmə və inkişaf bizim əsas prinsiplərimizdən biridir.',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: HeartIcon,
    title: 'Keyfiyyət',
    description: 'Hər layihədə və xidmətdə ən yüksək keyfiyyət standartlarını təmin edirik.',
    gradient: 'from-red-500 to-pink-600'
  }
]

const team = [
  {
    name: 'Dr. Əli Həsənov',
    role: 'Baş Direktor',
    bio: 'MIT-də PhD dərəcəsi, 15+ il texnologiya sahəsində təcrübə',
    image: '/api/placeholder/200/200',
    specialties: ['AI Strategy', 'Leadership', 'Innovation']
  },
  {
    name: 'Leyla Məmmədova',
    role: 'Akademik Direktor',
    bio: 'Stanford University mezunu, təhsil texnologiyaları mütəxəssisi',
    image: '/api/placeholder/200/200',
    specialties: ['Education', 'Curriculum Design', 'Research']
  },
  {
    name: 'Rəşad Quliyev',
    role: 'Texnologiya Direktoru',
    bio: 'Google və Meta-da senior developer kimi çalışıb',
    image: '/api/placeholder/200/200',
    specialties: ['Full-Stack', 'Cloud Architecture', 'DevOps']
  },
  {
    name: 'Səbinə Əliyeva',
    role: 'Tələbə İşləri Direktoru',
    bio: 'İnsan resursları və tələbə dəstəyi sahəsində 10+ il təcrübə',
    image: '/api/placeholder/200/200',
    specialties: ['Student Success', 'Career Development', 'HR']
  }
]

const timeline = [
  {
    year: '2020',
    title: 'TETYM Təsisatı',
    description: 'Texnologiya təhsili sahəsində fərq yaratmaq missiyası ilə yola çıxdıq.',
    icon: RocketLaunchIcon
  },
  {
    year: '2021',
    title: 'İlk Kurslar',
    description: 'AI və Web Development üzrə ilk kurs proqramlarımızı başlatdıq.',
    icon: BookOpenIcon
  },
  {
    year: '2022',
    title: 'Şəriklik Genişlənməsi',
    description: '15+ texnologiya şirkəti ilə əməkdaşlıq müqaviləsi imzaladıq.',
    icon: BuildingOfficeIcon
  },
  {
    year: '2023',
    title: 'Beynəlxalq Tanınma',
    description: 'Regional ən yaxşı texnologiya təhsil mərkəzi mükafatını qazandıq.',
    icon: TrophyIcon
  },
  {
    year: '2024',
    title: 'Platform Innovasiyası',
    description: 'AI-powered öyrənmə platformamızı işə saldıq və 2,500+ tələbəyə çatdıq.',
    icon: SparklesIcon
  }
]

const technologies = [
  { name: 'Artificial Intelligence', icon: LightBulbIcon },
  { name: 'Machine Learning', icon: CpuChipIcon },
  { name: 'Web Development', icon: CodeBracketIcon },
  { name: 'Mobile Development', icon: BeakerIcon },
  { name: 'Blockchain', icon: ShieldCheckIcon },
  { name: 'IoT', icon: SparklesIcon },
  { name: 'Data Science', icon: ChartBarIcon },
  { name: 'Cloud Computing', icon: GlobeAltIcon }
]

const achievements = [
  {
    title: 'Regional Excellence Award',
    year: '2024',
    description: 'Ən yaxşı texnologiya təhsil mərkəzi'
  },
  {
    title: 'Innovation in Education',
    year: '2023',
    description: 'Təhsildə innovasiya mükafatı'
  },
  {
    title: 'Best Startup Program',
    year: '2023',
    description: 'Ən yaxşı startup inkubator proqramı'
  },
  {
    title: 'Student Success Champion',
    year: '2022',
    description: 'Tələbə uğuru üzrə çempion'
  }
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
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
                    <RocketLaunchIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-4 sm:text-5xl">
                  TETYM Haqqında
                </h1>
                <p className="text-xl text-indigo-100 mb-6 max-w-3xl mx-auto">
                  Texnologiya sahəsində gələcəyin liderləri yetişdirən, innovativ təhsil həlləri ilə Azərbaycanda 
                  rəqəmsal transformasiyanı dəstəkləyən aparıcı təhsil mərkəzi.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center text-sm text-white/80">
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-4 w-4 mr-2" />
                    2020-ci ildən fəaliyyətdə
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    2,500+ Mezun
                  </div>
                  <div className="flex items-center">
                    <TrophyIcon className="h-4 w-4 mr-2" />
                    15+ Mükafat
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center bg-white/80 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Navigation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            {[
              { value: 'story', label: 'Bizim Hekayə', icon: BookOpenIcon },
              { value: 'mission', label: 'Missiya & Vizyon', icon: FlagIcon },
              { value: 'values', label: 'Dəyərlərimiz', icon: HeartIcon },
              { value: 'team', label: 'Komanda', icon: UserGroupIcon },
              { value: 'timeline', label: 'Tarixçə', icon: CalendarDaysIcon },
              { value: 'achievements', label: 'Nailiyyətlər', icon: TrophyIcon }
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

          {/* Story Tab */}
          {activeTab === 'story' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Texnologiya İlə Gələcəyi Formalaşdırırıq
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    TETYM (Technology Education for Tomorrow&apos;s Youth & Minds) 2020-ci ildə Azərbaycanda 
                    texnologiya təhsilində mövcud olan boşluqları dolduraq və gənclərimizi gələcəyin 
                    peşələrinə hazırlamaq məqsədi ilə yaradılmışdır.
                  </p>
                  <p>
                    Bizim əsas məqsədimiz tələbələrimizi yalnız texniki biliklərlə silahlandırmaq deyil, 
                    həm də onlarda kritik düşüncə, yaradıcılıq və komanda işi kimi 21-ci əsr bacarıqlarını 
                    inkişaf etdirməkdir.
                  </p>
                  <p>
                    Müasir dünyada texnologiyanın sürətlə dəyişməsi ilə addımları bərabər tutaraq, 
                    tələbələrimizə ən son texnologiyalar və metodologiyalar öyrədir, onları real 
                    layihələrdə təcrübə qazanmağa təşviq edirik.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {technologies.map((tech, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <tech.icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}

          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FlagIcon className="h-6 w-6 text-blue-600" />
                      Missiyamız
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      Azərbaycanda texnologiya sahəsində beynəlxalq standartlarda təhsil verərək, 
                      innovativ düşünən, problem həll etməyi bacaran və gələcəyin rəqəmsal dünyasına 
                      hazır olan mütəxəssislər yetişdirmək. Tələbələrimizə yalnız texniki biliklər 
                      deyil, həm də sosial məsuliyyət hissi və etik dəyərlər aşılamaq.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <EyeIcon className="h-6 w-6 text-purple-600" />
                      Vizyonumuz
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      2030-cu ilə qədər regionun ən nüfuzlu texnologiya təhsil mərkəzi olmaq və 
                      mezunlarımızın dünya səviyyəsində texnologiya şirkətlərində aparıcı mövqelərdə 
                      çalışması. Azərbaycanın rəqəmsal transformasiyasına töhfə verən və ölkəmizi 
                      texnologiya sahəsində qabaqcıl dövlətlər sırasına çıxaran nəsil yetişdirmək.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-lg flex items-center justify-center`}>
                          <value.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2 text-lg">{value.title}</h3>
                          <p className="text-gray-600">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 text-white font-semibold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 mb-3 text-sm">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.specialties.map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="relative flex items-start space-x-6"
                    >
                      <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 pb-8">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                                {item.year}
                              </span>
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <TrophyIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                            <span className="text-sm text-gray-500">{achievement.year}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Bizə Qoşulmaq İstəyirsiniz?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              TETYM ailəsinin bir parçası olun və texnologiyanın gələcəyini birlikdə formalaşdıraq.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <UsersIcon className="h-5 w-5 mr-2" />
                Kurslarımıza Baxın
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <HeartIcon className="h-5 w-5 mr-2" />
                Bizimlə Əlaqə
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
