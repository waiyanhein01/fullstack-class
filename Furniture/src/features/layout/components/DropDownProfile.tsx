import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@/types";
import { Icons } from "@/components/Icons";
import { Form, Link } from "react-router";

interface UserProps {
  user: Profile;
}

export function DropdownProfile({ user }: UserProps) {
  const initialsUserName = user?.firstName.charAt(0) + user?.lastName.charAt(0);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="size-10 rounded-full border border-neutral-300 p-0"
        >
          <Avatar>
            <AvatarImage src={user.image} alt={initialsUserName} />
            <AvatarFallback>{initialsUserName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="py-2">
          <DropdownMenuLabel className="leading-1">
            {user.firstName + " " + user.lastName}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-muted-foreground leading-1">
            {user.email ?? "add your email"}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === "ADMIN" && (
            <Link to={"/dashboard"} className="w-full">
              <DropdownMenuItem>
                <Icons.DashboardIcon />
                Dashboard
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </Link>
          )}

          <DropdownMenuItem>
            <Link to={"/change-password"} className="flex items-center gap-2">
              <Icons.PasswordIcon />
              Change Password
              {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Form method="post" action="/logout">
          <button className="w-full">
            <DropdownMenuItem>
              <Icons.LogoutIcon />
              Log out
            </DropdownMenuItem>
          </button>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
