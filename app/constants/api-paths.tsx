const BASE_URL = 'https://fakestoreapi.com';

export const apiPaths = {
  product: {
    PRODUCT_LIST: `${BASE_URL}/products`,
    SINGLE_PRODUCT: (id: string | number) => `${BASE_URL}/products/${id}`,
    CATEGORY_LIST: `${BASE_URL}/products/categories`,
    CATEGORY_FILTER: (categoryName: string) => `${BASE_URL}/products/category/${categoryName}`,
  },

  user: {
    ALL_USERS: `${BASE_URL}/users`,
  },
};
