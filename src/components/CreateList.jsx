import React from "react";
import * as db from "../firestore";

function CreateList({ user }) {
  const [list, setList] = React.useState({
    name: "",
    description: "",
    image: null
  });

  function handleChange(event) {
    const { name, value, files } = event.target; // name = name | description | image
    if (files) {
      const image = files[0];
      setList(prevState => ({ ...prevState, image: image }))
    } else {
      setList(prevState => ({ ...prevState, [name]: value }))
    }
  }

  function handleCreateList() {
    console.log(list);
  }

  return (
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
        WELCOME, {user.displayName.split(' ')[0].toUpperCase()}!
      </h1>
      <p className="lg:w-2/3 mx-auto mb-12 leading-relaxed text-base">
        To get started, create a repo with a name and a cover image
      </p>
      <div className="lg:w-2/6 mx-auto md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add repo name"
          type="text"
          name="name"
          onChange={handleChange}
          required
        />
        <textarea
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add short description"
          type="text"
          name="description"
          onChange={handleChange}
        />
        <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add repo name"
          type="file"
          name="image"
          onChange={handleChange}
        />
        {/* display preview image */}
        {list.image && (
          <img className="mb4" src={ URL.createObjectURL(list.image) } />
        )}
        <button onClick={handleCreateList} className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
          Create Repo
        </button>
        <p className="text-xs text-gray-600 mt-3">*Repo name required</p>
      </div>
    </div>
  );
}

export default CreateList;
