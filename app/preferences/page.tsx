"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  interests: z.string().optional(),
  skills: z.string().optional(),
  jobType: z.string().min(1, { message: "Please select a job type" }),
  locations: z.array(z.string()).min(1, { message: "Please select at least one location" }),
  experience: z.string().min(1, { message: "Please select your experience level" }),
})

const locations = [
  { id: "morocco", label: "Morocco" },
  { id: "germany", label: "Germany" },
  { id: "online", label: "Remote/Online" },
  { id: "usa", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "canada", label: "Canada" },
]

const interestSuggestions = [
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Content Creation",
  "Social Media Marketing",
  "SEO/SEM",
  "E-commerce",
  "Project Management",
  "Business Analysis",
  "Financial Analysis",
  "Sales",
  "Customer Service",
  "Human Resources",
  "Healthcare",
  "Education",
  "Research",
  "Writing & Editing",
]

const skillSuggestionsByInterest: { [key: string]: string[] } = {
  "Web Development": ["JavaScript", "React", "Node.js", "HTML/CSS", "TypeScript", "Vue.js", "Angular", "Python", "PHP"],
  "Mobile App Development": ["React Native", "Flutter", "Swift", "Kotlin", "Java", "Xamarin", "Ionic"],
  "Data Science": ["Python", "R", "SQL", "Pandas", "NumPy", "Matplotlib", "Tableau", "Power BI", "Excel"],
  "Machine Learning": ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLTK"],
  "UI/UX Design": ["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "InVision", "Principle"],
  "Digital Marketing": [
    "Google Analytics",
    "Google Ads",
    "Facebook Ads",
    "SEO",
    "Content Marketing",
    "Email Marketing",
  ],
  "Project Management": ["Agile", "Scrum", "Jira", "Trello", "Asana", "MS Project", "Slack"],
  Cybersecurity: ["Network Security", "Penetration Testing", "Risk Assessment", "Compliance", "Incident Response"],
  "Cloud Computing": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
  DevOps: ["Docker", "Kubernetes", "Jenkins", "Git", "CI/CD", "Linux", "Bash"],
}

export default function PreferencesPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      skills: "",
      jobType: "",
      locations: [],
      experience: "",
    },
  })

  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([])

  useEffect(() => {
    const allSuggestedSkills = selectedInterests.flatMap((interest) => skillSuggestionsByInterest[interest] || [])
    const uniqueSkills = [...new Set(allSuggestedSkills)]
    setSuggestedSkills(uniqueSkills)
  }, [selectedInterests])

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests((prev) => [...prev, customInterest.trim()])
      setCustomInterest("")
    }
  }

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()])
      setCustomSkill("")
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Validate that user has selected at least some interests or skills
    if (selectedInterests.length === 0 && !values.interests?.trim()) {
      form.setError("interests", { message: "Please select at least one interest or add a custom one" })
      return
    }

    if (selectedSkills.length === 0 && !values.skills?.trim()) {
      form.setError("skills", { message: "Please select at least one skill or add a custom one" })
      return
    }

    setIsSubmitting(true)

    // Combine selected interests with custom text
    const allInterests = [...selectedInterests, values.interests].filter(Boolean).join(", ")

    // Combine selected skills with custom text
    const allSkills = [...selectedSkills, values.skills].filter(Boolean).join(", ")

    const enhancedValues = {
      ...values,
      interests: allInterests,
      skills: allSkills,
      selectedInterests,
      selectedSkills,
    }

    // Store form data in localStorage for use in other pages
    localStorage.setItem("userPreferences", JSON.stringify(enhancedValues))

    // Simulate a brief loading state
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/career-suggestions")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tell Us About Yourself</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Help us understand your preferences to find the perfect career path for you
            </p>
          </div>

          <Card className="shadow-lg animate-fadeIn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Your Career Preferences</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Fill out this form to get personalized career recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white">Interests</FormLabel>

                        {/* Interest Suggestions */}
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {interestSuggestions.map((interest) => (
                              <button
                                key={interest}
                                type="button"
                                onClick={() => handleInterestToggle(interest)}
                                className={`p-2 text-sm rounded-md border transition-colors ${
                                  selectedInterests.includes(interest)
                                    ? "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {interest}
                              </button>
                            ))}
                          </div>

                          {/* Selected Interests Display */}
                          {selectedInterests.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {selectedInterests.map((interest) => (
                                <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                                  {interest}
                                  <button
                                    type="button"
                                    onClick={() => handleInterestToggle(interest)}
                                    className="ml-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-0.5"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Custom Interest Input */}
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add custom interest..."
                              value={customInterest}
                              onChange={(e) => setCustomInterest(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomInterest())}
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <Button type="button" variant="outline" onClick={handleAddCustomInterest}>
                              Add
                            </Button>
                          </div>

                          {/* Additional text area for more details */}
                          <FormControl>
                            <Textarea
                              placeholder="Describe any additional interests or provide more details..."
                              className="resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              {...field}
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white">Skills</FormLabel>

                        <div className="space-y-3">
                          {/* Suggested Skills based on interests */}
                          {suggestedSkills.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Suggested skills based on your interests:
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {suggestedSkills.map((skill) => (
                                  <button
                                    key={skill}
                                    type="button"
                                    onClick={() => handleSkillToggle(skill)}
                                    className={`p-2 text-sm rounded-md border transition-colors ${
                                      selectedSkills.includes(skill)
                                        ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300"
                                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    }`}
                                  >
                                    {skill}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Selected Skills Display */}
                          {selectedSkills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {selectedSkills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="flex items-center gap-1 border-green-300 dark:border-green-700"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => handleSkillToggle(skill)}
                                    className="ml-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-0.5"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Custom Skill Input */}
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add custom skill..."
                              value={customSkill}
                              onChange={(e) => setCustomSkill(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomSkill())}
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <Button type="button" variant="outline" onClick={handleAddCustomSkill}>
                              Add
                            </Button>
                          </div>

                          {/* Additional text area for more details */}
                          <FormControl>
                            <Textarea
                              placeholder="List any additional skills or provide more details..."
                              className="resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              {...field}
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-white">Preferred Job Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="internship">Internship</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 dark:text-white">Experience Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="entry">Entry Level</SelectItem>
                              <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                              <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                              <SelectItem value="senior">Senior (5+ years)</SelectItem>
                              <SelectItem value="executive">Executive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="locations"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-gray-900 dark:text-white">Preferred Locations</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {locations.map((location) => (
                            <FormField
                              key={location.id}
                              control={form.control}
                              name="locations"
                              render={({ field }) => {
                                return (
                                  <FormItem key={location.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(location.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, location.id])
                                            : field.onChange(field.value?.filter((value) => value !== location.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer text-gray-700 dark:text-gray-300">
                                      {location.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Get Career Suggestions"}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
