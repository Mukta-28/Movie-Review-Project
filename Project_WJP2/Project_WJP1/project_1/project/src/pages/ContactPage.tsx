import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // Honeypot field
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-medium text-white mb-2">{question}</h3>
    <p className="text-gray-300">{answer}</p>
  </div>
);

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    if (data.website) return;
    try {
      await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error("Failed to send feedback. Please try again.");
    }
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Have questions or feedback? We'd love to hear from you. Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              Whether you have a question about our platform, need help, or want to provide feedback, we're here to assist.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Our Location</h3>
                  <address className="not-italic mt-1 text-gray-300">
                    101 Film City Road<br />
                    Near Bollywood Dreams Studio<br />
                    Goregaon East, Mumbai 400065<br />
                    Maharashtra, India
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Email Us</h3>
                  <p className="mt-1 text-gray-300">
                    <a href="mailto:info@cinereview.com" className="text-red-600 hover:text-red-400">
                      info@cinereview.com
                    </a>
                  </p>
                  <p className="mt-1 text-gray-300">
                    <a href="mailto:support@cinereview.com" className="text-red-600 hover:text-red-400">
                      support@cinereview.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Call Us</h3>
                  <p className="mt-1 text-gray-300">
                    <a href="tel:+15551234567" className="text-red-600 hover:text-red-400">
                    +91 98765 43210
                    </a>
                  </p>
                  <p className="mt-1 text-gray-400">Mon–Fri: 9am–5pm PST</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-red-600 hover:text-white transition">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" aria-label="Twitter" className="text-red-600 hover:text-white transition">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" aria-label="Instagram" className="text-red-600 hover:text-white transition">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gray-900 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot */}
                <input type="text" className="hidden" {...register('website')} />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <input
                    id="name"
                    disabled={isSubmitting}
                    type="text"
                    className={`w-full px-3 py-2 border ${errors.name ? 'border-accent-600' : 'border-gray-700'} rounded-md focus:ring-2 focus:ring-red-600 bg-black text-gray-200`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="text-accent-600 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    id="email"
                    disabled={isSubmitting}
                    type="email"
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-accent-600' : 'border-gray-700'} rounded-md focus:ring-2 focus:ring-red-600 bg-black text-gray-200`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && <p className="text-accent-600 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                  <input
                    id="subject"
                    disabled={isSubmitting}
                    type="text"
                    className={`w-full px-3 py-2 border ${errors.subject ? 'border-accent-600' : 'border-gray-700'} rounded-md focus:ring-2 focus:ring-red-600 bg-black text-gray-200`}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && <p className="text-accent-600 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    disabled={isSubmitting}
                    rows={5}
                    className={`w-full px-3 py-2 border ${errors.message ? 'border-accent-600' : 'border-gray-700'} rounded-md focus:ring-2 focus:ring-red-600 bg-black text-gray-200`}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 20,
                        message: 'Message must be at least 20 characters',
                      },
                    })}
                  ></textarea>
                  {errors.message && <p className="text-accent-600 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? <>Sending...</> : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Visit Our Office</h2>
          <div className="bg-gray-800 p-2 rounded-lg shadow-md h-96 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109168.2562253487!2d72.6814015972656!3d19.114714900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9bf0628a9e1%3A0x655f4077e15252a0!2sCentre%20for%20Development%20of%20Advanced%20Computing!5e1!3m2!1sen!2sin!4v1749412449688!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <ul className="space-y-6 max-w-2xl mx-auto">
            <li className="bg-gray-900 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-2">Can I delete a review I've posted?</h3>
              <p className="text-gray-300">Yes, go to your profile, find the review, and click the delete option.</p>
            </li>
            <li className="bg-gray-900 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-2">How do I report inappropriate content?</h3>
              <p className="text-gray-300">Email support@cinereview.com.</p>
            </li>
            <li className="bg-gray-900 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-2">Can I suggest a movie to be added?</h3>
              <p className="text-gray-300">Yes! Email info@cinereview.com with subject "Movie Suggestion".</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
