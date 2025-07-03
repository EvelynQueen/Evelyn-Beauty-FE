export const categories = [
  { id: "CT002", name: "SKINCARE" },
  { id: "CT001", name: "MAKE UP" },
  { id: "CT003", name: "HAIRCARE" },
];

const Category = ({ selected = categories[0].id, onChange }) => {
  const handleClick = (catId) => {
    onChange(catId);
  };

  return (
    <div className="w-full overflow-x-auto pb-10">
      <div className="flex flex-row flex-wrap sm:justify-start gap-2 min-w-full">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={`cursor-pointer flex-shrink-0 px-4 py-2 rounded-2xl whitespace-nowrap transition text-sm sm:text-base md:text-lg ${
              selected === category.id
                ? "bg-gray-800 text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
