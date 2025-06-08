"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, BookOpen, CheckCircle, ChevronRight, Lightbulb, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock career data - simulating AI response
const careerSuggestions = {
  technology: [
    {
      title: "Software Developer",
      description: "Design, develop, and maintain software applications and systems.",
      skills: ["JavaScript", "Python", "Problem Solving", "Git", "Agile Methodologies"],
      steps: [
        "Learn programming fundamentals and choose a language to specialize in",
        "Build a portfolio of personal projects",
        "Contribute to open source projects",
        "Apply for entry-level positions or internships",
        "Continue learning through online courses and certifications",
      ],
      growthOutlook: "22% growth expected over the next decade",
    },
    {
      title: "Data Scientist",
      description: "Analyze and interpret complex data to help organizations make better decisions.",
      skills: ["Python", "R", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
      steps: [
        "Develop strong foundation in mathematics and statistics",
        "Learn programming languages like Python or R",
        "Practice with real datasets and Kaggle competitions",
        "Build a portfolio showcasing your data analysis projects",
        "Pursue relevant certifications or advanced degree",
      ],
      growthOutlook: "36% growth expected over the next decade",
    },
    {
      title: "UX/UI Designer",
      description: "Create intuitive, engaging user experiences for websites and applications.",
      skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Figma/Sketch"],
      steps: [
        "Study design principles and user psychology",
        "Learn industry-standard design tools",
        "Create a portfolio showcasing your design process",
        "Seek internships or junior positions",
        "Stay updated with latest design trends and user research methods",
      ],
      growthOutlook: "13% growth expected over the next decade",
    },
  ],
  business: [
    {
      title: "Digital Marketing Specialist",
      description: "Plan and execute marketing campaigns across digital channels.",
      skills: ["SEO", "Social Media Marketing", "Content Creation", "Analytics", "Email Marketing"],
      steps: [
        "Learn digital marketing fundamentals through courses",
        "Get Google Analytics and other relevant certifications",
        "Create sample campaigns for personal or volunteer projects",
        "Build a portfolio showcasing your marketing strategies",
        "Apply for entry-level positions or internships",
      ],
      growthOutlook: "10% growth expected over the next decade",
    },
    {
      title: "Project Manager",
      description: "Plan, execute, and close projects while ensuring they're delivered on time and within budget.",
      skills: ["Leadership", "Organization", "Communication", "Risk Management", "Budgeting"],
      steps: [
        "Develop strong organizational and communication skills",
        "Learn project management methodologies (Agile, Scrum, etc.)",
        "Pursue certifications like PMP or PRINCE2",
        "Gain experience leading small projects",
        "Apply for assistant or junior project manager roles",
      ],
      growthOutlook: "8% growth expected over the next decade",
    },
  ],
  creative: [
    {
      title: "Content Creator",
      description: "Produce engaging content for various platforms including blogs, social media, and video.",
      skills: ["Writing", "Video Production", "Social Media", "SEO", "Audience Engagement"],
      steps: [
        "Develop your writing, video, or audio production skills",
        "Create a personal brand and build an online presence",
        "Start creating content consistently on relevant platforms",
        "Build a portfolio showcasing your best work",
        "Network with others in your niche",
      ],
      growthOutlook: "9% growth expected over the next decade",
    },
    {
      title: "Graphic Designer",
      description: "Create visual concepts to communicate ideas that inspire and inform consumers.",
      skills: ["Adobe Creative Suite", "Typography", "Color Theory", "Layout Design", "Branding"],
      steps: [
        "Learn design principles and software tools",
        "Build a portfolio showcasing various design styles",
        "Take on freelance projects or volunteer work",
        "Network with other designers and potential clients",
        "Apply for junior designer positions",
      ],
      growthOutlook: "3% growth expected over the next decade",
    },
  ],
}

export default function CareerSuggestionsPage() {
  const router = useRouter()
  const [userPreferences, setUserPreferences] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      try {
        const storedPreferences = localStorage.getItem("userPreferences")

        if (!storedPreferences) {
          setError("No preferences found. Please complete the preferences form first.")
          setLoading(false)
          return
        }

        const preferences = JSON.parse(storedPreferences)
        setUserPreferences(preferences)

        // Determine which career category to show based on interests
        // This is a simple mock implementation - a real AI would do more sophisticated matching
        const interestsLower = preferences.interests.toLowerCase()
        let selectedCareers: any[] = []

        if (
          interestsLower.includes("code") ||
          interestsLower.includes("program") ||
          interestsLower.includes("develop") ||
          interestsLower.includes("tech")
        ) {
          selectedCareers = [...careerSuggestions.technology]
        }

        if (
          interestsLower.includes("business") ||
          interestsLower.includes("market") ||
          interestsLower.includes("manage")
        ) {
          selectedCareers = [...selectedCareers, ...careerSuggestions.business]
        }

        if (
          interestsLower.includes("design") ||
          interestsLower.includes("creat") ||
          interestsLower.includes("art") ||
          interestsLower.includes("writ")
        ) {
          selectedCareers = [...selectedCareers, ...careerSuggestions.creative]
        }

        // If no specific matches, provide a mix of suggestions
        if (selectedCareers.length === 0) {
          selectedCareers = [
            careerSuggestions.technology[0],
            careerSuggestions.business[0],
            careerSuggestions.creative[0],
          ]
        }

        setSuggestions(selectedCareers)
        setLoading(false)
      } catch (err) {
        setError("An error occurred while processing your preferences. Please try again.")
        setLoading(false)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleViewJobs = () => {
    router.push("/job-listings")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Analyzing your preferences...</h2>
            <p className="mt-2 text-gray-600">We're finding the best career paths for you</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={() => router.push("/preferences")}>Go to Preferences</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Career Path Suggestions</h1>
            <p className="mt-2 text-gray-600">
              Based on your interests
              {userPreferences?.interests ? ` in ${userPreferences.interests.split(" ").slice(0, 3).join(", ")}` : ""}
              and skills, here are some career paths that might be a great fit for you
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {suggestions.map((career, index) => (
              <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-700">{career.title}</CardTitle>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Key Skills
                    </h4>
                    <ul className="space-y-1">
                      {career.skills.map((skill: string, i: number) => (
                        <li key={i} className="text-gray-600 text-sm flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1 text-purple-400" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center mb-2">
                      <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                      Career Path Steps
                    </h4>
                    <ol className="space-y-1 list-decimal list-inside">
                      {career.steps.map((step: string, i: number) => (
                        <li key={i} className="text-gray-600 text-sm">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {career.growthOutlook}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={handleViewJobs} size="lg" className="bg-purple-600 hover:bg-purple-700">
              View Job Opportunities <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
