// import { useState } from 'react';

const questions = [
  {
    question: "You’re asked to design a simple water filtration system for a science project. What excites you most?",
    options: [
      { text: "Understanding the chemical process behind filtration.", stream: "Science" },
      { text: "Planning the cost and materials efficiently.", stream: "Commerce" },
      { text: "Drawing a diagram that looks creative and clean.", stream: "Arts" },
      { text: "Assembling it practically and testing it.", stream: "Vocational" },
    ],
  },
  {
    question: "If 3 workers can complete a task in 12 days, how long will 6 workers take (assuming equal efficiency)?",
    options: [
      { text: "6 days", stream: "Science" },
      { text: "24 days", stream: "Commerce" },
      { text: "9 days", stream: "Arts" },
      { text: "3 days", stream: "Vocational" },
    ],
  },
  {
    question: "You have ₹1,000 and want to maximize profit by selling handmade crafts. What's your first step?",
    options: [
      { text: "Research trending designs online.", stream: "Arts" },
      { text: "Create a budget and pricing strategy.", stream: "Commerce" },
      { text: "Figure out a supply chain for materials.", stream: "Vocational" },
      { text: "Think of an app that helps automate sales.", stream: "Science" },
    ],
  },
  {
    question: "In a debate competition, you are most excited by:",
    options: [
      { text: "Making strong arguments using facts and logic.", stream: "Commerce" },
      { text: "Analyzing the topic with data and presenting proof.", stream: "Science" },
      { text: "Using powerful words and emotional appeal.", stream: "Arts" },
      { text: "Creating a striking presentation.", stream: "Design" },
    ],
  },
  {
    question: "Which of these tasks would you enjoy the most?",
    options: [
      { text: "Solving puzzles and brain teasers.", stream: "Science" },
      { text: "Organizing a charity event with money collection.", stream: "Commerce" },
      { text: "Writing a short story.", stream: "Arts" },
      { text: "Fixing a broken bicycle or fan.", stream: "Vocational" },
    ],
  },
  {
    question: "You are given a blank room. What do you imagine first?",
    options: [
      { text: "The color themes and layout design.", stream: "Design" },
      { text: "The acoustics and lighting setup.", stream: "Science" },
      { text: "How to convert it into a study space.", stream: "Arts" },
      { text: "How to wire and furnish it cheaply.", stream: "Vocational" },
    ],
  },
  {
    question: "What does 'Inflation' mean in economics?",
    options: [
      { text: "Rise in overall prices of goods and services.", stream: "Commerce" },
      { text: "Increase in oxygen in the atmosphere.", stream: "Science" },
      { text: "A balloon getting bigger.", stream: "Arts" },
      { text: "Prices staying stable over time.", stream: "Vocational" },
    ],
  },
  {
    question: "Which subject do you naturally enjoy the most in school?",
    options: [
      { text: "Math or Physics", stream: "Science" },
      { text: "Business Studies or Accounts", stream: "Commerce" },
      { text: "History or Literature", stream: "Arts" },
      { text: "Art or Vocational Craft", stream: "Vocational" },
    ],
  },
  {
    question: "You are managing a group project. What role do you pick?",
    options: [
      { text: "Research and data gathering", stream: "Science" },
      { text: "Budgeting and logistics", stream: "Commerce" },
      { text: "Writing and presenting", stream: "Arts" },
      { text: "Creating models or charts", stream: "Vocational" },
    ],
  },
  {
    question: "If you scored 85% in Math and 55% in English, how would you reflect on it?",
    options: [
      { text: "Think I’m good at numbers – maybe Science/Commerce suits me.", stream: "Science" },
      { text: "Focus on improving communication.", stream: "Arts" },
      { text: "Worry about overall performance.", stream: "Vocational" },
      { text: "Ask how it can help my career plans.", stream: "Commerce" },
    ],
  },
  {
    question: "Which of these statements reflects you the most?",
    options: [
      { text: "I enjoy asking 'why' things work the way they do.", stream: "Science" },
      { text: "I like selling or trading things with friends.", stream: "Commerce" },
      { text: "I love telling stories or drawing.", stream: "Arts" },
      { text: "I prefer working with my hands and tools.", stream: "Vocational" },
    ],
  },
  {
    question: "You’re editing a school magazine. What task do you pick?",
    options: [
      { text: "Proofreading grammar and facts.", stream: "Arts" },
      { text: "Designing the layout and visuals.", stream: "Design" },
      { text: "Creating a finance plan for printing.", stream: "Commerce" },
      { text: "Coordinating the team to get things done.", stream: "Vocational" },
    ],
  },
  {
    question: "What would you choose as a weekend activity?",
    options: [
      { text: "Visit a science museum or tech fest.", stream: "Science" },
      { text: "Watch Shark Tank or a business documentary.", stream: "Commerce" },
      { text: "Attend a drama or writing workshop.", stream: "Arts" },
      { text: "Build a DIY project at home.", stream: "Vocational" },
    ],
  },
  {
    question: "Solve this: If x = 2, what is the value of x² + 3x + 2?",
    options: [
      { text: "12", stream: "Science" },
      { text: "10", stream: "Commerce" },
      { text: "8", stream: "Arts" },
      { text: "14", stream: "Vocational" },
    ],
  },
  {
    question: "You dream of a future where you:",
    options: [
      { text: "Invent something useful for society.", stream: "Science" },
      { text: "Run your own business.", stream: "Commerce" },
      { text: "Become a writer, actor, or artist.", stream: "Arts" },
      { text: "Work with hands and make/build things.", stream: "Vocational" },
    ],
  },
  {
    question: "What is the purpose of a capacitor in an electronic circuit?",
    options: [
      { text: "Store electrical energy", stream: "Science" },
      { text: "Increase voltage", stream: "Commerce" },
      { text: "Convert AC to DC", stream: "Vocational" },
      { text: "Reduce resistance", stream: "Arts" },
    ],
  },
  {
    question: "Which file format is best for preserving image quality on a website?",
    options: [
      { text: "PNG", stream: "Science" },
      { text: "DOCX", stream: "Commerce" },
      { text: "TXT", stream: "Arts" },
      { text: "MP3", stream: "Vocational" },
    ],
  },
  {
    question: "Which language is primarily used for data analysis and statistical computing?",
    options: [
      { text: "Python", stream: "Science" },
      { text: "JavaScript", stream: "Vocational" },
      { text: "HTML", stream: "Arts" },
      { text: "Excel", stream: "Commerce" },
    ],
  },
  {
    question: "Which device is used to measure electrical current?",
    options: [
      { text: "Ammeter", stream: "Science" },
      { text: "Voltmeter", stream: "Commerce" },
      { text: "Thermometer", stream: "Arts" },
      { text: "Barometer", stream: "Vocational" },
    ],
  },
  {
    question: "What does HTML stand for?",
    options: [
      { text: "HyperText Markup Language", stream: "Science" },
      { text: "HighText Machine Language", stream: "Vocational" },
      { text: "Home Tool Markup Language", stream: "Arts" },
      { text: "None of the above", stream: "Commerce" },
    ],
  },
];

export default questions;
