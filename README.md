# Kōrero Muriwai

An interactive digital storybook prototype developed for the **Te Whakatōhea – Te Muriwai** project at the **University of Waikato**.

The prototype presents stories connected with **Te Muriwai, the Mātaatua waka, Te Whakatōhea, and important places and concepts** through interactive storytelling, Māori vocabulary, audio pronunciation, place-based learning, and learning activities.

---

## 📖 Project Overview

**Kōrero Muriwai** is a child-friendly interactive web prototype designed to help primary-school-aged tamariki engage with local history and cultural knowledge.

The project focuses on presenting the story content in a way that is:

- Simple and easy for children to understand
- Visually engaging
- Interactive
- Child-friendly
- Supportive of Māori language learning
- Connected to important local places
- Respectful of cultural knowledge

The central design principle of the project is:

> **We are not changing the story. We are changing how children experience it.**

---

## 🎯 Target Audience

The primary audience is **primary-school-aged tamariki, around 10 years old**, particularly Te Whakatōhea children who may live outside the Ōpōtiki area.

The prototype uses:

- Short sections of text
- Large readable typography
- Images and visual storytelling
- Simple navigation
- Māori vocabulary
- Audio pronunciation
- Interactive story elements
- Learning activities and quizzes

---

## ✨ Features

### 📚 Interactive Storytelling

The prototype provides two main story experiences.

#### Story 1 — The Mātaatua Waka

This story introduces children to:

- Te Muriwai travelling on the Mātaatua waka
- The Mātaatua waka arriving at Kākahoroa
- The people coming ashore
- The men travelling inland
- The waka beginning to drift away from the shore
- Te Muriwai recognising that someone needs to help

The story is presented through short sections so that children can follow the sequence easily.

### 🌊 Story 2 — Muriwai and the Rāhui

The second story introduces:

- Te Muriwai and her sons
- The sons going to sea
- Te Muriwai's response when they do not return
- The concept of a rāhui
- Te Muriwai's connection with the coast
- Courage, leadership, and cultural values

The story is supported by interactive vocabulary and place-based learning.

### 🔊 Audio Learning

The prototype includes audio to support Māori pronunciation and engagement.

Children can listen to words and phrases including:

- **Muriwai**
- **Mātaatua waka**
- **Kākahoroa**
- **Te Mānuka Tūtahi**
- **Kia whakatāne au i ahau**
- **Rāhui**

Audio controls allow users to listen to individual words or phrases while exploring the content.

### 🗺️ Words & Places

The **Words & Places** section provides additional learning content related to important Māori words and places.

The prototype includes content relating to:

- Kākahoroa
- Te Mānuka Tūtahi
- Ōhiwa
- Ōpōtiki
- Ngā Kuri
- Tihirau
- Wairere
- Toka-irakewa
- Ana Muriwai

Users can select individual items to learn more about their meaning and connection to the project.

### 🎯 Activities

The prototype includes interactive learning activities and quizzes.

The activities allow children to:

- Review the stories
- Test their understanding
- Recall important information
- Reinforce vocabulary
- Reflect on the values presented in the stories

### 🧭 Simple Navigation

The main navigation provides access to:

- **Home**
- **Story**
  - Story 1 — The Mātaatua Waka
  - Story 2 — Muriwai and the Rāhui
- **Words & Places**
- **Activities**

The story dropdown allows users to move directly between the two main story experiences.

---

## 🛠️ Technology Stack

The prototype is built using:

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **HTML5 Audio**
- **CSS**
- **JavaScript / TypeScript**

---

## 📁 Project Structure

```text
muriwai-prototype/
│
├── public/
│   ├── audio/
│   │   ├── Kakahoroa.mp3
│   │   ├── Muriwai.mp3
│   │   ├── Te Mānuka Tūtahi.mp3
│   │   ├── kia whakatane.mp3
│   │   └── mataatua waka.mp3
│   │
│   └── images/
│       ├── Kakahoroa.jpeg
│       ├── ManukaTutahi.jpeg
│       ├── MataatuaWaka.jpg
│       ├── muriwai.png
│       ├── muriwai_smooth_animated.gif
│       └── waka_true_motion_fixed.gif
│
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your computer:

- **Node.js**
- **npm**
- **Git**

Check the installed versions:

```bash
node --version
npm --version
```

### Clone the Repository

```bash
git clone https://github.com/harshal-kalavadiya/muriwai-prototype.git
cd muriwai-prototype
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Vite will display a local development URL in the terminal, for example:

