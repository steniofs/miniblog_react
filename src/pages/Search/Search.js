import styles from './Search.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostDetail from '../../components/PostDetail';
import { Link } from 'react-router-dom';

const Search = () => {
    const query = useQuery();
    const search = query.get("q");
    const { documents: posts } = useFetchDocuments('posts', search);

    return (
        <div className={ styles.search }>
            <h2>Search</h2>
            <div>
                { posts && posts.length === 0 && (
                    <>
                        <p>Nenhum post encontrado !!!</p>
                        <Link to='/' className='btn btn-dark'>Voltar</Link>
                    </>
                ) }
                { posts && posts.map((post)=> (
                    <PostDetail key={ post.id } post={ post } />
                )) }
            </div>
        </div>
    )
}

export default Search