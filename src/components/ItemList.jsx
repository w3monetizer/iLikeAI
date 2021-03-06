import React from "react";
import * as db from "../firestore";

function ItemList({ listId }) {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    return db.subscribeToListItems(listId, {
      next: querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setItems(data);
      }
    })
  },[listId])   // only re-render when listId changes

  return (
    <section className="text-gray-500 body-font bg-gray-900">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {/* display items in list */}
          {items.map(item => (
            <Item key={item.id} listId={listId} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ listId, item }) {
  const { id, name, link, image, author, created } = item;
  const date = created ? created.toDate().toLocaleDateString() : null;

  function handleDeleteItem() {
    // Open Confirm Dialof window
    if (window.confirm('Are you sure you want to delete this?')) {
      db.deleteListItem(listId, id);
    }
  }

  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-800 p-6 rounded-lg">
        <a href={link} target="_blank" rel="noopener noreferer">
          <img
            className="h-40 rounded w-full object-cover object-center mb-6"
            src={image}
            alt={name}
          />
        </a>
        <h3 className="tracking-widest text-green-500 text-xs font-medium title-font">
          {author.username}
        </h3>
        <h2 className="text-lg text-white font-medium title-font mb-4">{name}</h2>
        <div className="flex items-center justify-between">
          <span className="leading-relaxed text-base">Posted {date}</span>
          <button
            onClick={handleDeleteItem}
            className="inline-flex text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
