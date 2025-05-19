'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// This will later be fetched from Supabase
const sampleBlogPosts = [
  {
    id: '1',
    title_en: 'BSU Students Win National Innovation Award',
    title_az: 'BDU Tələbələri Milli İnnovasiya Mükafatını Qazandılar',
    content_preview_en: 'A team of BSU computer science students has been awarded the prestigious National Innovation Award for their groundbreaking work in artificial intelligence.',
    content_preview_az: 'BDU kompüter elmləri tələbələrindən ibarət komanda süni intellekt sahəsində inqilabi işlərinə görə nüfuzlu Milli İnnovasiya Mükafatına layiq görülüb.',
    content_en: `
    # BSU Students Win National Innovation Award

    A team of BSU computer science students has been awarded the prestigious National Innovation Award for their groundbreaking work in artificial intelligence. The team, led by senior student Elchin Mammadov, developed a new algorithm for natural language understanding that significantly outperforms existing solutions on Azerbaijani language tasks.

    ## The Award-Winning Project

    The project, named "AzeriNLP," is a machine learning system designed specifically for processing and understanding the Azerbaijani language. The system can perform various tasks including:

    - Text classification
    - Named entity recognition
    - Sentiment analysis
    - Machine translation

    What makes AzeriNLP unique is its ability to understand the contextual nuances and grammatical structures specific to the Azerbaijani language, which has historically been underrepresented in mainstream NLP research.

    ## Impact on Local Technology Development

    The Ministry of Digital Development and Transport, which presented the award, praised the project for its potential applications in government services, education, and business sectors across Azerbaijan.

    "This innovation represents a significant leap forward in making digital services more accessible to Azerbaijani citizens," said Minister Ibrahim Aliyev during the award ceremony. "It demonstrates how our young talents are contributing to the country's digital transformation agenda."

    ## International Recognition

    The project has also gained international attention, with representatives from major tech companies expressing interest in collaborating with the team. The students have been invited to present their work at the upcoming International Conference on Computational Linguistics.

    ## What's Next for the Team

    With the €25,000 prize money, the team plans to expand the project's capabilities and establish a startup focused on Azerbaijani language technology solutions.

    "We're incredibly honored to receive this recognition," said team leader Elchin Mammadov. "Our goal was to create technology that serves the needs of our language and culture, and this award validates the importance of that mission."

    The team will continue their research at BSU's Student Scientific-Technical Creativity Center, where they have been working on the project for the past 18 months under the mentorship of Dr. Vugar Ahmadov.

    ## About the National Innovation Award

    The National Innovation Award is presented annually to recognize outstanding technological innovations developed within Azerbaijan. The competition evaluates projects based on their technical merit, innovation level, potential social impact, and commercial viability.
    `,
    content_az: `
    # BDU Tələbələri Milli İnnovasiya Mükafatını Qazandılar

    BDU-nun kompüter elmləri tələbələrindən ibarət bir komanda süni intellekt sahəsində inqilabi işlərinə görə nüfuzlu Milli İnnovasiya Mükafatına layiq görülüb. Böyük tələbə Elçin Məmmədovun rəhbərlik etdiyi komanda Azərbaycan dili tapşırıqlarında mövcud həllərdən əhəmiyyətli dərəcədə üstün olan təbii dil anlama üçün yeni alqoritm hazırlayıb.

    ## Mükafata Layiq Görülən Layihə

    "AzeriNLP" adlanan layihə xüsusi olaraq Azərbaycan dilini emal etmək və başa düşmək üçün hazırlanmış maşın öyrənmə sistemidir. Sistem aşağıdakılar da daxil olmaqla müxtəlif tapşırıqları yerinə yetirə bilər:

    - Mətn təsnifatı
    - Adlandırılmış varlıq tanınması
    - Sentiment analizi
    - Maşın tərcüməsi

    AzeriNLP-ni unikal edən, əsas NLP tədqiqatlarında tarixən az təmsil olunan Azərbaycan dilinə xas olan kontekstual nüansları və qrammatik strukturları başa düşmək qabiliyyətidir.

    ## Yerli Texnologiya İnkişafına Təsiri

    Mükafatı təqdim edən Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi layihəni Azərbaycan ərazisində dövlət xidmətlərində, təhsil və biznes sektorlarında potensial tətbiqlərinə görə təqdir edib.

    "Bu innovasiya rəqəmsal xidmətləri Azərbaycan vətəndaşları üçün daha əlçatan etmək istiqamətində əhəmiyyətli irəliləyişi əks etdirir," deyə nazir İbrahim Əliyev mükafat mərasimində bildirib. "Bu, gənc istedadlarımızın ölkənin rəqəmsal transformasiya gündəliyinə necə töhfə verdiyini nümayiş etdirir."

    ## Beynəlxalq Tanınma

    Layihə həmçinin beynəlxalq diqqət qazanıb, böyük texnologiya şirkətlərinin nümayəndələri komanda ilə əməkdaşlıq etməyə maraq göstəriblər. Tələbələr qarşıdan gələn Hesablama Dilçiliyi üzrə Beynəlxalq Konfransda öz işlərini təqdim etmək üçün dəvət olunublar.

    ## Komanda Üçün Növbəti Addımlar

    25.000 Avro mükafat pulu ilə komanda layihənin imkanlarını genişləndirməyi və Azərbaycan dili texnologiyası həllərinə yönəlmiş startap yaratmağı planlaşdırır.

    "Biz bu tanınmaya görə inanılmaz dərəcədə şərəf duyuruq," deyə komanda lideri Elçin Məmmədov bildirib. "Məqsədimiz dilimizin və mədəniyyətimizin ehtiyaclarına xidmət edən texnologiya yaratmaq idi və bu mükafat həmin missiyanın əhəmiyyətini təsdiqləyir."

    Komanda BDU-nun Tələbə Texniki Yaradıcılıq Mərkəzində Dr. Vüqar Əhmədovun mentorluğu altında son 18 ay ərzində layihə üzərində işlədikləri tədqiqatlarını davam etdirəcək.

    ## Milli İnnovasiya Mükafatı Haqqında

    Milli İnnovasiya Mükafatı hər il Azərbaycan daxilində hazırlanmış görkəmli texnoloji yenilikləri tanımaq üçün təqdim edilir. Müsabiqə layihələri onların texniki üstünlüyü, innovasiya səviyyəsi, potensial sosial təsiri və kommersiya həyat qabiliyyəti əsasında qiymətləndirir.
    `,
    image_url: '/placeholder/blog1.svg',
    cover_image_url: '/placeholder/blog-cover1.svg',
    created_at: '2025-05-01',
    author: 'Dr. Nadir Aliyev',
    author_title_en: 'Director, SSTCC',
    author_title_az: 'Direktor, TETYM',
    author_image: '/placeholder/author1.svg',
    category_en: 'Awards',
    category_az: 'Mükafatlar',
    related_posts: ['2', '4', '5']
  },
  {
    id: '2',
    title_en: 'New Robotics Lab Opens at SSTCC',
    title_az: 'TETYM-də Yeni Robotika Laboratoriyası Açıldı',
    content_preview_en: 'The Student Scientific-Technical Creativity Center has opened a state-of-the-art robotics lab equipped with the latest technology for student projects.',
    content_preview_az: 'Tələbə Texniki Yaradıcılıq Mərkəzi tələbə layihələri üçün ən son texnologiya ilə təchiz edilmiş müasir robotika laboratoriyası açıb.',
    content_en: `
    # New Robotics Lab Opens at SSTCC

    The Baku State University Student Scientific-Technical Creativity Center (SSTCC) has officially opened its new state-of-the-art robotics laboratory. The facility, which represents a €500,000 investment in student innovation, was inaugurated in a ceremony attended by university officials, industry partners, and government representatives.

    ## Cutting-Edge Equipment

    The 200-square-meter laboratory features equipment that meets industry standards, including:

    - Advanced 3D printers for rapid prototyping
    - Precision CNC machines for component manufacturing
    - Professional-grade electronic workstations
    - Various robot kits and platforms for different applications
    - Testing areas for aerial, terrestrial, and aquatic robots

    "This laboratory represents our commitment to providing students with the tools they need to turn their innovative ideas into reality," said Dr. Leyla Mammadova, Research Director at SSTCC. "The equipment here rivals what they would find in industry settings, giving them valuable hands-on experience."

    ## Industry Partnerships

    The lab was made possible through partnerships with several technology companies, including ABB, Siemens, and local technology firm InnoTech Azerbaijan. These companies not only contributed equipment but will also provide mentorship opportunities and internships for students working on robotics projects.

    "We see this as an investment in the future workforce," said Farid Huseynov, CEO of InnoTech Azerbaijan. "The students who develop their skills in this lab today will be solving complex technical challenges in our companies tomorrow."

    ## Educational Impact

    The robotics lab will support coursework across multiple departments, including Computer Science, Electrical Engineering, and Mechanical Engineering. Additionally, it will serve as the home base for the university's successful robotics club, which has won several national competitions.

    "Having access to professional equipment makes all the difference," said Kamran Hasanov, a third-year mechatronics student and president of the robotics club. "We're already working on an autonomous delivery robot that we hope to enter in the International Robotics Challenge next year."

    ## Future Plans

    University officials announced that the robotics lab is just the first phase of a larger innovation hub planned for the SSTCC. Future additions will include:

    - An artificial intelligence lab
    - A virtual reality development center
    - A biotech innovation space
    - A startup incubator

    The complete innovation hub is expected to be fully operational by 2027, with additional funding being sought through government grants and private sector partnerships.

    "We're creating an ecosystem that nurtures technical creativity and entrepreneurship," said Dr. Nadir Aliyev, Director of SSTCC. "Our goal is to make BSU a center of innovation not just in Azerbaijan, but across the region."

    The robotics lab is now open for student and faculty use, with regular workshops and training sessions scheduled to begin next week.
    `,
    content_az: `
    # TETYM-də Yeni Robotika Laboratoriyası Açıldı

    Bakı Dövlət Universiteti Tələbə Texniki Yaradıcılıq Mərkəzində (TETYM) yeni, müasir robotika laboratoriyası rəsmi olaraq açılıb. Tələbə innovasiyasına 500.000 avro investisiya təmsil edən obyekt universitet rəsmiləri, sənaye tərəfdaşları və hökumət nümayəndələrinin iştirakı ilə açılıb.

    ## Ən Son Avadanlıqlar

    200 kvadratmetrlik laboratoriyada sənaye standartlarına cavab verən avadanlıqlar var, o cümlədən:

    - Sürətli prototipləşdirmə üçün qabaqcıl 3D printerləri
    - Komponent istehsalı üçün dəqiq CNC maşınları
    - Peşəkar səviyyəli elektron iş stansiyaları
    - Müxtəlif tətbiqlər üçün müxtəlif robot dəstləri və platformaları
    - Hava, yerüstü və su robotları üçün test sahələri

    "Bu laboratoriya tələbələri innovativ ideyalarını reallığa çevirmək üçün lazım olan alətlərlə təmin etmək üçün öhdəliyimizi təmsil edir," deyə TETYM-in Tədqiqat Direktoru Dr. Leyla Məmmədova bildirib. "Buradakı avadanlıqlar sənaye mühitində tapacaqları ilə rəqabət aparır, onlara qiymətli praktiki təcrübə verir."

    ## Sənaye Tərəfdaşlıqları

    Laboratoriya ABB, Siemens və yerli texnologiya şirkəti InnoTech Azerbaijan daxil olmaqla bir neçə texnologiya şirkəti ilə tərəfdaşlıq sayəsində mümkün olub. Bu şirkətlər təkcə avadanlıq təmin etməyiblər, həm də robotika layihələri üzərində işləyən tələbələr üçün mentorluq imkanları və təcrübə təqdim edəcəklər.

    "Biz bunu gələcək işçi qüvvəsinə sərmayə kimi görürük," deyə InnoTech Azerbaijan-ın baş direktoru Fərid Hüseynov bildirib. "Bu gün bu laboratoriyada bacarıqlarını inkişaf etdirən tələbələr sabah şirkətlərimizdə mürəkkəb texniki çağırışları həll edəcəklər."

    ## Təhsil Təsiri

    Robotika laboratoriyası Kompüter Elmləri, Elektrik Mühəndisliyi və Mexanika Mühəndisliyi daxil olmaqla bir neçə şöbədə dərs proqramını dəstəkləyəcək. Bundan əlavə, o, universitetin bir neçə milli yarışma qazanmış uğurlu robotika klubu üçün baza olaraq xidmət edəcək.

    "Peşəkar avadanlığa çıxış əldə etmək hər şeyi dəyişir," deyə üçüncü kurs mexatronika tələbəsi və robotika klubunun prezidenti Kamran Həsənov bildirib. "Biz artıq gələn il Beynəlxalq Robotika Çağırışına daxil etməyi ümid etdiyimiz avtonom çatdırılma robotu üzərində işləyirik."

    ## Gələcək Planları

    Universitet rəsmiləri bildiriblər ki, robotika laboratoriyası TETYM üçün planlaşdırılan daha böyük innovasiya mərkəzinin yalnız ilk mərhələsidir. Gələcək əlavələrə aşağıdakılar daxil olacaq:

    - Süni intellekt laboratoriyası
    - Virtual reallıq inkişaf mərkəzi
    - Biotexnologiya innovasiya məkanı
    - Startap inkubatoru

    Tam innovasiya mərkəzinin 2027-ci ilə qədər tam fəaliyyət göstərəcəyi gözlənilir, əlavə maliyyələşdirmə hökumət qrantları və özəl sektorla tərəfdaşlıq vasitəsilə axtarılır.

    "Biz texniki yaradıcılığı və sahibkarlığı qidalandıran bir ekosistem yaradırıq," deyə TETYM-in direktoru Dr. Nadir Əliyev bildirib. "Məqsədimiz BDU-nu təkcə Azərbaycanda deyil, bütün regionda innovasiya mərkəzinə çevirmək."

    Robotika laboratoriyası indi tələbə və fakültə istifadəsi üçün açıqdır, müntəzəm seminarlar və təlim sessiyaları gələn həftə başlayacaq.
    `,
    image_url: '/placeholder/blog2.svg',
    cover_image_url: '/placeholder/blog-cover2.svg',
    created_at: '2025-04-20',
    author: 'Leyla Mammadova',
    author_title_en: 'Research Director, SSTCC',
    author_title_az: 'Tədqiqat Direktoru, TETYM',
    author_image: '/placeholder/author2.svg',
    category_en: 'Facilities',
    category_az: 'Obyektlər',
    related_posts: ['1', '3', '6']
  },
  // Additional blog posts would follow the same structure
];

