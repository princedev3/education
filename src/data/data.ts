export const courseslist = [
  {
    id: 1,
    name: "Mathematics",
    description: "Covers algebra, geometry, calculus, and statistics.",
    duration: "12 weeks",
    category: "STEM",
    img: "/math.jpg",
  },
  {
    id: 2,
    name: "English Literature",
    description:
      "Explores classic and modern literature, poetry, and writing techniques.",
    duration: "10 weeks",
    category: "Languages",
    img: "/english.jpg",
  },
  {
    id: 3,
    name: "Physics",
    description:
      "Covers mechanics, thermodynamics, electromagnetism, and quantum physics.",
    duration: "14 weeks",
    category: "STEM",
    img: "/physic.jpg",
  },
  {
    id: 4,
    name: "Computer Science",
    description:
      "Introduction to programming, data structures, and algorithms.",
    duration: "16 weeks",
    category: "Technology",
    img: "/comp.jpg",
  },
  {
    id: 5,
    name: "Biology",
    description: "Covers genetics, evolution, microbiology, and ecology.",
    duration: "12 weeks",
    category: "Science",
    img: "/bio.jpg",
  },
  {
    id: 6,
    name: "Chemistry",
    description:
      "Explores organic, inorganic, and physical chemistry concepts.",
    duration: "12 weeks",
    category: "Science",
    img: "/chem.jpg",
  },
  {
    id: 7,
    name: "History",
    description:
      "Covers ancient, medieval, and modern history, including world wars.",
    duration: "10 weeks",
    category: "Humanities",
    img: "/hist.jpg",
  },
  {
    id: 8,
    name: "Economics",
    description:
      "Covers microeconomics, macroeconomics, and market structures.",
    duration: "12 weeks",
    category: "Social Sciences",
    img: "/econmic.jpg",
  },
  {
    id: 9,
    name: "Psychology",
    description:
      "Introduction to human behavior, cognition, and mental health.",
    duration: "12 weeks",
    category: "Social Sciences",
    img: "/pys.jpg",
  },
  {
    id: 10,
    name: "Art & Design",
    description: "Explores drawing, painting, digital design, and aesthetics.",
    duration: "8 weeks",
    category: "Creative Arts",
    img: "/paint.jpg",
  },
];

export const modules = [
  {
    id: 1,
    name: "Module 1: Addition Basics",
    description: "Learn the basics of addition and solve simple problems.",
    tasks: [
      {
        task: "What is 2 + 3?",
        answer: 5,
        userAnswer: "", // User input will go here
      },
      {
        task: "What is 4 + 6?",
        answer: 10,
        userAnswer: "",
      },
    ],
  },
  {
    id: 2,
    name: "Module 2: Subtraction Basics",
    description: "Learn the basics of subtraction and solve simple problems.",
    tasks: [
      {
        task: "What is 5 - 3?",
        answer: 2,
        userAnswer: "",
      },
      {
        task: "What is 10 - 7?",
        answer: 3,
        userAnswer: "",
      },
    ],
  },
  {
    id: 3,
    name: "Module 3: Multiplication Basics",
    description:
      "Learn the basics of multiplication and solve simple problems.",
    tasks: [
      {
        task: "What is 2 x 3?",
        answer: 6,
        userAnswer: "",
      },
      {
        task: "What is 4 x 5?",
        answer: 20,
        userAnswer: "",
      },
    ],
  },
];

// type Course = {
//   id: number;
//   name: string;
//   description: string;
//   duration: string;
//   category: string;
//   img: string;
// };

export const navbarLink = [
  {
    id: "1",
    name: "course",
    path: "/course",
  },
  {
    id: "2",
    name: "contact us",
    path: "/contact",
  },
  {
    id: "3",
    name: "about",
    path: "/about",
  },
];
