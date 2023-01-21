import styles from './Home.module.css';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail';

const Home = () => {
    const [ query, setQuery ] = useState("");
    const { documents: posts, loading } = useFetchDocuments("posts");
    const navigate = useNavigate();

    const handleSubmit = (e)=> {
        e.preventDefault();

        if( query ){
            return navigate(`/search?q=${query}`);
        }
    }

    return (
        <div className={ styles.home }>
            <form onSubmit={handleSubmit} className={ styles.search_form }>

                <input type="text" name="" placeholder='Digite algo para buscar' onChange={(e)=> setQuery(e.target.value)} />
                <button className="btn btn-dark">Pesquisar</button>

            </form>

            <h1>Veja os posts mais recentes</h1>

            <div>
                { loading && <p>Carregando ...</p> }

                { posts && posts.map((post)=> <PostDetail key={ post.id } post={ post } />) }

                { posts && posts.length === 0 && (
                    <div className={ styles.noposts }>
                        <p>Nenhum post encontrado !!!</p>
                        <Link to="/posts/create" className='btn'>Criar post</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home