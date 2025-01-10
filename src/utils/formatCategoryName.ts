export const formatCategoryName = (category: string) => {
    return category && category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };