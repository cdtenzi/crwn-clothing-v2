import './directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({categories}) => {  
    return (
        <div className="directory-container">
            {categories.map(
                (category)=>(<CategoryItem category={category}/>)
            )}
        </div>
    );
}

export default Directory;