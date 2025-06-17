import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Home, Moon, Search, SquarePlus, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div className="bg-card text-card-foreground fixed right-1/2 bottom-10 flex translate-x-1/2 items-center gap-1 rounded-xl border px-2 py-2 shadow-sm">
      <Button size="icon" className="size-12" variant="ghost">
        <Home />
      </Button>
      <Button size="icon" className="size-12" variant="ghost">
        <Search />
      </Button>
      <Button size="icon" className="size-12" variant="ghost">
        <SquarePlus />
      </Button>
      <Button size="icon" className="size-12" variant="ghost">
        <User />
      </Button>
      <div className="bg-border h-[30px] w-[1.5px]" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-12">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
