'use client';

import Card from '../ui/Card';
import { useLanguage } from '@/lib/language';

// Placeholder data - in a real app we would fetch from Supabase
const sampleBlogPosts = [
  {
    id: '1',
    title_en: 'New AI Lab Opens at BSU',
    title_az: 'BDU-da Yeni Süni İntellekt Laboratoriyası Açılır',
    content_en: 'We are excited to announce the opening of our state-of-the-art Artificial Intelligence laboratory. This facility includes high-performance computing resources, specialized hardware for machine learning, and collaborative spaces for research teams.',
    content_az: 'Ən müasir Süni İntellekt laboratoriyanın açılışını elan etməkdən məmnunuq. Bu obyektə yüksək performanslı hesablama resursları, maşın öyrənməsi üçün ixtisaslaşdırılmış avadanlıq və tədqiqat qrupları üçün əməkdaşlıq məkanları daxildir.',
    featured_image_url: '/placeholder/blog1.svg',
    created_at: '2025-04-28'
  },
  {
    id: '2',
    title_en: 'BSU Students Win International Hackathon',
    title_az: 'BDU Tələbələri Beynəlxalq Hakatonda Qalib Gəldilər',
    content_en: 'A team of four BSU students took first place at the Global Innovation Hackathon with their project addressing urban mobility challenges using IoT and big data analytics.',
    content_az: 'Dörd BDU tələbəsindən ibarət komanda IoT və böyük verilənlərin analitikasından istifadə edərək şəhər mobillik problemlərini həll edən layihələri ilə Qlobal İnnovasiya Hakatonunda birinci yeri tutdu.',
    featured_image_url: '/placeholder/blog2.svg',
    created_at: '2025-04-15'
  },
  {
    id: '3',
    title_en: 'Research Partnership with Silicon Valley',
    title_az: 'Silicon Valley ilə Tədqiqat Tərəfdaşlığı',
    content_en: 'SSTCC has established a new research partnership with leading tech companies to provide students with internship opportunities and collaborative projects in cutting-edge technology fields.',
    content_az: 'TETYM tələbələrə təcrübə imkanları və ən müasir texnologiya sahələrində birgə layihələr təmin etmək üçün aparıcı texnologiya şirkətləri ilə yeni tədqiqat tərəfdaşlığı qurub.',
    featured_image_url: '/placeholder/blog3.svg',
    created_at: '2025-04-05'
  }
];

export default function BlogSection() {
  const { language } = useLanguage();
  
  return (
    <>
      {sampleBlogPosts.map((post, index) => (
        <Card
          key={post.id}
          title={language === 'en' ? post.title_en : post.title_az}
          description={(language === 'en' ? post.content_en : post.content_az).substring(0, 120) + '...'}
          image={post.featured_image_url}
          link={`/blog/${post.id}`}
          index={index}
        />
      ))}
    </>
  );
}
