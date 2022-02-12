import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Nav = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user.token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  const logoutHandler = () => {
    setUser({ token: undefined });
  };

  return (
    <>
      <nav>
        <div className="container">
          <div className="nav-title">
            <h2>Do-It</h2>
          </div>

          <ul>
            <li>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            {/* <li>
              <Link className="link" to="task">
                Task
              </Link>
            </li> */}
            {(!isLogin && (
              <>
                <li>
                  <Link className="link" to="login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="link" to="register">
                    SignUp
                  </Link>
                </li>
              </>
            )) || (
              <>
                <li onClick={logoutHandler}>Logout</li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
