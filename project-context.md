# SriSandang Project Context

## Project Overview
- B2B Custom Clothing & Safety Wear Company
- Main focus: Lead generation and product showcase
- Target: Business clients looking for custom uniforms and safety equipment

## Tech Stack
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)
- Cloudinary (Image Upload)

## Design System
1. Colors:
   - Brand Primary: #00CF61
   - Brand Primary Dark: #00B954
   - Neutrals: 50-900 scale

2. Typography:
   - Display: 52px/56px, 44px/48px
   - Headings: h1(32px), h2(24px), h3(20px)
   - Body: lg(16px), sm(14px)

3. Components:
   - CTA Component (WhatsApp + Catalogue buttons)
   - WhatsApp Button (neutral-900 bg)
   - Catalogue Button (bordered)
   - Logo Component

## Key Features Implemented
1. Admin Panel:
   - Products Management
   - Leads Management
   - Articles Management
   - Testimonials Management

2. Lead Generation:
   - Catalogue Access Form
   - WhatsApp Integration
   - Lead Status Management

3. Public Pages:
   - Custom Clothing
   - Safety Wear
   - Catalogue Access
   - Articles

## Important Business Rules
1. Lead Management:
   - Status: new → contacted → closed
   - Auto-status update on WhatsApp click
   - Panggilan options: Kakak, Bapak, Ibu

2. WhatsApp Template: 
Halo {panggilan} {nama}. Saya Ninda dari Srisandang.
Saya dapat nomor {panggilan} dari website kami.
Jika boleh, mohon di info ke saya kebutuhan baju/merchandise {panggilan} seperti apa? biar saya bantu hitungkan estimasi pembuatan dan harganya


## Next 

Development Focus
- Public Landing Pages
- Product Catalogue
- Article Pages
- Company Profile


## File Structure/src /app /(public) 
# Public pages /admin 
# Admin panel /components /ui 
# Reusable components /layout 
# Layout components /lib /firebase 
# Firebase utilities /stores # State management