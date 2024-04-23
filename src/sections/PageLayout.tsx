import { Outlet, useNavigate, Link } from "react-router-dom";

function PageLayout() {
    const navigate = useNavigate();

    return (
        <div className="h-full w-full">
            <div className="text-center my-10 text-2xl">
                <Link to="/">home</Link>
                <span className="mx-4 cursor-pointer" onClick={() => navigate("/about")}>
                    about
                </span>
                <Link to="/login">login</Link>
            </div>
            <div className="flex-center">
                <Outlet />
            </div>
        </div>
    );
}

export default PageLayout;
