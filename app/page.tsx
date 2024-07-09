import Image from "next/image";
import { ChannelCasts } from "./components/ChannelCasts";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { Instructions } from "./components/Instructions";
import Logo from "./images/logo.png";

const CHANNEL_ID = "pizzafaucet";

export default function Home() {
  return (
    <>
      <nav className="z-10 mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 lg:sticky lg:top-0 lg:px-6">
        <Image src={Logo} alt="Pizza Faucet" className="h-6 w-auto lg:h-8" />
        <ConnectWalletButton />
      </nav>

      <section className="mx-auto max-w-screen-xl px-4 pb-24 pt-16 lg:px-6">
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-24">
          <div className="lg:sticky lg:top-[136px]">
            <h2 className="text-center font-display text-5xl font-bold sm:text-[82px]">
              Pizza<span className="text-red-500">Faucet</span>
            </h2>
            <p className="mb-12 text-center font-display text-xl font-medium text-yellow-950 lg:text-3xl">
              A Free and Open faucet design to bring pizza to the people.
            </p>
            <Instructions channelId={CHANNEL_ID} />
          </div>
          <ChannelCasts channelId={CHANNEL_ID} />
        </div>
      </section>
      <footer className="relative bg-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-12 w-full md:h-20"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-yellow-400"
          ></path>
        </svg>
        <div className="pb-10">
          <p className="text-center font-display text-lg text-yellow-950">
            <a href="https://github.com/PizzaDAO/mealticket-pizzafaucet" target="_blank">
              Copyleft
              <span className="mx-1 inline-block scale-x-[-1] transform">&copy;</span>
              PizzaDAO 2024
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
