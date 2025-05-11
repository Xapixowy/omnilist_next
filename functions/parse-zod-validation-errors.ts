import { ZodError } from 'zod';

export const parseZodValidationErrorsToStringArray = (errors: ZodError): string[] => {
  const flattenErrors = errors.flatten().fieldErrors;
  const errorKeys = Object.keys(flattenErrors);

  return errorKeys.map((key) => {
    const formattedMessages = flattenErrors[key]!.map((error) => error.toLowerCase()).join('; ');

    return `${key}: ${formattedMessages}`;
  });
};
