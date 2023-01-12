import { Link } from "react-router-dom";
import { CURRENTLINE, CYAN, ORANGE, RED, PURPLE } from "../../helpers/colors";

const Contact = ({ contact, deleteContact }) => {
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row gy-2 align-items-center d-flex justify-content-around">
            <div className="col-md-3 col-sm-12">
              <img
                src={contact.photo}
                alt=""
                style={{ border: `1px solid ${PURPLE}` }}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-7 col-sm-12">
              <ul className="list-group pe-0">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-bold">{contact.fullname}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{"  "}
                  <span className="fw-bold">{contact.mobile}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  آدرس ایمیل :{"  "}
                  <span className="fw-bold">{contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-12 d-flex flex-md-column align-items-center justify-content-center">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn mx-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye" />
              </Link>

              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn mx-1 my-md-1"
                style={{ backgroundColor: CYAN }}
              >
                <i className="fa fa-pen" />
              </Link>
              <button
                onClick={deleteContact}
                className="btn mx-1"
                style={{ backgroundColor: RED }}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
