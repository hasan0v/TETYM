'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/language';
import { motion } from 'framer-motion';

// This would be fetched from Supabase in production
const categories = [
  { value: 'mobile-apps', label_en: 'Mobile Apps', label_az: 'Mobil Tətbiqlər' },
  { value: 'web-platforms', label_en: 'Web Platforms', label_az: 'Veb Platformalar' },
  { value: 'iot', label_en: 'IoT & Hardware', label_az: 'IoT və Avadanlıq' },
  { value: 'ai-ml', label_en: 'AI & Machine Learning', label_az: 'Süni İntellekt və Maşın Öyrənməsi' },
  { value: 'sustainability', label_en: 'Sustainability', label_az: 'Davamlılıq' },
  { value: 'education', label_en: 'Education', label_az: 'Təhsil' },
  { value: 'healthcare', label_en: 'Healthcare', label_az: 'Səhiyyə' },
  { value: 'other', label_en: 'Other', label_az: 'Digər' }
];

export default function SubmitIdeaPage() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [filePreviews, setFilePreviews] = useState<{[key: string]: string}>({});
  
  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      description: '',
      problem: '',
      solution: '',
      target_audience: '',
      technologies: '',
      team_members: '',
      contact_email: '',
      contact_phone: '',
      attachments: [] as File[]
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t('submit.validation.titleRequired')),
      category: Yup.string().required(t('submit.validation.categoryRequired')),
      description: Yup.string().required(t('submit.validation.descriptionRequired')).min(50, t('submit.validation.descriptionMin')),
      problem: Yup.string().required(t('submit.validation.problemRequired')),
      solution: Yup.string().required(t('submit.validation.solutionRequired')),
      contact_email: Yup.string().email(t('submit.validation.emailValid')).required(t('submit.validation.emailRequired')),
      attachments: Yup.array().of(
        Yup.mixed()
          .test('fileSize', t('submit.validation.fileSize'), (value: any) => 
            !value || (value && value.size <= 5000000)
          )
          .test('fileType', t('submit.validation.fileType'), (value: any) =>
            !value || (value && ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type))
          )
      )
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        // This would be replaced with a Supabase submission in production
        console.log('Form values:', values);
        
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setSubmitSuccess(true);
        formik.resetForm();
        setFilePreviews({});
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitError(t('submit.error'));
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    formik.setFieldValue('attachments', [...formik.values.attachments, ...newFiles]);
    
    // Create image previews
    newFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreviews(prev => ({
            ...prev,
            [file.name]: e.target?.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };
  
  const removeFile = (fileName: string) => {
    formik.setFieldValue(
      'attachments', 
      formik.values.attachments.filter(file => file.name !== fileName)
    );
    
    setFilePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[fileName];
      return newPreviews;
    });
  };

  // Render success message after submission
  if (submitSuccess) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('submit.successTitle')}</h2>
            <p className="text-gray-600 mb-8">{t('submit.successMessage')}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {t('submit.submitAnother')}
              </button>
              <a
                href="/"
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('submit.backToHome')}
              </a>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('submit.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('submit.subtitle')}
          </motion.p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {submitError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              </div>
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-6">{t('submit.basicInfo')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                {t('submit.ideaTitle')} *
              </label>
              <input
                id="title"
                type="text"
                {...formik.getFieldProps('title')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
              )}
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                {t('submit.category')} *
              </label>
              <select
                id="category"
                {...formik.getFieldProps('category')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  formik.touched.category && formik.errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{t('submit.selectCategory')}</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {language === 'en' ? category.label_en : category.label_az}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
              )}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-6">{t('submit.ideaDetails')}</h3>
          
          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              {t('submit.briefDescription')} *
            </label>
            <textarea
              id="description"
              rows={3}
              {...formik.getFieldProps('description')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('submit.descriptionPlaceholder')}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">{t('submit.minChars', { count: '50' })}</p>
          </div>
          
          {/* Problem Statement */}
          <div className="mb-6">
            <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
              {t('submit.problemStatement')} *
            </label>
            <textarea
              id="problem"
              rows={3}
              {...formik.getFieldProps('problem')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                formik.touched.problem && formik.errors.problem ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('submit.problemPlaceholder')}
            ></textarea>
            {formik.touched.problem && formik.errors.problem && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.problem}</p>
            )}
          </div>
          
          {/* Solution */}
          <div className="mb-6">
            <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-1">
              {t('submit.proposedSolution')} *
            </label>
            <textarea
              id="solution"
              rows={4}
              {...formik.getFieldProps('solution')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                formik.touched.solution && formik.errors.solution ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('submit.solutionPlaceholder')}
            ></textarea>
            {formik.touched.solution && formik.errors.solution && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.solution}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Target Audience */}
            <div>
              <label htmlFor="target_audience" className="block text-sm font-medium text-gray-700 mb-1">
                {t('submit.targetAudience')}
              </label>
              <input
                id="target_audience"
                type="text"
                {...formik.getFieldProps('target_audience')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('submit.audiencePlaceholder')}
              />
            </div>
            
            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
                {t('submit.technologies')}
              </label>
              <input
                id="technologies"
                type="text"
                {...formik.getFieldProps('technologies')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t('submit.technologiesPlaceholder')}
              />
            </div>
          </div>
          
          {/* Team Members */}
          <div className="mb-8">
            <label htmlFor="team_members" className="block text-sm font-medium text-gray-700 mb-1">
              {t('submit.teamMembers')}
            </label>
            <textarea
              id="team_members"
              rows={2}
              {...formik.getFieldProps('team_members')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={t('submit.teamPlaceholder')}
            ></textarea>
          </div>
          
          <h3 className="text-xl font-semibold mb-6">{t('submit.contactInfo')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Email */}
            <div>
              <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('submit.email')} *
              </label>
              <input
                id="contact_email"
                type="email"
                {...formik.getFieldProps('contact_email')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  formik.touched.contact_email && formik.errors.contact_email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formik.touched.contact_email && formik.errors.contact_email && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.contact_email}</p>
              )}
            </div>
            
            {/* Phone */}
            <div>
              <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
                {t('submit.phone')}
              </label>
              <input
                id="contact_phone"
                type="tel"
                {...formik.getFieldProps('contact_phone')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          {/* File Attachments */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('submit.attachments')}
            </label>
            
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  >
                    <span>{t('submit.uploadFiles')}</span>
                    <input
                      id="file-upload"
                      name="attachments"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">{t('submit.dragDrop')}</p>
                </div>
                <p className="text-xs text-gray-500">{t('submit.allowedFiles')}</p>
              </div>
            </div>
            
            {/* File previews */}
            {formik.values.attachments.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formik.values.attachments.map((file) => (
                  <div key={file.name} className="relative group">
                    <div className="border rounded-lg p-2 h-24 flex flex-col items-center justify-center">
                      {filePreviews[file.name] ? (
                        <img
                          src={filePreviews[file.name]}
                          alt={file.name}
                          className="h-full object-contain"
                        />
                      ) : (
                        <>
                          <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span className="mt-1 text-xs text-gray-500 truncate w-full text-center">{file.name}</span>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.name)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Terms and Submit */}
          <div className="border-t border-gray-200 pt-6">
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                {t('submit.termsText')}
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? t('submit.submitting') : t('submit.submitIdea')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