```text
http://localhost:5173/
```

Open the URL in a web browser to use the prototype.

---

## 🏗️ Build the Project

To create a production build:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

### Preview the Production Build

```bash
npm run preview
```

---

## 🎨 Design Approach

The prototype follows a **digital storybook** approach rather than presenting the content as a conventional website.

### Child-Friendly Content

Story information is divided into short sections rather than presenting large blocks of text.

### Visual Storytelling

Images and animations support the written story and help children understand the events being described.

### Simple Navigation

The navigation structure is intentionally simple so that children can move between stories, vocabulary, places, and activities without needing complex instructions.

### Māori Language Support

Important Māori words and phrases are highlighted and supported with audio pronunciation.

### Interactive Learning

Children can explore words, places, story content, and activities rather than only reading static information.

### Consistent Layout

Story pages use a consistent structure so that children can understand how to interact with each page.

---

## 🌿 Cultural Considerations

The prototype was developed as part of the **Te Whakatōhea – Te Muriwai** project.

Cultural content was treated carefully throughout the design and development process.

The prototype follows the project principle:

> **We are not changing the story. We are changing how children experience it.**

The aim is to present the agreed project content in an interactive format rather than rewriting the underlying story.

Where cultural or historical information required clarification, the project relied on the project-provided materials and agreed requirements rather than introducing unverified information.

The cultural content is intended to remain central to the learning experience rather than being presented purely as entertainment.

---

## 🎓 Project Context

This project was developed as part of the **University of Waikato CSMAX570** project.

### Project

**Te Whakatōhea – Te Muriwai**

### Team

**Kōrero Crew — Group 3**

Team members:

- Harshal Kalavadiya
- Linxiao Zhang
- Bobo Zhao
- Fangfei Guo

---

## 🎨 Prototype Development

The project was initially developed as a Figma prototype before being implemented as an interactive React/Vite web prototype.

The development process involved:

1. Understanding the project requirements
2. Reviewing the provided cultural and story materials
3. Developing the initial concept
4. Creating the first prototype
5. Receiving feedback
6. Refining the story structure and navigation
7. Adding interactive vocabulary and place learning
8. Adding audio pronunciation
9. Developing learning activities
10. Implementing the interactive prototype using React and Vite

---

## 📱 Main User Journey

A typical user journey through the prototype is:

```text
Home
  │
  ├── Story
  │     │
  │     ├── Story 1 — The Mātaatua Waka
  │     │
  │     └── Story 2 — Muriwai and the Rāhui
  │
  ├── Words & Places
  │
  └── Activities
          │
          └── Interactive Quizzes
```

---

## 🔮 Future Improvements

Possible future improvements include:

- Adding additional stories
- Expanding Māori pronunciation support
- Adding more interactive activities
- Expanding the Words & Places section
- Adding additional place-based learning
- Improving accessibility
- Adding further visual animations
- Adding more interactive storytelling elements
- Improving responsive behaviour across different devices
- Developing the prototype into a production-ready application

---

## 📚 Project Resources

The project was informed by:

- Project requirements and client discussions
- Project-provided story materials
- Te Whakatōhea curriculum resources
- University of Waikato project guidance
- Feedback received during prototype development

---

## 👥 Team

### Kōrero Crew — Group 3

| Team Member | Contribution |
|---|---|
| Harshal Kalavadiya | Development, design refinement and project coordination |
| Linxiao Zhang | Project team member |
| Bobo Zhao | Project team member |
| Fangfei Guo | Project team member |

---

## 📌 Academic Project

This repository was created for academic project purposes as part of the **University of Waikato CSMAX570** course.

The repository contains the implementation of the interactive prototype developed by the project team.

---

## ⚠️ Content and Asset Usage

Some content, images, audio, and cultural materials used in this project were provided specifically for the academic project.

They may be subject to separate ownership, copyright, cultural permissions, or usage conditions.

Please do not reuse project-specific cultural content, images, audio, or other assets outside the project without appropriate permission.

---

## 📄 Licence

This repository is intended for academic project purposes.

No separate open-source licence is granted for project-specific cultural content, images, audio, or other third-party materials included in the repository.

---

## 🙏 Acknowledgements

We would like to acknowledge the project stakeholders, University of Waikato teaching staff, and the resources provided for the **Te Whakatōhea – Te Muriwai** project.

Their guidance and feedback supported the development and refinement of the prototype.

---

**Kōrero Muriwai — Kōrero Crew | University of Waikato**
