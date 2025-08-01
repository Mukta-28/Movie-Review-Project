import React from 'react';
import { Film, Users, Star, TrendingUp, Github, Linkedin, Mail } from 'lucide-react';
import shankarImg from '../images/shankar.jpeg';
import kalyaniImg from '../images/kalyani.png';
import muktaImg from '../images/imagemukta.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white hover:text-red-600 transition-colors duration-300">
            About CineReview
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Your trusted platform for honest movie reviews and ratings. Join our community of passionate movie lovers.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="md:w-1/2 text-center md:text-left mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-4">
              At CineReview, we believe in amplifying every movie lover's voice.
              We aim to build a space where opinions flourish, discoveries happen, and films connect us.
            </p>
            <p className="text-lg text-gray-300">
              From casual viewers to die-hard cinephiles, everyone belongs here.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-72 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Movie theater"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white text-lg font-semibold">Connecting Movie Lovers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose CineReview?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Film />, title: 'Extensive Library', text: 'Explore our vast collection of movies across genres and eras.' },
              { icon: <Star />, title: 'Honest Reviews', text: 'Read and write real reviews from genuine movie fans.' },
              { icon: <Users />, title: 'Vibrant Community', text: 'Engage with like-minded movie enthusiasts.' },
              { icon: <TrendingUp />, title: 'Discover Films', text: 'Find trending and hidden gems tailored to your taste.' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl shadow text-center hover:shadow-md transition">
                <div className="flex justify-center mb-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    {React.cloneElement(item.icon, { className: "h-8 w-8 text-emerald-600" })}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300 text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Shankar Parab",
                role: "Full Stack Developer",
                img: shankarImg,
                desc: "Passionate about building scalable web applications and modern user experiences.",
                github: "https://github.com/shankarparab1810",
                linkedin: "https://www.linkedin.com/in/shankarparab18/",
                email: "parabshankar1810@gmail.com"
              },
              {
                name: "Mukta Wagh",
                role: "Full Stack Developer",
                img: muktaImg,
                desc: "Curious learner who enjoys building full-stack web apps and exploring new technologies.",
                github: "https://github.com/Mukta-28",
                linkedin: "https://www.linkedin.com/in/mukta-wagh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                email: "mukta3725@gmail.com"
              },
              {
                name: "Kalyani Pujari",
                role: "Full Stack Developer",
                img: kalyaniImg,
                desc: "Enjoys working on both frontend and backend, and learning new technologies.",
                github: "https://github.com/Kalyanipujari",
                linkedin: "https://www.linkedin.com/in/kalyani-pujari-458726189",
                email: "pujarikalyanii93@gmil.com"
              }
            ].map((member, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-xl shadow text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 aspect-square">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover object-center rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-red-600 mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4">{member.desc}</p>
                <div className="flex justify-center space-x-4 mt-2">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-300 hover:text-white transition">
                    <Github className="h-6 w-6" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href={`mailto:${member.email}`} aria-label="Email" className="text-gray-300 hover:text-white transition">
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-xl mb-8 text-gray-300">Start sharing your voice and discover movies like never before.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
            >
              Sign Up Now
            </a>
            <a
              href="/movies"
              className="px-8 py-3 border-2 border-white rounded-md text-white font-semibold hover:bg-white/10 transition"
            >
              Explore Movies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
