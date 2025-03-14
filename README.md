# SmartNotes

<div align="center">
  <img src="public/vite.svg" alt="SmartNotes Logo" width="100" />
  <h3>Capture Your Ideas with SmartNotes</h3>
  <p>A powerful note-taking app that helps you organize your thoughts, ideas, and tasks in one place.</p>
</div>

## ✨ Features

- **Easy Note Creation** - Create beautiful notes with a rich text editor
- **Organize with Tags** - Keep your notes organized with tags
- **Powerful Search** - Find your notes instantly with our powerful search feature
- **Favorites** - Mark your most important notes as favorites for quick access
- **Color Coding** - Assign colors to notes for visual organization
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **User Authentication** - Secure user authentication with Supabase

## 🛠️ Technologies Used

- **Frontend**
  - React 19
  - TypeScript
  - Vite
  - React Router v7
  - Tailwind CSS v4
  - Lucide React (icons)
  - Zustand (state management)
  - date-fns (date formatting)

- **Backend**
  - Supabase (Authentication, Database)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🚀 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/SmartNotes.git
   cd SmartNotes
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with your Supabase credentials
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

## 📱 Usage

### Creating a New Note
1. Sign in to your account
2. Navigate to "My Notes"
3. Click the "New Note" button
4. Fill in the title, content, and optional tags
5. Click "Save"

### Organizing Notes
- **Tags**: Add tags to your notes for easy categorization
- **Favorites**: Click the star icon to mark a note as favorite
- **Colors**: Assign colors to notes for visual organization

### Searching Notes
- Use the search bar to find notes by title, content, or tags

## 🔒 Authentication

SmartNotes uses Supabase for authentication. Users can:
- Register with email and password
- Sign in with existing credentials
- Reset password (if implemented)

## 🧩 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
│   ├── auth/       # Authentication components
│   ├── layout/     # Layout components
│   ├── notes/      # Note-related components
│   └── ui/         # UI components
├── lib/            # Library code
├── pages/          # Page components
│   └── notes/      # Note-related pages
├── store/          # State management
└── types/          # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the terms of the license included in the repository.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Lucide Icons](https://lucide.dev/)
