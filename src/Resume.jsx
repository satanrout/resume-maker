// ResumeMaker.jsx
import React, { useState, useEffect } from "react";
import "./ResumeMaker.css";
import { Formik, Form, Field, FieldArray } from "formik"; // form validation library
import { Button, Input, Card, Row, Col } from "antd"; // component library

// A dummy resume data to use if localstorage is empty
const dummyResumeData = {
  name: "John Doe",
  address: "123 Main Street, New York, NY 10001",
  contact: "john.doe@example.com | (123) 456-7890",
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of ABC",
      year: "2018 - 2022",
    },
    {
      degree: "High School Diploma",
      institution: "XYZ High School",
      year: "2016 - 2018",
    },
  ],
  experience: [
    {
      title: "Software Engineer Intern",
      company: "Google",
      duration: "June 2021 - August 2021",
      description:
        "Developed web applications using React, Node.js, and MongoDB. Implemented features, fixed bugs, and wrote tests.",
    },
    {
      title: "Teaching Assistant",
      company: "University of ABC",
      duration: "January 2021 - May 2021",
      description:
        "Assisted students with assignments and projects in the Data Structures and Algorithms course. Graded papers and provided feedback.",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "HTML",
    "CSS",
    "Git",
    "Python",
    "Java",
  ],
};

