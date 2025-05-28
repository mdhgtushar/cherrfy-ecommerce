import { NavLink } from "react-router-dom";

const categories = [
  { name: "All", slug: "all" },
  { name: "Men", slug: "men" },
  { name: "Women", slug: "women" },
  { name: "Electronics", slug: "electronics" },
  { name: "Home", slug: "home" },
  { name: "Beauty", slug: "beauty" },
  { name: "Sports", slug: "sports" },
  { name: "Toys", slug: "toys" },
  { name: "Books", slug: "books" },
  { name: "Grocery", slug: "grocery" },
];

const CategoryNav = () => {
  return (
    <nav className="bg-white border-b px-4 md:px-8">
      <div className="container mx-auto flex gap-4 overflow-x-auto no-scrollbar py-3">
        {categories.map((cat) => (
          <NavLink
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className={({ isActive }) =>
              `whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {cat.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default CategoryNav;
