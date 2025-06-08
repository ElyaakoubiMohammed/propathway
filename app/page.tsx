import Link from "next/link"
import { ArrowRight, Briefcase, GraduationCap, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Discover Your Perfect <span className="text-purple-600 dark:text-purple-400">Career Path</span>
                </h1>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  Find personalized career recommendations and explore current job opportunities tailored to your
                  skills, interests, and preferences.
                </p>
                <div className="mt-10">
                  <Link href="/preferences">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white"
                    >
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://static.vecteezy.com/ti/vecteur-libre/p1/174133-recherche-d-emploi-dans-le-journal-vectoriel.jpg"
                  alt="Career exploration illustration"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
              How Career Pathfinder Works
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Share Your Preferences</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tell us about your skills, interests, and location preferences to help us understand what you're
                  looking for.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Briefcase className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Get Career Suggestions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive personalized career path recommendations based on your unique profile and preferences.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <MapPin className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Explore Job Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Browse through current job and internship listings that match your career path and location
                  preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-purple-600 dark:bg-purple-800 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Find Your Dream Career?</h2>
            <p className="text-xl text-purple-100 dark:text-purple-200 mb-10 max-w-3xl mx-auto">
              Start your journey today and discover career paths that align with your passions and strengths.
            </p>
            <Link href="/preferences">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold bg-white text-purple-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-purple-700 dark:hover:bg-white"
              >
                Start Exploring Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
