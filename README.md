# Stuck on Blessings

E-commerce website for selling stickers. Built with Next.js, Supabase, and Stripe.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the environment variables in Vercel's dashboard
4. Deploy

Everything (frontend and backend) deploys together on Vercel.

## What You Need

- Supabase account (database and storage)
- Stripe account (payments)
- Vercel account (hosting, optional)

## Admin Access

Admin dashboard at `/admin`. Login required.
