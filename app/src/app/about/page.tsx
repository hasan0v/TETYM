'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const { t, language } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('about.pageTitle')}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('about.pageSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('about.ourMissionTitle')}</h2>
              <p className="text-lg text-gray-600 mb-4">
                {t('about.ourMissionParagraph1')}
              </p>
              <p className="text-lg text-gray-600">
                {t('about.ourMissionParagraph2')}
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full md:w-1/2 relative h-80">
              <Image 
                src="/placeholder/mission-image.svg" 
                alt={t('about.ourMissionTitle')} 
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row-reverse items-center gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('about.ourHistoryTitle')}</h2>
              <p className="text-lg text-gray-600 mb-4">
                {t('about.ourHistoryParagraph1')}
              </p>
              <p className="text-lg text-gray-600">
                {t('about.ourHistoryParagraph2')}
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full md:w-1/2 relative h-80">
              <Image 
                src="/placeholder/history-image.svg" 
                alt={t('about.ourHistoryTitle')} 
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.ourTeamTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('about.ourTeamSubtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Team Member 1 */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="/placeholder/team-1.svg" 
                  alt="Dr. Nadir Aliyev" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. Nadir Aliyev</h3>
                <p className="text-sm text-gray-500 mb-3">{t('about.directorTitle')}</p>
                <p className="text-gray-600">
                  {t('about.teamMember1Bio')}
                </p>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="/placeholder/team-2.svg" 
                  alt="Dr. Leyla Mammadova" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. Leyla Mammadova</h3>
                <p className="text-sm text-gray-500 mb-3">{t('about.researchDirectorTitle')}</p>
                <p className="text-gray-600">
                  {t('about.teamMember2Bio')}
                </p>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="/placeholder/team-3.svg" 
                  alt="Kamran Hasanov" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Kamran Hasanov</h3>
                <p className="text-sm text-gray-500 mb-3">{t('about.innovationLeadTitle')}</p>
                <p className="text-gray-600">
                  {t('about.teamMember3Bio')}
                </p>
              </div>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div variants={itemVariants} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="/placeholder/team-4.svg" 
                  alt="Sabina Ahmadova" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Sabina Ahmadova</h3>
                <p className="text-sm text-gray-500 mb-3">{t('about.studentEngagementTitle')}</p>
                <p className="text-gray-600">
                  {t('about.teamMember4Bio')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Stat 1 */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-80">{t('about.statStudents')}</div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl opacity-80">{t('about.statInnovations')}</div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-5xl font-bold mb-2">12</div>
              <div className="text-xl opacity-80">{t('about.statClubs')}</div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-5xl font-bold mb-2">25+</div>
              <div className="text-xl opacity-80">{t('about.statAwards')}</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.contactTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('about.contactSubtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Address */}
            <motion.div variants={itemVariants} className="text-center p-6 rounded-lg bg-gray-50">
              <div className="mb-4 inline-block p-4 rounded-full bg-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('about.address')}</h3>
              <p className="text-gray-600">
                {t('about.addressLine1')}<br />
                {t('about.addressLine2')}<br />
                {t('about.addressLine3')}
              </p>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="text-center p-6 rounded-lg bg-gray-50">
              <div className="mb-4 inline-block p-4 rounded-full bg-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('about.email')}</h3>
              <p className="text-gray-600">info@bsusttc.edu.az</p>
              <p className="text-gray-600">innovations@bsusttc.edu.az</p>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="text-center p-6 rounded-lg bg-gray-50">
              <div className="mb-4 inline-block p-4 rounded-full bg-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('about.phone')}</h3>
              <p className="text-gray-600">+994 12 539 0900</p>
              <p className="text-gray-600">+994 12 539 0901</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
