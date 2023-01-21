import styles from './EditPost.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const [ title, setTitle ] = useState("");
    const [ image, setImage ] = useState("");
    const [ body, setBody ] = useState("");
    const [ tags, setTags ] = useState([]);
    const [ formError, setFormError ] = useState("");
    const { updateDocument, response } = useUpdateDocument("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

    useEffect(()=>{
        if( post ){
            setTitle( post.title );
            setBody( post.body );
            setImage( post.image );
            const textTags = post.tagsArray.join(', ');
            setTags(textTags);
        }
    }, [ post ]);

    const handleSubmit = (e)=> {
        e.preventDefault();
        setFormError("");

        // VALIDATE IMAGE URL
        try {
            new URL(image);
        } catch (error) {
            setFormError("Informe uma URL válida");
        }

        // CREATE TAGS ARRAY
        const tagsArray = tags.split(',').map((tag)=> tag.trim().toLowerCase());

        // CHECK ALL VALUES
        if( !title || !image || !tags || !body ){
            setFormError("Preencha todos os campos");
        }

        if( formError ){
            return;
        }

        const data = {
            title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName
        }

        updateDocument( id, data );

        // REDIRECT TO DASHBOARD
        navigate("/dashboard");
    }

    return (
        <div className={ styles.edit_post }>
            <h2>Editar Post</h2>
            <p>Atualize as informações do post</p>

            { post && (
                <>
                    <form onSubmit={handleSubmit}>

                        <label>
                            <span>Título</span>
                            <input type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} required />
                        </label>

                        <label>
                            <span>URL da imagem</span>
                            <input type="text" name="image" value={image} onChange={(e)=> setImage(e.target.value)} required />
                        </label>

                        <div className={ styles.preview }>
                            <p className={ styles.preview_title }>Imagem atual</p>
                            <img className={ styles.preview_img } src={ post.image } alt={ post.title } />
                        </div>

                        <label>
                            <span>Conteúdo</span>
                            <textarea type="text" name="body" rows="3" value={body} onChange={(e)=> setBody(e.target.value)} required></textarea>
                        </label>

                        <label>
                            <span>Tags</span>
                            <input type="text" name="tags" value={tags} onChange={(e)=> setTags(e.target.value)} placeholder="Separe as tags com vírgulas" required />
                        </label>

                        { !response.loading && <button className="btn">Atualizar</button> }
                        { response.loading && <button className="btn" disabled>Atualizando, aguarde ...</button> }
                        { response.error && <p className="error">{response.error}</p> }
                        { formError && <p className="error">{formError}</p> }

                    </form>
                </>
            ) }
        </div>
    )
}

export default EditPost