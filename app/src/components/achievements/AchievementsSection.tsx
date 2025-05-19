'use client';

import Card from '../ui/Card';
import { useLanguage } from '@/lib/language';

// Placeholder data - in a real app we would fetch from Supabase
const sampleAchievements = [
  {
    id: '1',
    title_en: 'Gold Medal at International Science Olympiad',
    title_az: 'Beynəlxalq Elm Olimpiadasında Qızıl Medal',
    description_en: 'BSU students won gold medal at the International Science Olympiad for their innovative renewable energy solution.',
    description_az: 'BDU tələbələri innovativ bərpa olunan enerji həlli üçün Beynəlxalq Elm Olimpiadasında qızıl medal qazandılar.',
    image_url: '/placeholder/achievement1.svg',
    date_achieved: '2025-03-15'
  },
  {
    id: '2',
    title_en: 'Best Innovation Award',
    title_az: 'Ən Yaxşı İnnovasiya Mükafatı',
    description_en: 'Our Artificial Intelligence research team received the Best Innovation Award at the European Tech Conference.',
    description_az: 'Süni İntellekt tədqiqat qrupumuz Avropa Texnologiya Konfransında Ən Yaxşı İnnovasiya Mükafatını aldı.',
    image_url: '/placeholder/achievement2.svg',
    date_achieved: '2025-01-22'
  },
  {
    id: '3',
    title_en: 'National Science Foundation Grant',
    title_az: 'Milli Elm Fondu Qrantı',
    description_en: 'SSTCC received a major grant for expanding our research facilities and supporting more student projects.',
    description_az: 'TETYM tədqiqat obyektlərimizi genişləndirmək və daha çox tələbə layihəsini dəstəkləmək üçün böyük qrant aldı.',
    image_url: '/placeholder/achievement3.svg',
    date_achieved: '2024-11-05'
  }
];

export default function AchievementsSection() {
  const { language } = useLanguage();
  
  return (
    <>
      {sampleAchievements.map((achievement, index) => (
        <Card
          key={achievement.id}
          title={language === 'en' ? achievement.title_en : achievement.title_az}
          description={language === 'en' ? achievement.description_en : achievement.description_az}
          image={achievement.image_url}
          link={`/achievements/${achievement.id}`}
          index={index}
        />
      ))}
    </>
  );
}
