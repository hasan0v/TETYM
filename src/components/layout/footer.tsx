import Link from 'next/link'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface IconProps {
  className?: string
}

const footerNavigation = {
  main: [
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Tələbələr', href: '/students' },
    { name: 'Layihələr', href: '/projects' },
    { name: 'Nailiyyətlər', href: '/achievements' },
    { name: 'Klublar', href: '/clubs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Əlaqə', href: '/contact' },
    { name: 'Haqqında', href: '/about' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.017 0C8.396 0 7.971.01 6.77.058 2.786.306.306 2.786.058 6.77.01 7.971 0 8.396 0 12.017s.01 4.046.058 5.247c.248 3.984 2.728 6.464 6.712 6.712 1.201.048 1.626.058 5.247.058s4.046-.01 5.247-.058c3.984-.248 6.464-2.728 6.712-6.712.048-1.201.058-1.626.058-5.247s-.01-4.046-.058-5.247C23.728 2.786 21.248.306 17.264.058 16.063.01 15.638 0 12.017 0zm0 2.158c3.556 0 3.978.01 5.383.058 1.3.058 2.009.271 2.478.452.623.242 1.067.531 1.532.996.465.465.754.909.996 1.532.181.469.394 1.178.452 2.478.048 1.405.058 1.827.058 5.383s-.01 3.978-.058 5.383c-.058 1.3-.271 2.009-.452 2.478a4.135 4.135 0 01-.996 1.532 4.135 4.135 0 01-1.532.996c-.469.181-1.178.394-2.478.452-1.405.048-1.827.058-5.383.058s-3.978-.01-5.383-.058c-1.3-.058-2.009-.271-2.478-.452a4.135 4.135 0 01-1.532-.996 4.135 4.135 0 01-.996-1.532c-.181-.469-.394-1.178-.452-2.478-.048-1.405-.058-1.827-.058-5.383s.01-3.978.058-5.383c.058-1.3.271-2.009.452-2.478.242-.623.531-1.067.996-1.532a4.135 4.135 0 011.532-.996c.469-.181 1.178-.394 2.478-.452 1.405-.048 1.827-.058 5.383-.058z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M12.017 5.838a6.179 6.179 0 100 12.358 6.179 6.179 0 000-12.358zM12.017 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props: IconProps) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">TETYM</span>
                <span className="text-sm text-gray-300">
                  Tələbə Elmi Texniki Yaradıcılıq Mərkəzi
                </span>
              </div>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Gələcəyin texnologiyalarını bugündən öyrənin. TETYM-də tələbələr innovativ layihələr hazırlayır, 
              texniki bacarıqlarını inkişaf etdirir və karyera yollarını formalaşdırır.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Səhifələr</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.main.slice(0, 4).map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Digər</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.main.slice(4).map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Əlaqə</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-center space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-300">
                      Bakı şəhəri, Azərbaycan
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-300">
                      +994 XX XXX XX XX
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-300">
                      info@tetym.az
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex items-center justify-between">
            <p className="text-xs leading-5 text-gray-400">
              &copy; 2025 TETYM. Bütün hüquqlar qorunur.
            </p>
            {/* <p className="text-xs leading-5 text-gray-400 flex items-center">
              <HeartIcon className="h-4 w-4 text-red-500 mr-1" />
              ilə hazırlanmışdır
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
