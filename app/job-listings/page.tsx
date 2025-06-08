"use client"

import { useEffect, useState } from "react"
import { ArrowUpDown, Briefcase, Building, Calendar, Filter, Loader2, MapPin, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Job {
  id: string
  url: string
  title: string
  company_name: string
  company_logo: string | null
  category: string
  tags: string[]
  job_type: string
  publication_date: string
  candidate_required_location: string
  salary: string
  description: string
}

export default function JobListingsPage() {
  const [userPreferences, setUserPreferences] = useState<any>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Function to map location IDs to search terms for the API
  const getLocationSearchTerm = (locationId: string): string => {
    const locationMap: Record<string, string> = {
      morocco: "Morocco",
      germany: "Germany",
      usa: "USA",
      uk: "UK",
      canada: "Canada",
      // For "online" or "remote", we don't add a specific location term
    }
    return locationMap[locationId] || ""
  }

  const fetchJobs = async (query: string, locations: string[]) => {
    setLoading(true)
    setError(null)

    try {
      // Build API URL with parameters
      const params = new URLSearchParams()

      // Add search query
      if (query.trim()) {
        params.append("search", query.trim())
      }

      // Set a higher limit to ensure we get enough jobs
      params.append("limit", "100")

      // Construct the API URL
      const apiUrl = `https://remotive.com/api/remote-jobs?${params.toString()}`
      console.log("Fetching jobs from:", apiUrl)

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log(`API returned ${data.jobs?.length || 0} total jobs`)

      if (!data.jobs || !Array.isArray(data.jobs) || data.jobs.length === 0) {
        throw new Error("No jobs found in API response")
      }

      // Process the jobs - we'll do location filtering in the UI
      const processedJobs = data.jobs.map((job: any) => ({
        ...job,
        // Ensure all jobs have the required fields
        id: job.id || `job-${Math.random().toString(36).substr(2, 9)}`,
        url: job.url || "https://remotive.com/remote-jobs/",
        candidate_required_location: job.candidate_required_location || "Worldwide",
        job_type: job.job_type || "full_time",
        tags: job.tags || [],
      }))

      // Store all jobs and let the UI handle filtering
      setJobs(processedJobs)

      // Apply initial location filtering if locations are specified
      if (locations.length > 0) {
        const initialFiltered = filterJobsByLocation(processedJobs, locations)
        setFilteredJobs(initialFiltered)

        // If no jobs match the location filter, show all jobs
        if (initialFiltered.length === 0) {
          console.log("No jobs match the location filter, showing all jobs")
          setFilteredJobs(processedJobs)
        }
      } else {
        setFilteredJobs(processedJobs)
      }

      setLoading(false)
    } catch (err) {
      console.error("Error fetching jobs:", err)
      setError(`Failed to fetch job listings: ${err instanceof Error ? err.message : "Unknown error"}`)

      // Fallback to mock data in case of API failure
      const mockJobs = generateMockJobs(query, locations)
      setJobs(mockJobs)
      setFilteredJobs(mockJobs)

      setLoading(false)
    }
  }

  // Helper function to filter jobs by location
  const filterJobsByLocation = (jobList: Job[], locations: string[]): Job[] => {
    if (locations.length === 0) return jobList

    return jobList.filter((job) => {
      const jobLocation = job.candidate_required_location?.toLowerCase() || ""

      // Check if the job location matches any of the selected locations
      return locations.some((location) => {
        // Special handling for remote/online
        if (location === "online" || location === "remote") {
          return (
            jobLocation.includes("anywhere") ||
            jobLocation.includes("worldwide") ||
            jobLocation.includes("remote") ||
            jobLocation === ""
          )
        }

        // For specific countries, check if the job location contains the country name
        // Make this check more flexible by looking for partial matches
        const locationName = getLocationSearchTerm(location).toLowerCase()
        return (
          jobLocation.includes(locationName) ||
          jobLocation.includes(location) ||
          (location === "usa" &&
            (jobLocation.includes("united states") || jobLocation.includes("america") || jobLocation.includes("us"))) ||
          (location === "uk" &&
            (jobLocation.includes("united kingdom") ||
              jobLocation.includes("britain") ||
              jobLocation.includes("england")))
        )
      })
    })
  }

  // Generate mock job data as a fallback
  const generateMockJobs = (query: string, locations: string[]): Job[] => {
    const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"]
    const companies = [
      "TechCorp",
      "Global Innovations",
      "NextGen Solutions",
      "Digital Frontiers",
      "Creative Minds",
      "Data Insights",
      "Future Technologies",
      "Web Experts",
    ]

    const currentDate = new Date()
    const numberOfJobs = Math.floor(Math.random() * 10) + 15 // 15-25 jobs
    const mockJobs: Job[] = []

    // Create mock jobs for each selected location
    const jobLocations = locations.length > 0 ? locations : ["remote", "morocco", "germany", "usa", "uk", "canada"]

    for (let i = 0; i < numberOfJobs; i++) {
      const daysAgo = Math.floor(Math.random() * 30)
      const postedDate = new Date(currentDate)
      postedDate.setDate(postedDate.getDate() - daysAgo)

      // Assign a location from the selected locations or a random one
      const locationIndex = i % jobLocations.length
      const locationId = jobLocations[locationIndex]

      // Map location ID to a display name
      let jobLocation = ""
      if (locationId === "morocco") jobLocation = "Morocco"
      else if (locationId === "germany") jobLocation = "Germany"
      else if (locationId === "usa") jobLocation = "United States"
      else if (locationId === "uk") jobLocation = "United Kingdom"
      else if (locationId === "canada") jobLocation = "Canada"
      else if (locationId === "online" || locationId === "remote") jobLocation = "Worldwide / Remote"

      let jobTitle = ""
      if (query.toLowerCase().includes("develop") || query.toLowerCase().includes("program")) {
        jobTitle = [
          "Software Developer",
          "Frontend Engineer",
          "Backend Developer",
          "Full Stack Developer",
          "Mobile App Developer",
          "DevOps Engineer",
        ][Math.floor(Math.random() * 6)]
      } else if (query.toLowerCase().includes("data") || query.toLowerCase().includes("analy")) {
        jobTitle = [
          "Data Scientist",
          "Data Analyst",
          "Business Intelligence Analyst",
          "Data Engineer",
          "Machine Learning Engineer",
        ][Math.floor(Math.random() * 5)]
      } else {
        jobTitle = [
          "Software Developer",
          "Data Analyst",
          "UX Designer",
          "Project Manager",
          "Digital Marketing Specialist",
          "Content Creator",
        ][Math.floor(Math.random() * 6)]
      }

      const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)]
      const company = companies[Math.floor(Math.random() * companies.length)]
      const description = `We are seeking a talented ${jobTitle} to join our team. The ideal candidate will have experience in ${query} and a passion for innovation.`

      mockJobs.push({
        id: `job-${i}`,
        title: jobTitle,
        company_name: company,
        company_logo: null,
        category: "",
        tags: [],
        job_type: jobType.toLowerCase().replace(" ", "_"),
        publication_date: postedDate.toISOString(),
        candidate_required_location: jobLocation,
        salary: "",
        url: "https://remotive.com/remote-jobs/",
        description: description,
      })
    }

    return mockJobs
  }

  // Fetch jobs when component mounts or when preferences change
  useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem("userPreferences")

      if (!storedPreferences) {
        // If no preferences found, fetch generic jobs
        fetchJobs("software developer", ["remote"])
        return
      }

      const preferences = JSON.parse(storedPreferences)
      setUserPreferences(preferences)

      // Extract search query from interests and skills
      const searchQuery = `${preferences.interests} ${preferences.skills}`.substring(0, 100)

      // Get selected locations
      const locations = preferences.locations || []
      setSelectedLocations(locations)

      // Fetch jobs based on preferences
      fetchJobs(searchQuery, locations)
    } catch (err) {
      setError("An error occurred while loading your preferences. Using default search parameters.")
      fetchJobs("software developer", ["remote"])
    }
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    if (jobs.length === 0) return

    let filtered = [...jobs]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company_name.toLowerCase().includes(term) ||
          job.category?.toLowerCase().includes(term) ||
          job.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
          job.description?.toLowerCase().includes(term),
      )
    }

    // Apply location filter
    if (selectedLocations.length > 0) {
      filtered = filterJobsByLocation(filtered, selectedLocations)
    }

    // Apply job type filter
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter((job) =>
        selectedJobTypes.some((type) => {
          const jobType = job.job_type?.toLowerCase().replace("_", " ") || "remote"
          return jobType.includes(type.toLowerCase())
        }),
      )
    }

    // Apply sorting
    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime())
    } else if (sortBy === "relevance") {
      // Sort by relevance based on search term matches
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered.sort((a, b) => {
          const aScore =
            (a.title.toLowerCase().includes(term) ? 3 : 0) +
            (a.company_name.toLowerCase().includes(term) ? 2 : 0) +
            (a.category?.toLowerCase().includes(term) ? 1 : 0)
          const bScore =
            (b.title.toLowerCase().includes(term) ? 3 : 0) +
            (b.company_name.toLowerCase().includes(term) ? 2 : 0) +
            (b.category?.toLowerCase().includes(term) ? 1 : 0)
          return bScore - aScore
        })
      }
    }

    setFilteredJobs(filtered)

    // If no jobs match the filters, log a message
    if (filtered.length === 0 && jobs.length > 0) {
      console.log("No jobs match the current filters")
    }
  }, [jobs, searchTerm, selectedLocations, selectedJobTypes, sortBy])

  const handleLocationChange = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
    )
  }

  const handleJobTypeChange = (type: string) => {
    setSelectedJobTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedLocations([])
    setSelectedJobTypes([])
    setSortBy("date")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  const renderDesktopFilters = () => (
    <div className="hidden md:block w-64 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Locations</h3>
          <div className="space-y-2">
            {["Morocco", "Germany", "Online", "USA", "UK", "Canada"].map((location) => (
              <div key={location} className="flex items-center">
                <Checkbox
                  id={`location-${location}`}
                  checked={selectedLocations.includes(location.toLowerCase())}
                  onCheckedChange={() => handleLocationChange(location.toLowerCase())}
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="dark:bg-gray-700" />

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Job Type</h3>
          <div className="space-y-2">
            {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
              <div key={type} className="flex items-center">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedJobTypes.includes(type.toLowerCase())}
                  onCheckedChange={() => handleJobTypeChange(type.toLowerCase())}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="dark:bg-gray-700" />

        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  )

  const renderMobileFilters = () => (
    <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Locations</h3>
            <div className="space-y-2">
              {["Morocco", "Germany", "Online", "USA", "UK", "Canada"].map((location) => (
                <div key={location} className="flex items-center">
                  <Checkbox
                    id={`mobile-location-${location}`}
                    checked={selectedLocations.includes(location.toLowerCase())}
                    onCheckedChange={() => handleLocationChange(location.toLowerCase())}
                  />
                  <Label
                    htmlFor={`mobile-location-${location}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Job Type</h3>
            <div className="space-y-2">
              {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                <div key={type} className="flex items-center">
                  <Checkbox
                    id={`mobile-type-${type}`}
                    checked={selectedJobTypes.includes(type.toLowerCase())}
                    onCheckedChange={() => handleJobTypeChange(type.toLowerCase())}
                  />
                  <Label
                    htmlFor={`mobile-type-${type}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              clearFilters()
              setIsMobileFilterOpen(false)
            }}
          >
            Clear Filters
          </Button>

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Searching for jobs...</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Finding the best opportunities for you</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Listings</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Explore current job opportunities based on your career preferences
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            {renderDesktopFilters()}

            {/* Job Listings */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search jobs by title, company, or keyword"
                      className="pl-9 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setSearchTerm("")}
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <div className="flex items-center">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          <span>Sort by: {sortBy === "date" ? "Date" : "Relevance"}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="relevance">Relevance</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Mobile Filters Button */}
                    {renderMobileFilters()}
                  </div>
                </div>

                {/* Active filters */}
                {(selectedLocations.length > 0 || selectedJobTypes.length > 0) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedLocations.map((location) => (
                      <Badge key={location} variant="secondary" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {location.charAt(0).toUpperCase() + location.slice(1)}
                        <button onClick={() => handleLocationChange(location)}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    ))}

                    {selectedJobTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                        <button onClick={() => handleJobTypeChange(type)}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Results count */}
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              </div>

              {/* Job cards */}
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <Card
                      key={job.id}
                      className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                              <CardTitle className="text-xl text-purple-700 dark:text-purple-300 hover:underline cursor-pointer">
                                {job.title}
                              </CardTitle>
                            </a>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant={job.job_type?.toLowerCase() === "full_time" ? "default" : "secondary"}>
                              {job.job_type?.replace("_", " ") || "Remote"}
                            </Badge>
                            {job.category && <Badge variant="outline">{job.category}</Badge>}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Building className="h-4 w-4 mr-2" />
                            {job.company_name}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            {job.candidate_required_location || "Remote/Anywhere"}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            Posted {formatDate(job.publication_date)}
                          </div>
                          {job.salary && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <span className="font-medium">Salary: {job.salary}</span>
                            </div>
                          )}
                          {job.tags && job.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.tags.slice(0, 5).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
                            {job.description?.replace(/<[^>]*>/g, "").substring(0, 200)}...
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-2">
                        <div className="flex items-center space-x-2">
                          {job.company_logo && (
                            <img
                              src={job.company_logo || "/placeholder.svg"}
                              alt={`${job.company_name} logo`}
                              className="w-8 h-8 rounded object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                              }}
                            />
                          )}
                        </div>
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                            Apply Now
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No jobs found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search filters or try a different search term.
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
