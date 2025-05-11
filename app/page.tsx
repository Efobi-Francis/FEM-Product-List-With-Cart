import Image from "next/image";
import DessertsList from "./components/DessertsList";
import CartDisplay from "./components/CartDisplay";

export default function Home() {
  return (
    <div className=" px-5 pb-5 md:max-w-7xl md:mx-auto md:py-10 md:flex gap-10 justify-between">
      <div className=" flex flex-col md:basis-2/3">
        <h1 className=" text-5xl font-bold mt-5 mb-8 md:mt-0">Desserts</h1>
        <DessertsList />
      </div>
      <CartDisplay/>
    </div>
  );
}
