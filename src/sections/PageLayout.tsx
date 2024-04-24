import { Outlet } from "react-router-dom";
import Network from "./Network";

function PageLayout() {
  return (
    <div className="h-full w-full text-center">
      <h2 className="my-10 text-3xl">Choose an Injected Wallet To Connect</h2>
      <Network />
      <div className="flex-center">
        <Outlet />
      </div>
    </div>
  );
}
export default PageLayout;
