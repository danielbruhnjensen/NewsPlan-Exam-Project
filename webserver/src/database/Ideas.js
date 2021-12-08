import Parse from "parse";
import { ConvertIfString, ConvertDateWithYear  } from "../components/ConvertDate";

export async function getIdea(ideaId) {
  const Ideas = Parse.Object.extend("Ideas");
  const query = new Parse.Query(Ideas);
  query.equalTo('objectId', ideaId);
  return await query.find();
}  

export async function getIdeas() {
  const Ideas = Parse.Object.extend("Ideas");
  const query = new Parse.Query(Ideas);
  query.include("Section")
  query.include("User")
  const results = await query.find();
  let ideas = results.map((row, index) => {
  return {
    id: index,
    expirationDate: ConvertDateWithYear(String(row.attributes.expirationDate)),
    source: row.get("ideaSource").get("username"),
    ideaName: row.attributes.ideaName,
    description: row.attributes.description,
    ideaId: row.id,
    section: row.get("section").get("name"),
    visibility: row.attributes.visibility,
  };
});
  return ideas
}

export async function uploadIdeaToDatabase(
  ideaName,
  description,
  visibility,
  date,
  ideaSourceObject,
  sectionObject,
  ideaId
) {
  let formattedDate = ConvertIfString(date);
  var Idea = Parse.Object.extend("Ideas");
  var newIdea = new Idea();

  if (ideaId === "") {
    newIdea.set("ideaName", ideaName);
    newIdea.set("description", description);
    newIdea.set("visibility", visibility);
    newIdea.set("expirationDate", formattedDate);
    newIdea.set("ideaSource", ideaSourceObject);
    newIdea.set("section", sectionObject);
  } else {
    newIdea.set("objectId", ideaId);
    newIdea.set("ideaName", ideaName);
    newIdea.set("description", description);
    newIdea.set("visibility", visibility);
    newIdea.set("expirationDate", formattedDate);
    newIdea.set("ideaSource", ideaSourceObject);
    newIdea.set("section", sectionObject);
  }
  try {
    await newIdea.save();
    alert("success");
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

<<<<<<< HEAD
export async function updateIdea(
  objectId,
  ideaName,
  section,
  source,
  visibility,
  expirationDate,
  description,
  keywords
) {
  const Ideas = Parse.Object.extend("Ideas");
  const query = new Parse.Query(Ideas);
  query
    .get(objectId)
    .then((object) => {
      object.set("ideaName", ideaName);
      object.set("ideaSource", source);
      object.set("section", section);
      object.set("visibility", visibility);
      object.set("description", description);
      object.set("expirationDate", expirationDate);
      object.set("keywords", keywords);
    })
    .catch((error) => {
      alert(error);
    });
}
=======
export async function deleteHTTP(idea){
  try {
  await fetch(
    "https://parseapi.back4app.com/classes/Ideas/" + idea.objectId,
    {
      method: "DELETE",
      headers: {
        "X-Parse-Application-Id": process.env.REACT_APP_APPLICATION_KEY,
        "X-Parse-REST-API-Key": process.env.REACT_APP_REST_API_KEY,
      },
    }
  );
  alert("success! deleted");
} catch (error) {
  console.log("Error: " + error);
}
}

export async function deleteIdeaFromDatabaseREST(ideaId) {
  let idea = {
    objectId: [ideaId],
  };
  return await deleteHTTP(idea);
}
>>>>>>> 5c1af00eaf8e9d806d906f28cd1046249aaeb5d5