const ResumeMaker = () => {
  // A state to store the resume data
  const [resumeData, setResumeData] = useState(dummyResumeData);

  // A state to toggle the edit mode
  const [editMode, setEditMode] = useState(false);

  // A function to get the resume data from localstorage or use the dummy data
  const getResumeData = () => {
    const data = localStorage.getItem("resumeData");
    if (data) {
      return JSON.parse(data);
    } else {
      localStorage.setItem("resumeData", JSON.stringify(dummyResumeData));
      return dummyResumeData;
    }
  };

  // A function to update the resume data in localstorage and state
  const updateResumeData = (data) => {
    localStorage.setItem("resumeData", JSON.stringify(data));
    setResumeData(data);
  };

  // A function to handle the submit event of the form
  const handleSubmit = (values) => {
    updateResumeData(values);
    setEditMode(false);
  };

  // A function to render the resume section
  const renderResume = () => {
    return (
      <Card className="resume-card">
        <h1 className="resume-name">{resumeData.name}</h1>
        <p className="resume-contact">{resumeData.contact}</p>
        <p className="resume-address">{resumeData.address}</p>
        <h2 className="resume-section">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="resume-item">
            <p className="resume-degree">{edu.degree}</p>
            <p className="resume-institution">{edu.institution}</p>
            <p className="resume-year">{edu.year}</p>
          </div>
        ))}
        <h2 className="resume-section">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="resume-item">
            <p className="resume-title">{exp.title}</p>
            <p className="resume-company">{exp.company}</p>
            <p className="resume-duration">{exp.duration}</p>
            <p className="resume-description">{exp.description}</p>
          </div>
        ))}
        <h2 className="resume-section">Skills</h2>
        <div className="resume-skills">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="resume-skill">
              {skill}
            </span>
          ))}
        </div>
        <Button
          className="resume-edit-button"
          type="primary"
          onClick={() => setEditMode(!editMode)}
        >
          Edit
        </Button>
      </Card>
    );
  };

  // A function to render the form section
  const renderForm = () => {
    return (
      <Card className="form-card">
        <Formik
          initialValues={resumeData}
          onSubmit={handleSubmit}
          // You can add validation rules here
        >
          {({ values }) => (
            <Form className="form">
              <h2 className="form-section">Personal Details</h2>
              <div className="form-item">
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" type="text" as={Input} />
              </div>
              <div className="form-item">
                <label htmlFor="contact">Contact</label>
                <Field id="contact" name="contact" type="text" as={Input} />
              </div>
              <div className="form-item">
                <label htmlFor="address">Address</label>
                <Field id="address" name="address" type="text" as={Input} />
              </div>
              <h2 className="form-section">Education</h2>
              <FieldArray name="education">
                {({ push, remove }) => (
                  <>
                    {values.education.map((edu, index) => (
                      <div key={index} className="form-item">
                        <label htmlFor={`education.${index}.degree`}>
                          Degree
                        </label>
                        <Field
                          id={`education.${index}.degree`}
                          name={`education.${index}.degree`}
                          type="text"
                          as={Input}
                        />
                        <label htmlFor={`education.${index}.institution`}>
                          Institution
                        </label>
                        <Field
                          id={`education.${index}.institution`}
                          name={`education.${index}.institution`}
                          type="text"
                          as={Input}
                        />
                        <label htmlFor={`education.${index}.year`}>Year</label>
                        <Field
                          id={`education.${index}.year`}
                          name={`education.${index}.year`}
                          type="text"
                          as={Input}
                        />
                        <Button
                          className="form-remove-button"
                          type="danger"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="form-add-button"
                      type="dashed"
                      onClick={() =>
                        push({
                          degree: "",
                          institution: "",
                          year: "",
                        })
                      }
                    >
                      Add More
                    </Button>
                  </>
                )}
              </FieldArray>
              <h2 className="form-section">Experience</h2>
              <FieldArray name="experience">
                {({ push, remove }) => (
                  <>
                    {values.experience.map((exp, index) => (
                      <div key={index} className="form-item">
                        <label htmlFor={`experience.${index}.title`}>
                          Title
                        </label>
                        <Field
                          id={`experience.${index}.title`}
                          name={`experience.${index}.title`}
                          type="text"
                          as={Input}
                        />
                        <label htmlFor={`experience.${index}.company`}>
                          Company
                        </label>
                        <Field
                          id={`experience.${index}.company`}
                          name={`experience.${index}.company`}
                          type="text"
                          as={Input}
                        />
                        <label htmlFor={`experience.${index}.duration`}>
                          Duration
                        </label>
                        <Field
                          id={`experience.${index}.duration`}
                          name={`experience.${index}.duration`}
                          type="text"
                          as={Input}
                        />
                        <label htmlFor={`experience.${index}.description`}>
                          Description
                        </label>
                        <Field
                          id={`experience.${index}.description`}
                          name={`experience.${index}.description`}
                          type="text"
                          as={Input}
                        />
                        <Button
                          className="form-remove-button"
                          type="danger"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="form-add-button"
                      type="dashed"
                      onClick={() =>
                        push({
                          title: "",
                          company: "",
                          duration: "",
                          description: "",
                        })
                      }
                    >
                      Add More
                    </Button>
                  </>
                )}
              </FieldArray>
              <h2 className="form-section">Skills</h2>
              <FieldArray name="skills">
                {({ push, remove }) => (
                  <>
                    {values.skills.map((skill, index) => (
                      <div key={index} className="form-item">
                        <label htmlFor={`skills.${index}`}>Skill</label>
                        <Field
                          id={`skills.${index}`}
                          name={`skills.${index}`}
                          type="text"
                          as={Input}
                        />
                        <Button
                          className="form-remove-button"
                          type="danger"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="form-add-button"
                      type="dashed"
                      onClick={() => push("")}
                    >
                      Add More
                    </Button>
                  </>
                )}
              </FieldArray>
              <Button
                className="form-submit-button"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    );
  };

  // A useEffect hook to get the resume data from localstorage on mount
  useEffect(() => {
    setResumeData(getResumeData());
  }, []);

  return (
    <div className="resume-maker">
      <Row className="row-container" wrap={true} gutter={20}>
        <Col span={editMode ? 12 : 0}>{editMode && renderForm()}</Col>
        <Col span={editMode ? 12 : 24}>{renderResume()}</Col>
      </Row>
    </div>
  );
};

export default ResumeMaker;
