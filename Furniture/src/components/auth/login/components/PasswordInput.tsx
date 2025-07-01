import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={isPasswordVisible ? "text" : "password"}
          data-slot="input"
          className={cn(className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute top-1/2 right-2 -translate-y-1/2 hover:bg-transparent"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          disabled={props.value === "" || props.disabled}
        >
          {isPasswordVisible ? (
            <Icons.EyeIcon className="size-4" />
          ) : (
            <Icons.EyeClosedIcon className="size-4" />
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
