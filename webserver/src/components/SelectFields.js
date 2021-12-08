import BasicSelect from "./BasicSelect";
import React, { useEffect, useState } from "react";
import { getSections, getSection} from "../database/Sections";
import { getUsers, getUser } from "../database/Users";
import { ModalContext } from "./ModalContext";
import {getArticlesFromIdea} from "../database/Articles"
import { getIdeas, getIdea } from "../database/Ideas";

export function SelectSection({ handleCallBackSelection }) {
  const {setSectionObject, setSection, section} =
    React.useContext(ModalContext);
  //TODO Query sections from the database for scaleability?
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getSections().then((sections) => {
      setSections(sections);
    });
  }, []);

  const handleChange = async (event) => {
    setSection(event.target.value);
    handleCallBackSelection(section);

    getSection(event.target.value)
    .then((results) => {
      results.forEach((sectionObject) => {
        setSectionObject(sectionObject);
        console.log(sectionObject)
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const sectionObjects = sections.map((section) => {
    return {
      objectId: section.id,
      name: section.get("name"),
      editor: section.get("Editor"),
    };
  });

  
  return (
    <BasicSelect
      handleChange={handleChange}
      value={section}
      arrayOfOptions={sectionObjects}
      label="Section"
      handleCallBackSelection={handleCallBackSelection}
    />
  );
}

export function SelectSource({ handleCallBackSelection }) {
  const { setIdeaSource, ideaSource, setIdeaSourceObject } =
    React.useContext(ModalContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleChange = (event) => {
    setIdeaSource(event.target.value);
    handleCallBackSelection(ideaSource);
    getUser(event.target.value)
      .then((results) => {
        results.forEach((userObject) => {
          setIdeaSourceObject(userObject);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sources = users.map((employee) => {
    return {
      objectId: employee.id,
      name: employee.get("username"),
      section: employee.get("section"),
    };
  });

  return (
    <BasicSelect
      handleChange={handleChange}
      value={ideaSource}
      arrayOfOptions={sources}
      label="Source"
      handleCallBackSelection={handleCallBackSelection}
    />
  );
}

export function SelectArticles({ handleCallBackSelection }) {
  const { articles, setArticles, ideaId } = React.useContext(ModalContext);
  const [ideaObject, setIdeaObject] = useState();

  useEffect(() => {
    getIdea(ideaId).then((users) => {
      console.log(users)
      setIdeaObject(users.username)
      console.log(ideaObject)
    });
  }, []);

 //  getArticlesFromIdea(ideaObject).then((articles) => {
 //  setArticles(articles);
 //});


  //const articles = [];
  return (
    <BasicSelect
      label="Articles"
      value={articles}
      arrayOfOptions={articles}
      handleCallBackSelection={handleCallBackSelection}
    />
  );
}

export function SelectVisibilities({ handleCallBackSelection }) {
  const { visibility, setVisibility } = React.useContext(ModalContext);

  const handleChange = (event) => {
    setVisibility(event.target.value);
    handleCallBackSelection(visibility);
  };

  const visibilities = [
    { objectId: "v1", name: "Only myself" },
    { objectId: "v2", name: "Chief Editor" },
    { objectId: "v3", name: "Section Staff" },
    { objectId: "v4", name: "Everyone" },
  ];

  return (
    <BasicSelect
      label="Visibility"
      handleChange={handleChange}
      value={visibility}
      arrayOfOptions={visibilities}
      handleCallBackSelection={handleCallBackSelection}
    />
  );
}
