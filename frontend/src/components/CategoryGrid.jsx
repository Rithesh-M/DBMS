import React from 'react';
import { categories } from '../mock';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';

const CategoryGrid = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse All Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} to={`/search?category=${category.id}`}>
            <Card className="p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              {category.isEducational && (
                <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Educational
                </span>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;