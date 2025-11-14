/**
 * Validation utility functions
 */

/**
 * Validates if a string is a valid UUID v4
 * @param value - String to validate
 * @returns true if valid UUID v4, false otherwise
 */
export const isValidUUID = (value: string): boolean => {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(value);
};

/**
 * Validates if a value is a positive number
 * @param value - Value to validate
 * @param min - Minimum value (default: 1)
 * @returns true if valid positive number, false otherwise
 */
export const isPositiveNumber = (value: any, min: number = 1): boolean => {
  return typeof value === 'number' && !isNaN(value) && value >= min;
};

/**
 * Validates if a string is not empty
 * @param value - String to validate
 * @returns true if not empty, false otherwise
 */
export const isNotEmpty = (value: string): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validates CreateTransactionDto data
 * @param data - Transaction data to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export const validateTransactionData = (data: {
  userId?: string;
  courseId?: string;
  amount?: any;
  currency?: string;
}): { isValid: boolean; error?: string } => {
  // Check userId
  if (!data.userId || !isNotEmpty(data.userId)) {
    return { isValid: false, error: "User ID is required" };
  }
  if (!isValidUUID(data.userId)) {
    return { isValid: false, error: "User ID must be a valid UUID" };
  }

  // Check courseId
  if (!data.courseId || !isNotEmpty(data.courseId)) {
    return { isValid: false, error: "Course ID is required" };
  }
  if (!isValidUUID(data.courseId)) {
    return { isValid: false, error: "Course ID must be a valid UUID" };
  }

  // Check amount
  if (data.amount === undefined || data.amount === null) {
    return { isValid: false, error: "Amount is required" };
  }
  if (!isPositiveNumber(data.amount, 1)) {
    return { isValid: false, error: "Amount must be a number and at least 1" };
  }

  // Check currency
  if (!data.currency || !isNotEmpty(data.currency)) {
    return { isValid: false, error: "Currency is required" };
  }

  return { isValid: true };
};
