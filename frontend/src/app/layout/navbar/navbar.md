---

## 🌍 1. Header / Navbar (Updated)

### 🔧 General Behavior

- **Sticky navbar** always at the top of the screen (`sticky top-0 z-50 shadow-md`)
- Responsive design across all breakpoints
- Font color: `text-obsidian-black`, with `hover:text-earthclay` or `hover:text-tropical-blue`
- Dark mode supported with `dark:bg-obsidian-black` and `dark:text-white`

---

### 🔗 Components

#### ✅ **Left Section**

- **Logo** (wordmark + icon) — scales down on mobile

#### ✅ **Main Navigation Menu**

- **Home**
- **Discover**
  - Dropdown:
    - Attractions
    - Cities
    - Regions
- **Plan Trip**
  - Dropdown:
    - Itineraries
    - Budgeting Tools
- **Badges**
  - Dropdown:
    - My Badges
    - How It Works
- **Partners**
  - Dropdown:
    - Hotels
    - Agencies
- **About Us**

> 🧭 *Multi-level dropdowns* expand on hover or click depending on screen size (support for nested `ul` elements in Tailwind with appropriate transitions)

---

### ⚙️ Right Section

#### 🌐 **Language Toggle**

- 🇬🇧 / 🇫🇷 with icon toggle (`EN | FR`)

#### ♿ **Accessibility Menu**

- Font size toggle (A- / A+)
- High contrast mode toggle

#### 🌗 **Dark Mode Toggle**

- Moon ☾ / Sun ☀️ icon
- Tailwind `dark:` classes activated via a toggle switch or system preference

#### 🔔 **Notification Bell**

- Icon with red badge count (for earned badges, new tips, alerts)
- On click: dropdown showing latest 3–5 notifications

#### 👤 **User Profile Menu**

- Avatar icon (auto-fetched from user)
- Dropdown:
  - My Profile
  - Saved Itineraries
  - Settings
  - Logout

#### 📱 **Mobile Hamburger Menu**

- Appears on smaller screens
- Opens full menu with sliding animation
- Dropdowns rendered as expandable accordions

---
