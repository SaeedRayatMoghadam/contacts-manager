import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ORANGE, PURPLE, COMMENT } from "../../helpers/colors";
import {
  getAllGroups,
  getContact,
  updateContact,
} from "../../services/contactService";
import Spinner from "../Spinner";
import { contactSchema } from "../validations/Validation";
import { toast } from "react-toastify";

const EditContact = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      fullname: "",
      photo: "",
      mobile: "",
      email: "",
      job: "",
      group: "",
    },
    groups: [],
  });

  useEffect(() => {
    const fethData = async () => {
      setState({ ...state, loading: true });

      try {
        const { data: contactInfo } = await getContact(params.id);
        const { data: allGroups } = await getAllGroups();

        setState({
          ...state,
          contact: contactInfo,
          groups: allGroups,
          loading: false,
        });
        console.log(state);
      } catch (error) {
        console.log(error);
        setState({ ...state, loading: false });
      }
    };

    fethData();
  }, []);

  const submitForm = async (values) => {

    try {
      setState({ ...state, loading: true });
      const { data } = await updateContact(values, params.id);
      setState({ ...state, loading: false });

      if (data) {
        toast.info("مخاطب با موفقیت ویرایش شد");
        navigate("/contacts");
      }
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };

  const { loading, contact, groups } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik
                  initialValues={contact}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    submitForm(values);
                  }}
                >
                  <Form>
                    <div className="mb-2">
                      <Field
                        name="fullname"
                        type="text"
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                      />
                      <ErrorMessage
                        name="fullname"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="photo"
                        type="text"
                        className="form-control"
                        placeholder="آدرس تصویر"
                      />
                      <ErrorMessage
                        name="photo"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        name="mobile"
                        type="number"
                        className="form-control"
                        placeholder="شماره موبایل"
                      />
                      <ErrorMessage
                        name="mobile"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="آدرس ایمیل"
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="job"
                        className="form-control"
                        placeholder="شغل"
                      />
                      <ErrorMessage
                        name="job"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mb-2">
                      <Field name="group" as="select" className="form-control">
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name="group"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </Form>
                </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
