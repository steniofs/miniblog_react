import styles from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
    const [ title, setTitle ] = useState("");
    const [ image, setImage ] = useState("");
    const [ body, setBody ] = useState("");
    const [ tags, setTags ] = useState([]);
    const [ formError, setFormError ] = useState("");
    const { insertDocument, response } = useInsertDocument("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

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

        insertDocument({
            title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName
        });

        // REDIRECT TO HOME PAGE
        navigate("/");
    }

    return (
        <div className={ styles.create_post }>
            <h2>Criar Post</h2>
            <p>Escreva sobre o que quiser compartilhar.</p>

            <form onSubmit={handleSubmit}>

                <label>
                    <span>Título</span>
                    <input type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} required />
                </label>

                <label>
                    <span>URL da imagem</span>
                    <input type="text" name="image" value={image} onChange={(e)=> setImage(e.target.value)} required />
                </label>

                <label>
                    <span>Conteúdo</span>
                    <textarea type="text" name="body" rows="3" value={body} onChange={(e)=> setBody(e.target.value)} required></textarea>
                </label>

                <label>
                    <span>Tags</span>
                    <input type="text" name="tags" value={tags} onChange={(e)=> setTags(e.target.value)} placeholder="Separe as tags com vírgulas" required />
                </label>

                { !response.loading && <button className="btn">Cadastrar</button> }
                { response.loading && <button className="btn" disabled>Cadastrando, aguarde ...</button> }
                { response.error && <p className="error">{response.error}</p> }
                { formError && <p className="error">{formError}</p> }

            </form>
        </div>
    )
}

export default CreatePost