import Image from "next/image";

import useQuiosco from '../hooks/useQuiosco';

import Category from "./Category";

const SideBar = () => {

  const { categories } = useQuiosco();

  return (
    <>
      <Image
        width={300}
        height={300}
        src="/assets/img/logo.svg"
        alt="logo image"
      />

      <nav className="mt-10">
        {categories.map(category => (
          <Category
            key={category.id}
            category={category}
          />
        ))}
      </nav>

    </>
  );
};

export default SideBar;
