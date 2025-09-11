import { Card, CardContent } from "@/components/ui/card";
import { BreadCrumb } from "@/features/layout/components/BreadCrumb";
import Container from "@/features/layout/components/Container";
import { Users, Award, Leaf, Heart } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-[#3b5d50]" />,
      title: "Quality Craftsmanship",
      description:
        "Every piece is meticulously crafted by skilled artisans using traditional techniques and modern innovation.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-[#3b5d50]" />,
      title: "Sustainable Materials",
      description:
        "We source eco-friendly materials and practice sustainable manufacturing to protect our environment.",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#3b5d50]" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We provide exceptional service from selection to delivery.",
    },
    {
      icon: <Users className="h-8 w-8 text-[#3b5d50]" />,
      title: "Family Business",
      description:
        "Founded as a family business, we maintain personal relationships with every customer.",
    },
  ];

  const team = [
    {
      name: "Wai Yan Hein",
      role: "Founder & CEO",
      image: "../../../../my photo.jpg?height=300&width=300",
      bio: "With 20+ years in furniture design, Yann founded Furniture Shop to bring quality furniture to every home.",
    },
    {
      name: "Wai Yan Hein",
      role: "Head of Design",
      image: "../../../../my photo.jpg?height=300&width=300",
      bio: "Yann leads our design team, creating innovative furniture that combines style with functionality.",
    },
    {
      name: "Wai Yan Hein",
      role: "Quality Manager",
      image: "../../../../my photo.jpg?height=300&width=300",
      bio: "Yann ensures every piece meets our high standards before reaching your home.",
    },
  ];
  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="AboutUs" />
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#d8ece4]/50 to-[#b7edd8]/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                About Furniture Shop
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                For over 25 years, we've been crafting beautiful, functional
                furniture that transforms houses into homes. Our passion for
                quality and design drives everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Our Story
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-600">
                  <p>
                    Founded in 1995 by Wai Yan Hein, Furniture Shop began as a
                    small workshop in the heart of Design City. What started as
                    a passion project to create beautiful, affordable furniture
                    has grown into a trusted name in home furnishing.
                  </p>
                  <p>
                    Our journey has been guided by a simple philosophy: every
                    piece of furniture should be built to last, designed to
                    inspire, and priced to be accessible. We believe that
                    quality furniture shouldn't be a luxury—it should be a
                    standard.
                  </p>
                  <p>
                    Today, we're proud to serve thousands of families across the
                    country, helping them create spaces they love to call home.
                    Our commitment to craftsmanship, sustainability, and
                    customer satisfaction remains as strong as ever.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="../../../../images/house.webp?height=500&width=600"
                  alt="Our Workshop"
                  width={600}
                  height={500}
                  className="rounded-lg object-center shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Our Values
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                These core principles guide every decision we make and every
                piece we create
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="border-none p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">{value.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Meet Our Team
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                The passionate people behind Furniture Shop who make it all
                possible
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {team.map((member, index) => (
                <Card key={index} className="overflow-hidden text-center">
                  <CardContent className="p-0">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="h-64 w-full object-cover"
                    />
                    <div className="space-y-3 p-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="font-medium text-[#3b5d50]">
                        {member.role}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#3b5d50] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 text-center text-white md:grid-cols-4">
              <div>
                <div className="mb-2 text-4xl font-bold md:text-5xl">25+</div>
                <div className="text-amber-100">Years of Experience</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold md:text-5xl">50K+</div>
                <div className="text-amber-100">Happy Customers</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold md:text-5xl">1000+</div>
                <div className="text-amber-100">Products Delivered</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold md:text-5xl">98%</div>
                <div className="text-amber-100">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default AboutUs;
