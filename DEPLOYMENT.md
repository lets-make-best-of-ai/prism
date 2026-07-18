# Deployment Guide - Prism Equity Partners

## Quick Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

This will:
- Ask you to authenticate with Vercel
- Detect Next.js automatically
- Build and deploy in seconds
- Provide you with a live URL

### Option 2: Using GitHub Integration (Recommended for teams)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Prism landing page"
git remote add origin https://github.com/YOUR-USERNAME/prism-equity.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Enable Auto-Deployments**
   - Every push to `main` branch automatically deploys
   - Preview URLs created for pull requests

## Environment Variables (Optional)

Create a `.env.local` file for development:

```env
NEXT_PUBLIC_SITE_URL=https://prism-equity.com
```

## Performance Optimization

The site is already optimized for production:

- ✅ Image optimization via Next.js Image component (future use)
- ✅ CSS-in-JS with Tailwind for minimal bundle
- ✅ Code splitting with dynamic imports
- ✅ Preconnect to Google Fonts
- ✅ Semantic HTML for better SEO
- ✅ Mobile-first responsive design

## Domain Configuration

After deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domain (e.g., `prism-equity.com`)
4. Update DNS records at your domain registrar:

**For root domain (`prism-equity.com`):**
- Type: A
- Name: @
- Value: 76.76.19.21

**For www subdomain (`www.prism-equity.com`):**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

## SSL/HTTPS

- Automatically provisioned by Vercel
- No additional configuration needed
- Valid SSL certificate included

## Analytics & Monitoring

### Vercel Analytics (Built-in)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Vercel Web Vitals
```bash
npm install web-vitals
```

## Rollback

If issues occur after deployment:

1. Go to Vercel project dashboard
2. Click "Deployments"
3. Find the previous stable deployment
4. Click the three dots menu
5. Select "Promote to Production"

## Local Testing Before Deploy

```bash
# Build the project
npm run build

# Start production server
npm start

# Visit http://localhost:3000
```

## Common Issues

### Build failures
- Check Node.js version: `node -v` (should be 18+)
- Clear cache: `rm -rf .next && npm run build`
- Check console for specific errors

### Slow deployment
- First deploy may take 2-3 minutes
- Subsequent deploys are usually 30-60 seconds
- Turbopack compilation is optimized

### Custom domain not working
- Allow 24-48 hours for DNS propagation
- Verify DNS records are correctly set
- Check Vercel domain settings

## Monitoring Production

Vercel provides:
- **Real-time logs**: `vercel logs`
- **Performance analytics**: Dashboard
- **Error tracking**: Automatic integration
- **Edge function monitoring**: If used

## Post-Deploy Checklist

- [ ] Visit the deployed URL
- [ ] Test all CTA buttons
- [ ] Verify form submissions
- [ ] Check mobile responsiveness
- [ ] Test smooth scrolling links
- [ ] Verify images and fonts load
- [ ] Check Core Web Vitals
- [ ] Test on different browsers

## Updates & Maintenance

```bash
# Make changes locally
# Then push to GitHub (or deploy directly)

git commit -am "Update: [description]"
git push origin main

# Vercel automatically redeploys
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs
