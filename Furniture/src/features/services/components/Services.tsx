import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Wrench,
  Palette,
  Shield,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";
import Container from "@/features/layout/components/Container";
import { BreadCrumb } from "@/features/layout/components/BreadCrumb";

const Services = () => {
  const services = [
    {
      icon: <Truck className="h-8 w-8 text-[#3b5d50]" />,
      title: "Free Delivery & Setup",
      description:
        "Complimentary white-glove delivery and professional setup for orders over $500.",
      features: [
        "Free delivery within 50 miles",
        "Professional assembly",
        "Packaging removal",
        "Room placement",
      ],
      price: "Free on orders $500+",
    },
    {
      icon: <Palette className="h-8 w-8 text-[#3b5d50]" />,
      title: "Interior Design Consultation",
      description:
        "Work with our expert designers to create the perfect space for your lifestyle.",
      features: [
        "1-hour consultation",
        "Room layout planning",
        "Color coordination",
        "Product recommendations",
      ],
      price: "$99 (refundable with purchase)",
    },
    {
      icon: <Wrench className="h-8 w-8 text-[#3b5d50]" />,
      title: "Custom Furniture",
      description:
        "Create unique pieces tailored to your exact specifications and space requirements.",
      features: [
        "Custom dimensions",
        "Material selection",
        "Personalized design",
        "Expert craftsmanship",
      ],
      price: "Quote on request",
    },
    {
      icon: <Shield className="h-8 w-8 text-[#3b5d50]" />,
      title: "Extended Warranty",
      description:
        "Protect your investment with our comprehensive warranty and maintenance services.",
      features: [
        "5-year coverage",
        "Repair services",
        "Replacement parts",
        "Annual maintenance",
      ],
      price: "Starting at $49/year",
    },
    {
      icon: <Clock className="h-8 w-8 text-[#3b5d50]" />,
      title: "Express Delivery",
      description:
        "Need it fast? Our express delivery service gets your furniture to you in 24-48 hours.",
      features: [
        "24-48 hour delivery",
        "Priority handling",
        "Real-time tracking",
        "Flexible scheduling",
      ],
      price: "$99 flat rate",
    },
    {
      icon: <Users className="h-8 w-8 text-[#3b5d50]" />,
      title: "Trade Program",
      description:
        "Special pricing and services for interior designers, contractors, and businesses.",
      features: [
        "Volume discounts",
        "Net pricing",
        "Dedicated support",
        "Project management",
      ],
      price: "Contact for details",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Consultation",
      description:
        "Schedule a free consultation to discuss your needs and preferences.",
    },
    {
      step: "2",
      title: "Design",
      description:
        "Our experts create a customized plan tailored to your space and style.",
    },
    {
      step: "3",
      title: "Selection",
      description:
        "Choose from our curated selection or opt for custom pieces.",
    },
    {
      step: "4",
      title: "Delivery",
      description: "Professional delivery and setup at your convenience.",
    },
  ];
  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="Services" />
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#d8ece4]/50 to-[#b7edd8]/50 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Our Services
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
              From design consultation to delivery and beyond, we provide
              comprehensive services to make your furniture shopping experience
              seamless and enjoyable.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="py-4 transition-shadow duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-4 flex items-center space-x-4">
                      {service.icon}
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4 px-7">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="border-t pt-4">
                      <Badge variant="secondary" className="mb-3">
                        {service.price}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Our streamlined process ensures you get exactly what you need
                with minimal hassle
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3b5d50] text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#3b5d50] py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-xl text-amber-100">
              Schedule your free consultation today and let us help you create
              the perfect space
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent px-8 text-lg text-white hover:bg-white hover:text-[#3b5d50]"
              >
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Services;
