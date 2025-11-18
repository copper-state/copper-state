import { Award, Users, Heart, Leaf } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Copper State Foods
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about creating premium food products that bring joy and nutrition to your table.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              Copper State Foods was founded with a simple mission: to create the highest quality food products
              using only the finest ingredients. We specialize in crafting delicious popcorn and nutritious sea moss
              water drinks that are both satisfying and good for you.
            </p>
            <p>
              Our commitment to quality starts with sourcing the best ingredients. We work directly with trusted
              suppliers to ensure every product meets our rigorous standards. From our premium popcorn kernels to
              our carefully selected sea moss, every ingredient is chosen with care.
            </p>
            <p>
              At Copper State Foods, we believe that great food should be accessible to everyone. That's why we're
              dedicated to creating products that are not only delicious but also affordable and nutritious.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every product is crafted with care and attention to detail.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Made with Love</h3>
            <p className="text-gray-600">
              Our passion for food shines through in every product we create.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Natural Ingredients</h3>
            <p className="text-gray-600">
              We use only natural, wholesome ingredients in all our products.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Focused</h3>
            <p className="text-gray-600">
              We're committed to supporting our local community and customers.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-3xl">
            To provide premium quality food products that bring families together, support healthy lifestyles,
            and create moments of joy through exceptional taste and nutrition.
          </p>
        </div>
      </div>
    </div>
  );
}

