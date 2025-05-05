import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBuildingBank,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-base-100 h-[calc(100vh-5.6rem)] flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-base-content">
          Welcome to the Loan Prediction System
        </h1>
        <p className="mt-4 text-lg text-base-content/60">
          Get instant insights into your loan eligibility using AI-powered
          analysis.
        </p>
        <img
          src="https://storage.googleapis.com/kaggle-datasets-images/1532161/2528751/eeb3d0606808e08a302255d11288c077/dataset-cover.jpg?t=2021-08-15-19-03-15"
          className="rounded-xl mt-6 mx-auto shadow-lg"
        />
        <Link href="/login" className="btn btn-primary mt-6">
          Get Started
        </Link>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="p-20 bg-base-200 h-[calc(100vh-5.6rem)] flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-2 text-primary">
              Instant Prediction
            </h3>
            <p>
              Use our AI model to get real-time loan approval status based on
              your details.
            </p>
          </div>
          <div className="card bg-base-100 shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-2 text-primary">
              Track History
            </h3>
            <p>
              Logged-in users can view their past predictions and monitor their
              progress.
            </p>
          </div>
          <div className="card bg-base-100 shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-2 text-primary">
              User-Friendly
            </h3>
            <p>
              Simple, intuitive interface designed for everyone—no finance
              knowledge needed.
            </p>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="p-20 bg-base-100 h-[calc(100vh-5.6rem)]">
        <h2 className="text-3xl font-semibold text-center mb-10">
          About the Project
        </h2>
        <div className="md:flex items-center gap-6">
          <div className="md:w-1/2">
            <img
              src="https://kinsta.com/wp-content/uploads/2021/11/about-us-page-1200x675.png"
              alt="About"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <p className="text-base-content/70 text-base leading-loose">
              This project is built using Flask, TailwindCSS, DaisyUI, and
              MongoDB. It predicts whether a user is eligible for a loan based
              on input criteria using a trained machine learning model (Decision
              Tree Classifier). The system stores user history, supports
              login/signup, and provides a seamless experience on all devices.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className="p-20 bg-base-200 h-[calc(100vh-5.6rem)] flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-3xl font-semibold text-center mb-10">Contact Us</h2>
        <div className="md:w-2/3 mx-auto bg-base-300 p-6 rounded-xl shadow-md border">
          <form>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </div>
            <textarea
              placeholder="Message"
              className="textarea textarea-bordered w-full mt-4"
              defaultValue={""}
            />
            <button type="submit" className="btn btn-primary mt-4">
              Send Message
            </button>
          </form>
        </div>
      </section>
      <footer className="footer sm:footer-horizontal text-neutral-content p-10 bg-base-300">
        <aside>
          <Link
            href="/"
            className="text-2xl font-bold flex items-center py-2 rounded-lg hover:bg-base-200 transition-colors duration-300"
          >
            <IconBuildingBank size={56} className="text-secondary mx-2" />
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-baseline gap-[2px]">
                <span className="text-primary font-extrabold text-xl">
                  Loan
                </span>
                <span className="text-accent font-semibold text-xl">
                  Predictor
                </span>
              </div>
              <hr className="w-full border border-base-content" />
              <span className="text-sm text-base-content/70 italic">
                Har sapne ke liye ek loan – Asaan, Tez, Vishwas ke saath.
              </span>
            </div>
          </Link>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <IconBrandTwitter size={24} className="text-primary" />
            </a>
            <a>
              <IconBrandYoutube size={24} className="text-primary" />
            </a>
            <a>
              <IconBrandFacebook size={24} className="text-primary" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}
