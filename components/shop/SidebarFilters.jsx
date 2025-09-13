"use client";

const SidebarFilters = ({ categories, selectedCategories, toggleCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-52 pr-6 hidden lg:block">
        <h4 className="font-semibold text-lg mb-4">Categories</h4>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="accent-black"
              />
              {category}
            </label>
          ))}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button onClick={onClose}>✕</button>
            </div>

            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="accent-black"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarFilters;
