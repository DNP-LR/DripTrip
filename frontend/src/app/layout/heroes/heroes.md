
---

## 🏞️ Hero Section with Video Background – Spec

### 🎥 **Background Video**
- Full-width, full-height (`w-full h-screen`)
- Auto-play, loop, muted, plays inline here is the source of the video src/video/heroes.mp4
- Mobile fallback image for performance
- Layer a dark translucent overlay for text visibility:
  - `absolute inset-0 bg-obsidian-black/40` for readability

### 🧾 **Text Content Layer**
Placed in the center, positioned absolutely:

- **Headline**:
  - Text: *Discover Cameroon Like Never Before*
  - Class: `text-white font-bold text-4xl sm:text-6xl md:text-7xl`
  - Animations: `animate-fade-in`, `md:animate-slide-up`

- **Subheadline**:
  - Text: *From cultural wonders to hidden gems—your adventure starts here.*
  - Class: `text`

### 🔍 **Search Bar**
Responsive search section just below headline:
- Inputs:
  - Location input
  - Category dropdown
  - Region dropdown
  - Search button
- Tailwind: `bg-white rounded-full p-3 flex flex-col md:flex-row gap-2 mt-6 shadow-lg`
- Button: `bg-tropical-blue text-white px-6 py-2 rounded-full hover:bg-[#5A9BFD]`

### 🎯 **CTA Button**
Standalone or in search:
- Label: `Start Exploring`
- Class: `bg-tropical-blue text-white px-8 py-3 mt-6 rounded-full hover:bg-[#5A9BFD] transition shadow-md`

### 🔽 **Scroll Prompt**
At bottom center:
- `See how it works ↓`
- Tailwind: 
- Action: Scrolls to “How It Works” section

---

Would you like me to generate a working Tailwind HTML layout for this section next?
