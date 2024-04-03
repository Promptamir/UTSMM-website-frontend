import React from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import '../../../css/pages/blogs-page/BlogsPageStyle.css';
import parse from 'html-react-parser';

export default function BlogDetailPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const lastRoute = pathname.substring(pathname.lastIndexOf('/') + 1);

  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryFn: async () => {
      const {data} = await axios.get(`https://utsmm.liara.run/api/blogs/${lastRoute}`);
      return data.entities.blog;
    }
  });

  return (
      <section className={'blog-page'}>
        <main>
          {
            (isLoading)
                ? <h1>Loading</h1>
                : (isError)
                    ? <h1>There was an error</h1>
                    : (
                        <>
                          <div className={'info-holder'}>
                            {
                                data.keywords?.length !== 0 && <div className={'keywords-holder'}>
                                  {
                                    data.keywords.map((item, index) => (
                                        <div className={'keyword'} key={index}>#{item}</div>
                                    ))
                                  }
                                </div>
                            }
                            <img className="poster" src={`https://utsmm.liara.run/${data.image}`}
                                 alt={data.short_description}/>
                            <h1 className={'title'}>{data.title}</h1>
                            <p className={'content'}>{data.short_description}</p>
                          </div>
                          {parse(data.content)}
                        </>
                    )
          }
        </main>
      </section>
  )
}
