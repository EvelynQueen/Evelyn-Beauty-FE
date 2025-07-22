export const categories = [
  { id: "CT002", name: "SKINCARE" },
  { id: "CT001", name: "MAKE UP" },
  { id: "CT003", name: "HAIRCARE" },
];

const CategoryStaff = ({ selected = categories[0].id, onChange }) => {
  const handleClick = (catId) => {
    onChange(catId);
  };

  return (
    <div className="w-full overflow-x-auto pb-10">
      <div className="flex flex-row flex-wrap sm:justify-center items-center gap-2 min-w-full">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={`cursor-pointer flex-shrink-0 px-5 py-2.5 rounded-xl whitespace-nowrap text-sm sm:text-base md:text-lg font-medium transition duration-300 ease-in-out
              ${
                selected === category.id
                  ? "bg-sky-600 text-white shadow"
                  : "bg-blue-50 text-sky-700 hover:bg-blue-100"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryStaff;
