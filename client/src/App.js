import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wilder from "./components/Wilder";

const wildersData = [
  {
    name: "Ringo",
    city: "London",
    skills: [
      { title: "JS", votes: 10 },
      { title: "React", votes: 8 },
    ],
  },
  {
    name: "John",
    city: "Paris",
    skills: [
      { title: "PHP", votes: 9 },
      { title: "Symfony", votes: 9 },
    ],
  },
  {
    name: "George",
    city: "Berlin",
    skills: [
      { title: "Ruby", votes: 10 },
      { title: "JS", votes: 8 },
    ],
  },
  {
    name: "Paul",
    city: "Reims",
    skills: [
      { title: "C++", votes: 10 },
      { title: "Rust", votes: 8 },
    ],
  },
];

function App() {
  return (
    <>
      <Header />
      <main className="container pb-8 bg-cream">
        <div className="mt-8">
          {wildersData.map((wilder, idx) => (
            <Wilder name={wilder.name} key={idx} skills={wilder.skills} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
