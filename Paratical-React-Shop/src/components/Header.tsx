import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-cyan-600 p-4 flex justify-between items-center">
      <nav className=" container mx-auto flex justify-between items-center">
        <h1 className=" text-2xl text-white">Fashion Shop</h1>

        <ul className="text-white lg:flex items-center gap-5 hidden">
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-yellow-300"
                : "text-white hover:text-yellow-300 duration-150"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-yellow-300"
                : "text-white hover:text-yellow-300 duration-150"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-yellow-300"
                : "text-white hover:text-yellow-300 duration-150"
            }
          >
            Cart
          </NavLink>
        </ul>
      </nav>

      {/* for mobile menu icon */}
      <div className="">
        <MenuIcon onClick={handleMenu} className="text-white lg:hidden" />

        <div className="lg:hidden ">
          {isOpen && (
            <ul
              className={`text-white flex flex-col justify-center items-center gap-5 bg-cyan-200 absolute top-0 left-0 w-full h-screen z-10 opacity-90 text-2xl ${
                isOpen ? "transform duration-500 translate-x-0 " : "translate-x-full"
              }`}
            >
              <NavLink
                onClick={handleMenu}
                to="/"
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-300 duration-150"
                }
              >
                Home
              </NavLink>
              <NavLink
                onClick={handleMenu}
                to="/shop"
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-300 duration-150"
                }
              >
                Shop
              </NavLink>
              <NavLink
                onClick={handleMenu}
                to="/cart"
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-300 duration-150"
                }
              >
                Cart
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
