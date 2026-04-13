

## QR Code Generator — Implementation Plan

### Overview
A mobile-first, single-page QR code generator web app for service business owners. No backend — everything runs client-side with localStorage for saving configs.

### Key Dependencies
- `qr-code-styling` — styled QR codes with logo overlay, rounded modules, color customization
- `vite-plugin-pwa` — PWA support with offline capability and Add to Home Screen

### Page Structure (Single Page)

**Top Section — Input & Customization Card**
- URL input (required, validated) + Label input (optional, 40 char max)
- "Try Demo" button that fills sample data, with a clear/reset option
- Collapsible "Customize" accordion containing:
  - Style presets (Classic / Rounded / Branded) as selectable cards
  - Foreground & background color pickers
  - Size slider (200–600px, default 300)
  - Border toggle
  - Logo upload (small image, centered on QR)

**Center Section — Live QR Preview**
- Large, centered QR code that updates live as settings change
- Placeholder state (dashed border + "Enter a URL" message) when no URL
- Label text rendered below QR code
- "Scan me to test" reminder note

**Action Buttons**
- Download PNG, Download SVG, Copy Image, Save to Library
- All styled as a button group below the preview

**Bottom Section — QR Code Library**
- List of saved configs (URL, label, date) from localStorage
- Tap to reload settings into generator
- Delete button per entry, max 20 saved codes

### Routing
- Hash-based routing (`HashRouter`) for GitHub Pages compatibility

### PWA Configuration
- `vite-plugin-pwa` with service worker disabled in dev/preview contexts
- Manifest with app name, icons, standalone display mode
- Guard against iframe/preview host registration

### Design
- Mobile-first (375px primary), scales up for tablet/desktop
- Light background, card-based sections, generous whitespace
- 44px minimum touch targets, no horizontal scroll
- Lucide icons throughout