export default function BlogPostDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const { id } = params;
  
  const [post, setPost] = useState<any | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with delay
    const fetchPost = async () => {
      try {
        // This would be replaced with a real API call
        setTimeout(() => {
          const foundPost = sampleBlogPosts.find(p => p.id === id);
          setPost(foundPost || null);
          
          if (foundPost && foundPost.related_posts) {
            const related = sampleBlogPosts.filter(p => foundPost.related_posts.includes(p.id));
            setRelatedPosts(related);
          }
          
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">{t('common.loading')}</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!post) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">{t('blog.notFound')}</h3>
            <p className="mt-1 text-gray-500">{t('blog.notFoundDesc')}</p>
            <div className="mt-6">
              <Link href="/blog" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                {t('common.backToList')}
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const postTitle = language === 'en' ? post.title_en : post.title_az;
  const postContent = language === 'en' ? post.content_en : post.content_az;
  const postCategory = language === 'en' ? post.category_en : post.category_az;
  const authorTitle = language === 'en' ? post.author_title_en : post.author_title_az;
  
  // Function to convert markdown to HTML
  const markdownToHTML = (markdown: string) => {
    // This is a very basic implementation
    // In a real project, use a library like react-markdown
    const html = markdown
      // Headers
      .replace(/# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/### (.*$)/gim, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
      // Lists
      .replace(/^\s*- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      // Paragraphs
      .split(/\n\s*\n/)
      .map(paragraph => {
        if (paragraph.trim().startsWith('<h') || 
            paragraph.trim().startsWith('<li') ||
            paragraph.trim() === '') {
          return paragraph;
        }
        return `<p class="mb-4 text-gray-700">${paragraph.trim()}</p>`;
      })
      .join('');
    
    // Wrap lists
    const wrappedHtml = html.replace(/(<li[^>]*>.*<\/li>\s*)+/g, match => {
      return `<ul class="my-4">${match}</ul>`;
    });
    
    return wrappedHtml;
  };
  
  return (
    <MainLayout>
      {/* Hero Section with Cover Image */}
      <div className="relative h-96 md:h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-teal-900/80 z-10"></div>
        <Image 
          src={post.cover_image_url || post.image_url}
          alt={postTitle}
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {postCategory}
              </span>
              <span className="ml-4 text-white opacity-90">
                {new Date(post.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'az-AZ', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{postTitle}</h1>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article Content */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: markdownToHTML(postContent) }} />
            </div>
            
            {/* Tags */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{t('blog.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {postCategory}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  BSU
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  SSTCC
                </span>
              </div>
            </div>
            
            {/* Share */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{t('blog.share')}</h3>
              <div className="flex space-x-4">
                <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </button>
                <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </button>
                <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Author Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('blog.author')}</h2>
              <div className="flex items-center mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={post.author_image || '/placeholder/author1.svg'}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{post.author}</h3>
                  <p className="text-gray-600">{authorTitle}</p>
                </div>
              </div>
              <p className="text-gray-700">
                {t('blog.authorDesc')}
              </p>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{t('blog.relatedPosts')}</h2>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="block group">
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <Image 
                            src={relatedPost.image_url}
                            alt={language === 'en' ? relatedPost.title_en : relatedPost.title_az}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                            {language === 'en' ? relatedPost.title_en : relatedPost.title_az}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(relatedPost.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'az-AZ', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-green-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('blog.stayUpdated')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">{t('blog.subscribeDesc')}</p>
          <div className="flex flex-col sm:flex-row w-full max-w-xl mx-auto">
            <input
              type="email"
              placeholder={t('blog.emailPlaceholder')}
              className="px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow mb-2 sm:mb-0"
            />
            <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-r-md hover:bg-green-700 transition-colors sm:w-auto">
              {t('blog.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
