# Images Directory

Place your images here for use in the portfolio:

- `profile.jpg` or `profile.png` - Your profile photo (recommended: 800x800px)
- `cv.pdf` - Your CV/Resume file
- Project screenshots/thumbnails

## Image Optimization

All images should be optimized before adding:
- Use modern formats (WebP, AVIF) when possible
- Compress images to reduce file size
- Use appropriate dimensions for display

## Usage

Reference images using Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/images/profile.jpg" 
  alt="Profile" 
  width={800} 
  height={800} 
/>
```

Or directly in the `public` directory:

```html
<img src="/images/profile.jpg" alt="Profile" />
```
