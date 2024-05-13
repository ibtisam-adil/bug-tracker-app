import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Layout = () => {
  const dispatch = useDispatch();
  const { isLogin, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    !isLogin && navigate("/signin");
  }, [navigate, isLogin]);

  if (loading) {
    return (
      <div className="layout-container">
        <aside className="menu">
          <div className="header">
            <Skeleton width={150} height={40} />
          </div>
          <nav>
            <Skeleton count={3} height={50} />
          </nav>
        </aside>
        <main>
          <Skeleton className="mt-5" count={9} height={70} />
        </main>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <aside className="menu">
        <div className="header">
          <img className="logo" src="./bug1.png" alt="" />
        </div>
        <nav>
          <>
            <div>
              <i className="bx bx-log-out"></i>
              <NavLink to={"/"} className="nav-link">
                Dashboard
              </NavLink>
            </div>
            <div>
              <i className="bx bx-log-in"></i>
              <NavLink to={"/tickets"} className="nav-link">
                Tickets
              </NavLink>
            </div>
            <div className="seprater" />
            <div className="auth-wrap">
              {isLogin && (
                <button
                  className="btn auth-btn"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              )}
            </div>
          </>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
