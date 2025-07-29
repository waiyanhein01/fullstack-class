import { Card, CardContent } from "@/components/ui/card";
import { Truck, Shield, Headphones, Award } from "lucide-react";

const Benefit = () => {
  return (
    <section className="bg-white pt-16">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none p-6 text-center shadow-sm">
            <CardContent className="space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#cfede0]">
                <Truck className="h-6 w-6 text-[#3b5d50]" />
              </div>
              <h3 className="text-lg font-semibold">Free Delivery</h3>
              <p className="text-sm text-gray-600">
                Free shipping on orders over $500
              </p>
            </CardContent>
          </Card>
          <Card className="border-none p-6 text-center shadow-sm">
            <CardContent className="space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#cfede0]">
                <Shield className="h-6 w-6 text-[#3b5d50]" />
              </div>
              <h3 className="text-lg font-semibold">Quality Guarantee</h3>
              <p className="text-sm text-gray-600">
                5-year warranty on all products
              </p>
            </CardContent>
          </Card>
          <Card className="border-none p-6 text-center shadow-sm">
            <CardContent className="space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#cfede0]">
                <Headphones className="h-6 w-6 text-[#3b5d50]" />
              </div>
              <h3 className="text-lg font-semibold">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Expert customer service team
              </p>
            </CardContent>
          </Card>
          <Card className="border-none p-6 text-center shadow-sm">
            <CardContent className="space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#cfede0]">
                <Award className="h-6 w-6 text-[#3b5d50]" />
              </div>
              <h3 className="text-lg font-semibold">Premium Quality</h3>
              <p className="text-sm text-gray-600">
                Handcrafted with finest materials
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
