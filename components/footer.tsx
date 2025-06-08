import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ProPathway</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Helping you discover the perfect career path tailored to your skills and interests.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ElyaakoubiMohammed"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-elyaakoubi-1b3909243/"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:elyaakoubimohammed1@gmail.com"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/preferences"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Preferences
                </Link>
              </li>
              <li>
                <Link
                  href="/career-suggestions"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Career Suggestions
                </Link>
              </li>
              <li>
                <Link
                  href="/job-listings"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Job Listings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <address className="not-italic text-gray-600 dark:text-gray-300">
              <p>Elyaakoubi Mohammed</p>
              <p>Morocco</p>
              <p className="mt-3">
                <a
                  href="mailto:elyaakoubimohammed1@gmail.com"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  elyaakoubimohammed1@gmail.com
                </a>
              </p>
            </address>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ProPathway. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
