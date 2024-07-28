import Link from "next/link";
import { auth } from "../auth";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
  const session = await auth();
  return (
    <div className=" grid grid-cols-8">
      <div className="grid-cols-4 border-r shadow h-screen p-2">
        <Link
          className="p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition w-[120px] block "
          href={`/dashboard/user/${session?.user.id}`}>
          User Profile
        </Link>
      </div>
      <div className="col-span-4">{props.children}</div>
    </div>
  );
};

export default DashBoardLayout;
