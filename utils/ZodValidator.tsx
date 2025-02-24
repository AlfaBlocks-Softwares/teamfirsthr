"use client";
import { ZodSchema, ZodError, ZodTypeDef } from "zod";
import { RuleObject } from "antd/es/form";

interface ZodValidationArgs<T, K extends keyof T> {
  schema: ZodSchema<T, ZodTypeDef, unknown>;
  fieldName: K;
}

export const ZodValidator = <T, K extends keyof T>({
  schema,
  fieldName,
}: ZodValidationArgs<T, K>) => ({
  validator(_: RuleObject, value: unknown) {
    try {
      const objToValidate = { [fieldName]: value } as Pick<T, K>;
      schema.parse(objToValidate);
      return Promise.resolve();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = error.errors.find((e) =>
          e.path.includes(fieldName as string)
        );
        return Promise.reject(fieldError?.message || "Invalid value");
      }
      return Promise.reject("Validation failed");
    }
  },
});
