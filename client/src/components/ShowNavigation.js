import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated,logout } from "./helpers/clientAuth";


function ShowNavigation({history}) {
    const handleLogout = () => {
        logout(() => {
            history.push('/signin');
        })
    }
  return (
    <header className="showNavigation">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img className="navbar-brand" width="80" height="80" src = "https://image.shutterstock.com/image-vector/kitchen-utensil-spoon-plate-fork-260nw-1196028535.jpg" alt=''/>
          <span className="font-weight-bold text-primary">Fine Dining</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0 ml-auto">
            <input
              className="form-control mr-sm-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav ml-auto">
            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  {/*active*/}
                  <Link to="/" className="nav-link">
                    <i className="fas fa-home"></i> Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  {/*active*/}
                  <Link to="/signup" className="nav-link">
                  <i className="fas fa-edit"></i> SignUp <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  {/*active*/}
                  <Link to="/signin" className="nav-link">
                  <i className="fas fa-sign-in-alt"></i> SignIn
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated() && isAuthenticated().role === 0 && (
              <>
                <li className="nav-item">
                  {/*active*/}
                  <Link to="/user/dashboard" className="nav-link">
                  <i className="far fa-user"></i> Hi UserName
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <>
                <li className="nav-item">
                  {/*active*/}
                  <Link to="/admin/dashboard" className="nav-link">
                  <i className='fas fa-user-shield'></i> Hi AdminName
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && isAuthenticated().role === 0 && (
            <>
                <li className="nav-item">
                  {/*active*/}
                  <Link to="#" className="nav-link">
                  <i className="fas fa-shopping-bag"></i> Cart
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated()&& (
              <>
                <li className="nav-item">
                  {/*active*/}
                  <button
                        className="btn btn-link text-secondary text-decoration-none pl-0"
                        onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </>
            )}

            <li className="nav-item dropdown disabled">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="#" className="dropdown-item">
                  Action
                </Link>
                <Link to="#" className="dropdown-item">
                  Another action
                </Link>
                <div className="dropdown-divider"></div>
                <Link to="#" className="dropdown-item">
                  Something else here
                </Link>
              </div>
            </li>

          </ul>
          
        </div>
      </nav>
    </header>
  );
}

export default withRouter(ShowNavigation); //withRouter here is a HOC
