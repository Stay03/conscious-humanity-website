import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';
import MailingListModal from '../components/common/MailingListModal';
import RetreatImage from '../assets/retreat.webp';
import ChiImage from '../assets/ChiImage.webp';
import VisionImage from '../assets/cu.webp';
import BrotherIshmaelImage from '../assets/brother-ishmael.webp';

const AboutUsPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isMailingListModalOpen, setIsMailingListModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // --- Handlers ---
  const handleBecomeMemberClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      console.log("User is already logged in.");
      // navigate('/profile');
    }
  };

  const handleMakeDonationClick = () => {
    navigate('/donate');
  };

  const handleJoinMailingListClick = () => {
    setIsMailingListModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // navigate('/welcome'); 
  };

  const handleCloseMailingListModal = () => {
    setIsMailingListModalOpen(false);
  };

  return (
    <div className="w-full bg-white">
      {/* --- Hero Section (without the text) --- */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Background image with overlay */}
        <img 
          src={RetreatImage} 
          alt="Retreat" 
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* --- Vision Statement Section --- */}
      <div className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              We believe in the Vision of World Peace in our lifetime. We are dedicated to the creation of the teachings and tools to make World Peace happen
            </h1>
          </div>
        </div>
      </div>

      {/* --- CHI Section --- */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left side - Image */}
          <div className="md:w-1/2">
            <div className="max-w-sm mx-auto">
              <img 
                src={ChiImage}
                alt="Conscious Humanity" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
          
          {/* Right side - Text */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Conscious Humanity Inc. (CHI) is…</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              A Movement for World Peace in Our Lifetime.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our Goal is to create a peaceful world by fostering Conscious Humanitarians. People who seek to promote peace and human welfare. CHI has discovered that to achieve World Peace we must first achieve inner peace. So you are the solution to creating a world in harmony.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              CHI offers time-tested programs and tools that transform and uplift lives. These are rooted in <em>The Laws of Nature</em> as revealed to Brother Ishmael Tetteh, African Indigenous Spiritual Leader and Mystic. CHI has spent years making the teachings of Brother Ishmael accessible for you to discover your purpose, unlock your potentials and be empowered; ultimately, bringing you to Peace. You can only be in harmony with others, when you are in at Peace with yourself.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Additionally, CHI works together with our sister organizations Etherean Missions, Ghana and UK, to get our message out – World Peace in our Lifetime. We invite you to join our movement and become a Conscious Humanitarian who stands for Peace, Harmony and a world that supports the highest good for all.
            </p>
          </div>
        </div>
      </div>

      {/* --- Vision & Mission Section --- */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left side - Text */}
            <div className="lg:w-3/5">
              <div className="mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Our Vision & Mission
                </h2>
                <div className="w-20 h-1 bg-green-600"></div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Our Vision
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A world of proactive, creative, conscious people, who know their life's purpose, and have activated their hidden potentials, while celebrating and supporting the betterment of the planet. We are committed to bring about World Peace and the celebration of life by providing Nature-based tools that awaken individuals to the power, peace and purpose already within themselves.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Our Mission
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We believe that all conflicts and other human incapacities result from the lack of knowledge of the Self and the loss of awareness of our uniqueness. Thus, not being able to celebrate and embrace diversity, nor ourselves. This inability creates a sense of separation, giving birth to fear, anger, depression, doubt, loneliness, anxiety, hopelessness etc.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    In turn, these negativities create a destructive civilization that sabotages and destroys itself through injustice, intolerance, war, conflict, and marginalization, with a desire to have power over instead of 'power with'.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Our Commitment
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We are committed to the creation of a world that is for the betterment and upliftment of all lives. CHI provides transformative tools and teachings that can be used to enrich one's life, create harmonious relationships, and uplift others.
                  </p>
                  <p className="text-lg font-medium text-gray-900 italic">
                    We are here to create a world of Conscious Humanitarians who live harmoniously and work for the greater good of life.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    The World We Envision
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We see a world where every person is accepted, supported, nurtured and expresses their innate potentials. Thus creating a world that honors and celebrates each person's uniqueness and works for the highest good of all.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="lg:w-2/5">
              <div className="max-w-md mx-auto">
                <img 
                  src={VisionImage}
                  alt="Our Vision and Mission" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Our Inspiration Section (News Article Format) --- */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white">
            {/* News Article Header */}
            <header className="mb-12 pb-8 border-b-2 border-gray-200">
              <div className="text-center space-y-6">
                <div className="flex justify-center items-center space-x-4">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded">
                    Our Inspiration
                  </span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-serif">
                   Brother Ishmael Tetteh
                </h1>
                
                <h2 className="text-xl md:text-2xl text-gray-600 font-normal leading-relaxed max-w-3xl mx-auto">
                  African Mystic and Business Leader Dedicates Life to World Peace Through Ancient Wisdom
                </h2>
                
               
              </div>
            </header>

            {/* Hero Image with Caption */}
            <figure className="mb-12">
              <div className="relative">
                <img 
                  src={BrotherIshmaelImage}
                  alt="Brother Ishmael Tetteh" 
                  className="w-full h-96 md:h-[500px] object-cover object-top rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg"></div>
              </div>
              <figcaption className="mt-4 text-center text-sm text-gray-600 italic">
                Brother Ishmael Tetteh, renowned African indigenous spiritual leader and mystic, 
                has dedicated over 40 years to spreading his message of world peace across continents.
              </figcaption>
            </figure>

            {/* Article Content */}
            <div className="space-y-8">
              {/* Lead Paragraph with Drop Cap */}
              <div className="text-lg leading-relaxed text-gray-800">
                <span className="float-left text-7xl font-bold text-amber-600 leading-none mr-3 mt-1 font-serif">B</span>
                <strong>rother Ishmael Tetteh is a Renowned African, Indigenous, Spiritual Leader and Mystic</strong> whose 
                International presence and message of World Peace for over 40 years has empowered thousands from Africa, 
                to Europe, and to the United States of America. Brother Ishmael Tetteh is a businessman turned Spiritual Leader. 
                He was the former founder and CEO of the 3rd largest computer company in Ghana and now the leader of one of Ghana's 
                most forward thinking spiritual organization.
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-6 text-lg leading-relaxed text-gray-800">
                <p>
                  Brother Ishmael has devoted his life to the transformation of human consciousness through the principles of nature. 
                  He has spent his lifetime studying, observing and learning from Nature. From this study he uncovered the source of 
                  human suffering and found solutions. He discovered Laws of Nature that govern us. From this ancient wisdom that was 
                  revealed to him, he developed tools and technologies that show us how to live harmonious lives; filled with joy, 
                  purpose and peace. His goal is to bring indigenous teachings and nature's principles of empowerment to 1% of the 
                  world's population which will be the tipping point for world peace.
                </p>

                <p>
                  To reach this goal, Brother Ishmael has opened multiple centers of spiritual empowerment. He founded the Etherean 
                  Mission in Accra, Ghana which now has 3 locations across Ghana. Etherean Mission then expanded to UK with a branch 
                  opening in London. Conscious Humanity Inc., located in Los Angeles, CA is the United States branch for the teachings 
                  of Brother Ishmael. He is also the author of over 30 books for personal growth and spiritual development. He has 
                  trained over 30 Mystics and Naturopathic practitioners in the Laws of Nature and principles of healing to further 
                  his message of Peace, Power and Purpose.
                </p>

                <p>
                  Brother Ishmael's teachings are transforming lives globally. He has appeared is such films as "Ghetto Physics" and 
                  "Three Magic Words". He is featured weekly on Ghana's Crystal TV. Additionally, he and his mystics are showcased 
                  2 days a week on the UK based radio program, The Hour od Awakening and Empowerment on Akwantufuo Radio. Moreover, 
                  Bro. Ishmael's charismatic presence has graced many podiums around the world. From the New Thought Allaince in 
                  South Africa, to the Association for Global New Thought in Italy, to many USA and UK centers and organizations. 
                  Those who know Brother Ishmael enjoy the magnificence of his spirit and warm, loving presence. His truths and 
                  teachings are filled with divine wisdom and healing, which move people deeply and bring profound transformation.
                </p>

                <p>
                  He believes that future peace lies in the children of today. In his movement for world peace, he established the 
                  Omanye Foundation providing educational grants to nurture the spirit if children and creates a program specifically 
                  for parents, caregivers and teachers called "Growing the Empowered Child™". Growing the Empowered Child™ is designed 
                  to raise children without anger or fear, who are able to recognize and celebrate the uniqueness of themselves and of 
                  every other person they encounter. These programs support children to grow into adults dedicated to Peace and the 
                  betterment of humanity.
                </p>

                <p>
                  No matter what he has accomplished, Brother Ishmael Tetteh has had one focus to wake people up to Truth of who and 
                  what they are, to discover why you are here, find the hidden blocked potentials and activate them all through learning 
                  and utilizing the Laws of Nature. Until each of us is as Peace with ourselves we cannot have peace in the world. 
                  Brother Ishmael teaches:
                </p>

                {/* Quote Section */}
                <blockquote className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
                  <p className="text-xl italic text-gray-800 leading-relaxed mb-4">
                    "You did not bring yourself here on Earth nor did you come here from some place. You emerged from the wholeness of Life. 
                    What the wholeness of Life is, is what you are and what it is seeking to do is what you are here to do. Life exists only 
                    for itself and is working for its absolute success."
                  </p>
                  <cite className="text-amber-700 font-semibold">— Brother Ishmael Tetteh</cite>
                </blockquote>

                <p className="text-xl font-medium text-amber-700 italic text-center">
                  And it is working through you for its success!
                </p>
              </div>


            
            </div>
          </article>
        </div>
      </div>

      {/* --- Call to Action Section --- */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Conscious Humanity Movement! And Be at Peace</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Sign Up to be a Conscious Humanitarian!</h3>
            
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto mb-10">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">With your free membership you will receive:</h4>
              <ul className="text-left space-y-3 text-lg text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Free Empowerment Download</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Access to our Online Wellness Center</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Brother Ishmael Tetteh's Tour Dates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">Inspiration and Transformation Delivered to Your Inbox</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">+</span>
                  <span className="italic">And More</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleBecomeMemberClick} 
                className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Become a Member
              </button>
              <button  
                onClick={handleMakeDonationClick}
                className="px-8 py-3 bg-white text-green-600 font-medium rounded-md border border-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Make a Donation
              </button>
              <button  
                onClick={handleJoinMailingListClick}
                className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Join Our Mailing List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Render AuthModal --- */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onAuthSuccess={handleAuthSuccess}
        initialTab="register"
      />

      {/* --- Render MailingListModal --- */}
      <MailingListModal 
        isOpen={isMailingListModalOpen}
        onClose={handleCloseMailingListModal}
      />
    </div>
  );
};

export default AboutUsPage;