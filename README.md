# Lingo

Lingo is a modern language learning platform designed to provide an interactive and engaging experience for users wanting to learn new languages. The project is built using cutting-edge technologies including Next.js 14, PostgreSQL, Drizzle ORM, TypeScript, Tailwind CSS, and Stripe for payment processing. Admin users have the capability to manage courses, units, lessons, and challenges.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly interface for language learning
- Course management for admin users
  - Add, update, and delete courses, units, lessons, and challenges
- Secure payment processing with Stripe
- Responsive design with Tailwind CSS
- Type-safe code with TypeScript
- Data management with PostgreSQL and Drizzle ORM

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Language:** TypeScript
- **Payment Processing:** Stripe

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/prathibha97/lingo.git
   cd lingo

2. **Clone the repository:**
    ```sh
   git npm install

3. **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following environment variables:
    ```sh
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    DRIZZLE_DATABASE_URL=
    STRIPE_API_KEY=
    STRIPE_PUBLISHABLE_KEY=
    STRIPE_WEBHOOK_SECRET=
    NEXT_PUBLIC_APP_URL=

4. **Run database migrations:**
    ```sh
    npx drizzle-kit push

5. **Start the development server:**
    ```sh
    npm run dev
The app should now be running on http://localhost:3000.

## Usage

Once the server is running, you can access the following features:

- **User Interface:** Interact with language learning courses, complete lessons, and take on challenges.
- **Admin Interface:** Log in as an admin and navigate to `/admin` to manage courses, units, lessons, and challenges.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE` for more information.