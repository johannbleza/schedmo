import { Calendar } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white w-full shadow p-4 text-xl font-bold ">
      <Link href="/" className="flex gap-2 items-center max-w-[50rem] mx-auto">
        <Calendar />
        <h1>SchedMo</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
