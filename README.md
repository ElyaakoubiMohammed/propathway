
# 🧭 ProPathway — Career Guidance Web Application

A modern career guidance platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**. ProPathway helps users discover career paths, explore job listings, and set their professional preferences — all in a clean, responsive interface.

---

## ✨ Features

- 🎯 **Career Suggestions** — Personalized career path recommendations based on user profile
- 💼 **Job Listings** — Browse and explore relevant job opportunities with loading states for smooth UX
- ⚙️ **User Preferences** — Set and save professional preferences to tailor the experience
- 🌗 **Dark/Light Mode** — Theme switching powered by next-themes
- 📱 **Fully Responsive** — Optimized for all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Package Manager | pnpm |

---

## 📁 Project Structure

```
propathway/
├── app/
│   ├── career-suggestions/   # Career path recommendation page
│   ├── job-listings/         # Job listings with loading state
│   ├── preferences/          # User preferences page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # shadcn/ui component library
│   ├── navbar.tsx            # Navigation bar
│   └── footer.tsx            # Footer
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
└── public/                   # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ElyaakoubiMohammed/propathway.git

# Navigate into the project
cd propathway

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Then open your browser at `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 👨‍💻 Author

**Mohammed Elyaakoubi**  
[GitHub](https://github.com/ElyaakoubiMohammed) · [LinkedIn]([https://www.linkedin.com/in/mohammed-elyaakoubi-1b3909243/])

---

## 📄 License

This project is open source and available for educational and personal use.


