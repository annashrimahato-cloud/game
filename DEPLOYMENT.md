# 🚀 Deploy Wordit Game Online

## Option 1: Vercel (Recommended - Free)

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Wordit game"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wordit-game.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure everything

3. **Set Environment Variables**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_AIRTABLE_API_KEY`: `patP1aQd43AqCZpYq.dacc54c446f99bd9f0aff7cea32d4e7e6684b1e7b2dabb2bd11e790e724cd859`
     - `NEXT_PUBLIC_AIRTABLE_BASE_ID`: `appVLi2ogum66Vw6h`

4. **Deploy**
   - Click "Deploy"
   - Your game will be live at `https://your-project.vercel.app`

## Option 2: Netlify (Free)

### Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `.next` folder
   - Or connect your GitHub repository

3. **Set Environment Variables**
   - In Netlify dashboard: Site settings → Environment variables
   - Add the same Airtable credentials

## Option 3: Railway (Paid)

### Steps

1. **Go to [railway.app](https://railway.app)**
2. **Connect GitHub repository**
3. **Set environment variables**
4. **Deploy**

## 🔧 Environment Variables

Make sure these are set in your hosting platform:

```bash
NEXT_PUBLIC_AIRTABLE_API_KEY=patP1aQd43AqCZpYq.dacc54c446f99bd9f0aff7cea32d4e7e6684b1e7b2dabb2bd11e790e724cd859
NEXT_PUBLIC_AIRTABLE_BASE_ID=appVLi2ogum66Vw6h
```

## 📱 Custom Domain

After deployment, you can:
- Add a custom domain in your hosting platform
- Point your domain's DNS to the hosting provider
- Enable HTTPS (usually automatic)

## 🎯 Post-Deployment

1. **Test the game** at your live URL
2. **Verify Airtable integration** works
3. **Share the link** with friends!
4. **Monitor performance** in your hosting dashboard

## 💡 Tips

- **Vercel** is the easiest for Next.js apps
- **Environment variables** are crucial for Airtable to work
- **Custom domains** can be added later
- **Automatic deployments** happen on every Git push
