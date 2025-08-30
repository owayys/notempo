"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  control: Control;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const PasswordField = ({
  control,
  name,
  label,
  placeholder,
  disabled,
  className,
}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col space-y-2", className)}>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                disabled={disabled}
                placeholder={placeholder}
                type={show ? "text" : "password"}
                {...field}
              />
            </FormControl>
            <Button
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={() => setShow((prev) => !prev)}
              size="icon"
              type="button"
              variant="ghost"
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
