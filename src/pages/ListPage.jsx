import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import useSWR from 'swr';
import CreateItem from '../components/CreateItem';
import ItemList from '../components/ItemList';
import JoinList from '../components/JoinList';
import Error from '../components/shared/Error';
import Loading from '../components/shared/Loading';
import * as db from '../firestore';
import { UserContext } from '..';
import useCopyClipboard from 'react-use-clipboard';

function ListPage({ location }) {
  const user = React.useContext(UserContext);

  const [isCopied, setCopied] = useCopyClipboard(window.location.href, {
    successDuration: 1000,
  });

  const listId = location.pathname;
  const { data: list, error } = useSWR(listId, db.getList);

  if (error) return <Error message={error.message} />;
  if (!list) return <Loading />;
  // Check if user is not part of the users[] array => isNewUser
  const isNewUser = list.users.every((u) => u.id !== user.uid);
  if (isNewUser) {
    // Offer new user option to JoinList
    return <JoinList list={list} listId={listId} user={user} />;
  }

  return (
    <Layout>
      <section className="text-gray-500 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-col px-5 py-4 justify-center items-center">
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-bold text-white">
              {list.name}
            </h1>
            <p className="mb-8 leading-relaxed">{list.description}</p>
            <p className="mb-8 leading-relaxed">
              {list.repo ?? 'Add list repo'}
            </p>
            {/* Create new list item */}
            <CreateItem user={user} listId={listId} />
            <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
              New links appear below in realtime ✨
            </p>
            <div className="flex text-gray-300">
              <button
                onClick={setCopied}
                className="bg-orange-500 inline-flex py-3 px-5 rounded-lg items-center hover:bg-orange-600 hover:text-white focus:outline-none"
              >
                <span className="flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-200 mb-1">
                    Share With Friends
                  </span>
                  <span className="title-font font-medium">
                    {isCopied ? 'Copied' : 'Copy Link'}
                  </span>
                </span>
              </button>
              <Link
                to="/"
                className="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-700 hover:text-white focus:outline-none"
              >
                <span className="flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">
                    Visit Home Page
                  </span>
                  <span className="title-font font-medium">Create List</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* display all items in list */}
      <ItemList listId={listId} />
    </Layout>
  );
}

export default ListPage;
