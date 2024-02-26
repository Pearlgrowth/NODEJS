export const createValidationSchema = {
    productName: {
      notEmpty: {
        errorMessage: "the product name can not be empty",
      },
      isString: {
        errorMessage: "product must be a string",
      },
    },
    productDescription: {
      notEmpty: {
        errorMessage: "product description cannot be empty",
      },
    },
  };
  