# ResumeReport

A full-stack web application for generating AI-powered interview reports and resume analysis using Google's Generative AI.

## Features

- **User Authentication**: Secure login and registration system
- **Resume Upload & Analysis**: Upload PDF resumes and analyze them using AI
- **Interview Reports**: Generate detailed interview reports with AI assistance
- **File Management**: Handle PDF uploads and processing
- **Modern UI**: Built with React, Tailwind CSS, and Vite

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Google Generative AI** for AI-powered analysis
- **JWT** for authentication
- **Multer** for file uploads
- **PDF-parse** for resume processing
- **Puppeteer** for web scraping (if needed)

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons
- **Sass** for additional styling

## Project Structure

```
ResumeReport/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middlewares/
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/
    │   │   └── interview/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Google AI API key

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` (Frontend)
2. Register a new account or login
3. Upload a resume PDF for analysis
4. Generate interview reports using the AI service

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Interview
- `POST /api/interview/upload` - Upload resume
- `POST /api/interview/generate-report` - Generate interview report

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.