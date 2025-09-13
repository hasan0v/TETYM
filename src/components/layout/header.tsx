'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  BookmarkIcon,
  TrophyIcon,
  SparklesIcon,
  NewspaperIcon,
  PhoneIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Ana Səhifə', href: '/', icon: HomeIcon },
  { name: 'Tələbələr', href: '/students', icon: UserGroupIcon },
  { name: 'Layihələr', href: '/projects', icon: BookmarkIcon },
  { name: 'Nailiyyətlər', href: '/achievements', icon: TrophyIcon },
  { name: 'Klublar', href: '/clubs', icon: SparklesIcon },
  { name: 'Blog', href: '/blog', icon: NewspaperIcon },
  { name: 'Əlaqə', href: '/contact', icon: PhoneIcon },
  { name: 'Haqqında', href: '/about', icon: InformationCircleIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">TETYM</span>
                <span className="text-xs text-gray-600 hidden sm:block">
                  Tələbə Elmi Texniki Yaradıcılıq Mərkəzi
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-indigo-600',
                  pathname === item.href
                    ? 'text-indigo-600'
                    : 'text-gray-700'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Admin Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <div className="border-t pt-4">
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
