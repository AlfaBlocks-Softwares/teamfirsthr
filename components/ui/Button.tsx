import React from "react";
import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center !rounded-xl !text-md !font-medium  focus:!outline-none disabled:!pointer-events-none !h-[50px] hover:!opacity-70",
  {
    variants: {
      variant: {
        primary:
          "!bg-primary !text-secondary !font-bold hover:!text-secondary hover:!bg-primary hover:!border-none",
        secondary:
          "!bg-secondary !text-primary !font-bold !border-2 !border-primary hover:!text-primary hover:!bg-secondary hover:!border-primary",
        muted:
          "!bg-muted !text-muted  hover:!text-muted hover:!bg-muted hover:!border-none",
      },
      size: {
        sm: "!py-2 !px-3",
        md: "!py-2 !px-6",
        lg: "!py-2 !px-8",
        xl: "!py-2 !px-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface Props
  extends Omit<AntButtonProps, "type" | "size" | "variant">,
    VariantProps<typeof buttonVariants> {
  variant?: "primary" | "secondary" | "muted";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      variant,
      size,
      children,
      disabled,
      loading,
      icon,
      onClick,
      htmlType = "button",
      ...props
    },
    ref
  ) => {
    return (
      <AntButton
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        loading={loading}
        icon={icon}
        onClick={onClick}
        htmlType={htmlType}
        {...props}
      >
        {children}
      </AntButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
