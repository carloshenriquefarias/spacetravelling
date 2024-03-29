/* eslint-disable import/no-extraneous-dependencies */
import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

import Select from 'react-select'
import makeAnimated from "react-select/animated";

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}

const options = [
  { value: "produto 01", label: "Produto 01" },
  { value: "produto 02", label: "Produto 02" },
  { value: "produto 03", label: "Produto 03" },
  { value: "produto 04", label: "Produto 04" },
  { value: "produto 05", label: "Produto 05" },
  { value: "produto 06", label: "Produto 06" },
  { value: "produto 07", label: "Produto 07" },
  { value: "produto 08", label: "Produto 08" },
];

export default function Home({ postsPagination, preview }: HomeProps) {

  const animatedComponents = makeAnimated();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleSelect = () => {
      console.log(selectedOptions);
  };


  // const formattedPost = postsPagination.results.map(post => {
  //   return {
  //     ...post,
  //     first_publication_date: format(
  //       new Date(post.first_publication_date),
  //       'dd MMM yyyy',
  //       {
  //         locale: ptBR,
  //       }
  //     ),
  //   };
  // });

  // const [posts, setPosts] = useState<Post[]>(formattedPost);
  // const [nextPage, setNextPage] = useState(postsPagination.next_page);
  // const [currentPage, setCurrentPage] = useState(1);

  // async function handleNextPage(): Promise<void> {
  //   if (currentPage !== 1 && nextPage === null) {
  //     return;
  //   }

  //   const postsResults = await fetch(`${nextPage}`).then(response =>
  //     response.json()
  //   );
  //   setNextPage(postsResults.next_page);
  //   setCurrentPage(postsResults.page);

  //   const newPosts = postsResults.results.map(post => {
  //     return {
  //       uid: post.uid,
  //       first_publication_date: format(
  //         new Date(post.first_publication_date),
  //         'dd MMM yyyy',
  //         {
  //           locale: ptBR,
  //         }
  //       ),
  //       data: {
  //         title: post.data.title,
  //         subtitle: post.data.subtitle,
  //         author: post.data.author,
  //       },
  //     };
  //   });

  //   setPosts([...posts, ...newPosts]);
  // }

  return (
    <>
      <h1>Ola mundo</h1>

      <Select
          defaultValue={[options[0], options[2]]}
          components={animatedComponents}
          isMulti
          options={options}
          // onChange={(item) => setSelectedOptions(item)}
          className="select"
          isClearable={true}
          isSearchable={true}
          isDisabled={false}
          isLoading={false}
          isRtl={false}
          closeMenuOnSelect={false}
      />
      {/* <main className={commonStyles.container}>
        <Header />

        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a className={styles.post}>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <ul>
                  <li>
                    <FiCalendar />
                    {post.first_publication_date}
                  </li>
                  <li>
                    <FiUser />
                    {post.data.author}
                  </li>
                </ul>
              </a>
            </Link>
          ))}

          {nextPage && (
            <button type="button" onClick={handleNextPage}>
              Carregar mais posts
            </button>
          )}
        </div>
        {preview && (
          <aside>
            <Link href="/api/exit-preview">
              <a className={commonStyles.preview}>Sair do modo Preview</a>
            </Link>
          </aside>
        )}
      </main> */}
    </>
  );
}

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query(
//     [Prismic.Predicates.at('document.type', 'posts')],
//     {
//       pageSize: 3,
//       orderings: '[document.last_publication_date desc]',
//     }
//   );

//   const posts = postsResponse.results.map(post => {
//     return {
//       uid: post.uid,
//       first_publication_date: post.first_publication_date,
//       data: {
//         title: post.data.title,
//         subtitle: post.data.subtitle,
//         author: post.data.author,
//       },
//     };
//   });

//   const postsPagination = {
//     next_page: postsResponse.next_page,
//     results: posts,
//   };
//   return {
//     props: {
//       postsPagination,
//       preview,
//     },
//     revalidate: 1800,
//   };
// };
