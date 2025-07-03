import { assets } from "../assets/assets";
import Tittle from "../components/Tittle";
import Footer from "../components/Footer";
const AboutUs = () => {
  const teamMembers = [
    { name: "Phuớc", image: assets.mem1 },
    { name: "Hoàng", image: assets.mem2 },
    { name: "Tân", image: assets.mem3 },
    { name: "Daden", image: assets.mem4 },
    { name: "Sơn", image: assets.mem5 },
  ];

  return (
    <div className="w-full h-screen">
      {/* Hero section với ảnh làm nền */}
      <div
        className="relative h-6/7 w-full bg-cover bg-center "
        style={{ backgroundImage: `url(${assets.hero_aboutUs})` }}
      >
        {/* Overlay đen mờ */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Nội dung phía trên ảnh */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4 pt-24">
          <h1 className="montserrat-regular text-4xl sm:text-5xl font-bold mb-4">
            Honoring every shade of beauty with care.
          </h1>
          <p className="montserrat-regular max-w-xl text-sm sm:text-base">
            We’re deeply committed to providing high-quality, authentic products
            that not only care for your skin but also celebrate the unique
            beauty that lives in every person. At Evelyn, we believe that beauty
            comes in all shades, and each one deserves to be honored with love
            and care.
          </p>
        </div>
      </div>

      {/* Nội dung our commision */}
      <div className="flex flex-col sm:flex-row justify-between bg-white text-black py-20">
        {/* Left: Text */}
        <div className="w-full sm:w-1/2 flex flex-col justify-around items-start gap-4 max-w-2xl">
          <Tittle text="Our mission" />
          <p className="text-sm sm:text-base md:text-lg">
            At Evelyn Beauty, we believe that true beauty lives in every skin
            tone, every texture, and every individual story. We celebrate the
            diversity of humanity and recognize that each person deserves to
            feel seen, valued, and beautiful in their own way. Our vision is to
            create an inclusive and empowering space where everyone can feel not
            only confident, but also deeply cared for — a space where beauty is
            not defined by trends, but by authenticity and self-expression.
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            We offer authentic, high-quality skincare and cosmetics to help you
            feel confident in your own skin. In a world of trends and filters,
            we focus on what truly matters — real people and real care.
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            More than a beauty brand, we’re a community rooted in trust,
            inclusivity, and self-expression. Because at Evelyn Beauty, beauty
            comes in every shade — and every shade is beautiful.
          </p>
        </div>
        {/* Right: Image */}
        <div className="w-full sm:w-1/2 flex items-center justify-end pr-0">
          <img
            className="h-auto object-contain max-h-[500px] sm:max-h-[600px] md:max-h-[700px] ml-auto"
            src={assets.banner_aboutUs}
            alt="banner about us"
          />
        </div>
      </div>

      {/* giới thiệu thành viên */}
      <div className="bg-white text-black px-4 pb-20 md:px-20">
        {/* Tiêu đề chính */}
        <div className="justify-center mx-auto pb-20">
          <Tittle text={"Our Team"} />
        </div>

        {/* Founder Section */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="text-center">
              <img
                src={assets.shopOwner_aboutUs}
                alt="Evelyn"
                className="w-64 h-auto rounded-md object-cover shadow-md"
              />
              <p className="text-lg font-medium mt-2">Evelyn</p>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Meet our founder</h3>
            <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-800 text-sm md:text-base lg:text-xl">
              “Skincare has always been more than a routine for me — it’s a way
              to slow down and care for myself. I started Evelyn Beauty to share
              that sense of comfort and confidence. With so much noise out
              there, I wanted to create a gentle, honest space where people can
              find real products and feel good in their own skin.”
            </blockquote>
            <p className="mt-4 font-semibold">
              Evelyn
              <span className="font-normal">– Founder of Evelyn Beauty</span>
            </p>
          </div>
        </div>

        {/* Other members section */}
        <div className="mt-20 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold pb-20">
            Meet other members
          </h2>
          <div className="flex flex-wrap justify-around gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover"
                />
                <p className="mt-2 font-medium">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AboutUs;
