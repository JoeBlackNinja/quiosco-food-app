import Image from 'next/image';

import useQuiosco from '../hooks/useQuiosco';

const Category = ({ category }) => {

  const { currentCategory, handleClickCategories } = useQuiosco();

  const { name, icon, id } = category;

  return (
    <div 
      className={`${currentCategory?.id === id ? 'bg-amber-400' : ''} 
      flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
        <Image
            width={70}
            height={70}
            alt='Image Icon'
            src={`/assets/img/icono_${icon}.svg`}
            className='mr-5'
        />
        <button
          type='button'
          className='text-2xl font-bold hover:cursor-pointer'
          onClick={ () => handleClickCategories(id) }
        >          
          {name}
        </button>
    </div>
  );
};

export default Category;
