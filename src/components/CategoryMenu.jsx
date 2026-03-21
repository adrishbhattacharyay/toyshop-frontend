function CategoryMenu({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-sm btn-outline-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        📁 {selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </button>
      <ul className="dropdown-menu dropdown-menu-start">
        {categories.map(category => (
          <li key={category}>
            <button
              className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
              style={{ cursor: 'pointer' }}
            >
              {category === 'all' ? '✓ All Categories' : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryMenu