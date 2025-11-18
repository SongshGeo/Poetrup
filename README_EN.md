# Poetry Collage App - Poetrup

**Poetrup** - An elegant Chinese word collection and poetry collage creation application

> 🇨🇳 [中文版](./README.md) | 🇺🇸 English Version (Current)

---

## 📖 About This Project

**Poetry Collage (Poetrup)** is a web application focused on Chinese word collection and poetry collage creation. Users can collect their favorite words, organize them into different collections, and create unique poetry collages through drag-and-drop interactions.

### Core Features

- 📝 **Word Management**
  - Add, edit, and delete words
  - Custom tag categorization
  - Word usage statistics

- 📚 **Collections**
  - Create multiple collections to organize words
  - Support for public, shared, and private visibility
  - Drag words into collections

- ✍️ **Poetry Creation**
  - Visual drag-and-drop creation interface
  - Customize word position, rotation, and color
  - Save and edit works

- 🏷️ **Tag System**
  - Add tags to words for categorization
  - Support for custom tag categories
  - Filter words by tags

- 👤 **User System**
  - User registration and login
  - Personal portfolio management
  - User preferences (saved in profile.metadata)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI component library
- **React DnD** - Drag and drop functionality
- **Sonner** - Toast notifications
- **next-themes** - Theme management

### Backend
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Authentication
  - Storage Buckets
  - Edge Functions (Chinese tokenization)

### Design
- Frontend design from [Poetrupfrontend](https://github.com/SongshGeo/Poetrupfrontend.git)
- Paper texture theme with elegant visual experience

## 🚀 Quick Start

### Prerequisites

1. Node.js 18+ and Yarn
2. Supabase account and project
3. Supabase CLI (for database migrations)

### Installation Steps

#### 1. Clone Repository

```bash
git clone https://github.com/SongshGeo/Poetrup.git
cd Poetrup
```

#### 2. Link Supabase Project

```bash
# Login to Supabase
npx supabase login

# Link to your Supabase project (will prompt to select project)
npx supabase link

# Push config to server
npx supabase config push
```

#### 3. Run Database Migrations

```bash
# Execute all migration files
npx supabase migrations up --linked
```

This will create the following database structure:
- `profiles` - User profiles
- `words` - Words table
- `collections` - Collections table
- `collection_words` - Words-collections junction table
- `poetry` - Poetry works table
- `poetry_collections` - Poetry-collections junction table
- `favorites` - Favorites table

For detailed migration guide, see: [docs/MIGRATION_GUIDE.md](./docs/MIGRATION_GUIDE.md)

#### 4. Configure Environment Variables

Configure in `nextjs/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
PRIVATE_SUPABASE_SERVICE_KEY=your_service_role_key
```

You can find these keys in Supabase Dashboard under `Project Settings` -> `API`.

#### 5. Install Dependencies and Start

```bash
cd nextjs
yarn install
yarn dev
```

Visit http://localhost:3000 🎉

## 📝 Frontend Code Updates

This project integrates frontend design from [Poetrupfrontend](https://github.com/SongshGeo/Poetrupfrontend.git).

**Quick update frontend code:**
```bash
./scripts/update-frontend.sh
```

For detailed update guide, see: [docs/前端更新后同步指南.md](./docs/前端更新后同步指南.md)

## 📚 Project Structure

```
Poetrup/
├── nextjs/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── app/          # Main application pages (poetry)
│   │   │   │   ├── page.tsx              # Main page (word management)
│   │   │   │   └── poetry/               # Poetry-related pages
│   │   │   │       ├── collection/       # Poetry collection
│   │   │   │       └── edit/[id]/       # Edit poetry
│   │   │   └── auth/         # Authentication pages
│   │   ├── components/       # React components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   └── ...           # Business components
│   │   └── lib/              # Utility functions and API
│   │       ├── api/          # Supabase API wrappers
│   │       │   ├── words.ts      # Words API
│   │       │   ├── collections.ts # Collections API
│   │       │   └── poetry.ts    # Poetry API
│   │       └── utils/        # Utility functions
│   └── package.json
├── supabase/                  # Supabase config and migrations
│   ├── migrations/           # Database migration files
│   ├── functions/            # Edge Functions
│   └── config.toml           # Supabase config
├── scripts/                   # Utility scripts
│   └── update-frontend.sh    # Frontend update script
└── docs/                      # Documentation
    ├── MIGRATION_GUIDE.md     # Migration guide
    └── 前端更新后同步指南.md  # Frontend update guide
```

## 🔑 Core Features Explained

### Word Management

- Users can add Chinese words, and the system automatically extracts tags (e.g., `#movie`, `#mood`)
- Words can be associated with multiple tags
- Support for search and filtering

### Collections

- Create collections to organize words
- Support for three visibility levels: private, shared, public
- Add words to collections via drag-and-drop

### Poetry Creation

- Visual creation interface with drag-and-drop words to canvas
- Each word can be positioned, rotated, and colored
- Works are stored in the database as JSONB format

### Data Persistence

All operations are automatically saved to Supabase database:
- Create word → `words` table
- Create collection → `collections` table
- Drag word to collection → `collection_words` table
- Create/edit work → `poetry` table
- Create tag → `profile.metadata.tags`

## 📖 Documentation

- [Database Migration Guide](./docs/MIGRATION_GUIDE.md)
- [Frontend Update Guide](./docs/前端更新后同步指南.md)
- [API Documentation](./nextjs/src/lib/api/README.md)

## 🔒 Security Features

- **Row Level Security (RLS)** - Database row-level security policies
- **User Authentication** - Supabase Auth integration
- **Data Isolation** - Users can only access their own data

## 🚀 Deployment

### Deploy to Vercel

1. Fork or clone the repository
2. Create a project in Vercel and select your repository
3. Paste the contents of `.env.local` into environment variables
4. Click deploy
5. Adjust `site_url` and `additional_redirect_urls` in `supabase/config.toml` (Important: `additional_redirect_urls` should include `https://YOURURL/**`, note the two asterisks)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- Frontend design: [Poetrupfrontend](https://github.com/SongshGeo/Poetrupfrontend.git)

---

**Enjoy creating poetry collages!** 🎨✨

